interface MermaidApi {
  render(id: string, code: string): Promise<{ svg: string }>;
}

declare global {
  interface Window {
    mermaid?: MermaidApi;
    renderFrameworkPlayground?: (container: HTMLElement, lang: string) => void;
  }
}

// Vite asset import suffixes used by src/lib/og-renderer.ts. `?inline` is
// resolved by Vite to a base64 data URI string at build time so the font
// bytes can be bundled directly into the prerender chunk (no runtime path
// resolution).
declare module '*.ttf?inline' {
  const dataUri: string;
  export default dataUri;
}

declare module '*.otf?inline' {
  const dataUri: string;
  export default dataUri;
}

declare module '*.woff?inline' {
  const dataUri: string;
  export default dataUri;
}

declare module '*.woff2?inline' {
  const dataUri: string;
  export default dataUri;
}

export {};
