/**
 * Live API client for the local Vibecrafted installer
 * (scripts/installer_gui.py served on localhost:PORT).
 *
 * When served from localhost, the Svelte wizard fetches runtime data
 * from these endpoints and drives a real installation. When served from
 * vibecrafted.io it falls back to the static manifest.
 */

export interface PreflightCategoryItem {
  name: string;
  label: string;
  found: boolean;
  detail: string;
}

export interface PreflightCategory {
  key: string;
  label: string;
  present: number;
  total: number;
  items: PreflightCategoryItem[];
}

export interface PreflightPlanStep {
  label: string;
  command: string;
}

export interface PreflightStatus {
  command: string[];
  plan: string[][];
  plan_labels: string[];
  command_display: string;
  with_shell: boolean;
  running: boolean;
  completed: boolean;
  exit_code: number | null;
  error: string | null;
  current_stage: string | null;
  output: string[];
  output_line_count: number;
  started_at: number | null;
  finished_at: number | null;
}

export interface PreflightPayload {
  brand: { header: string; tagline: string; product_line: string };
  version: string;
  source_dir: string;
  source_dir_display: string;
  guide_path: string;
  guide_path_display: string;
  helper_path: string;
  helper_path_display: string;
  found_count: number;
  missing_count: number;
  found_items: string[];
  missing_items: string[];
  needs_install: boolean;
  categories: PreflightCategory[];
  install_plan: PreflightPlanStep[];
  control_plane: Record<string, unknown>;
  launcher_defaults: {
    workflows: string[];
    agents: string[];
    runtimes: string[];
  };
  status: PreflightStatus;
}

export interface InstallStartResponse {
  ok: boolean;
  message: string;
}

export interface StartHereResponse {
  ok: boolean;
  message: string;
}

export class InstallerApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "InstallerApiError";
    this.status = status;
  }
}

async function jsonFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
    cache: "no-store",
  });

  const text = await response.text();
  let payload: unknown = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { error: text };
    }
  }

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && "error" in payload
        ? String((payload as { error: unknown }).error)
        : response.statusText) || "Installer API request failed";
    throw new InstallerApiError(message, response.status);
  }

  return (payload ?? ({} as unknown)) as T;
}

export const installerApi = {
  preflight(): Promise<PreflightPayload> {
    return jsonFetch<PreflightPayload>("/api/preflight");
  },

  status(): Promise<PreflightStatus> {
    return jsonFetch<PreflightStatus>("/api/install/status");
  },

  controlPlane(): Promise<Record<string, unknown>> {
    return jsonFetch<Record<string, unknown>>("/api/control-plane");
  },

  startInstall(withShell: boolean): Promise<InstallStartResponse> {
    return jsonFetch<InstallStartResponse>("/api/install", {
      method: "POST",
      body: JSON.stringify({ with_shell: withShell }),
    });
  },

  openStartHere(): Promise<StartHereResponse> {
    return jsonFetch<StartHereResponse>("/api/open-start-here", {
      method: "POST",
    });
  },
};

/**
 * Runtime detection — `true` only when the wizard is served by the
 * local installer_gui.py HTTP server on the user's machine.
 */
export function isLiveInstallerHost(): boolean {
  if (typeof window === "undefined") return false;
  const { hostname } = window.location;
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".local")
  );
}
