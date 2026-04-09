export {};

declare global {
  interface Window {
    mermaid?: {
      render: (id: string, code: string) => Promise<{ svg: string }>;
    };
    renderFrameworkPlayground?: (container: HTMLElement, lang: string) => void;
  }

  interface HTMLButtonElement {
    _copyTimer?: ReturnType<typeof setTimeout>;
  }
}
