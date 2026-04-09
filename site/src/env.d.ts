interface MermaidApi {
  render(id: string, code: string): Promise<{ svg: string }>;
}

declare global {
  interface Window {
    mermaid?: MermaidApi;
    renderFrameworkPlayground?: (container: HTMLElement, lang: string) => void;
  }
}

export {};
