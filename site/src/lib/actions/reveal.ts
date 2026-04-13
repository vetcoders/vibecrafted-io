export interface RevealOptions {
  delay?: number;
  disabled?: boolean;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
  visibleClass?: string;
}

const DEFAULTS: Required<Omit<RevealOptions, 'disabled'>> = {
  delay: 0,
  once: true,
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.12,
  visibleClass: 'visible',
};

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
  let observer: IntersectionObserver | null = null;
  let motionQuery: MediaQueryList | null = null;
  let config = { ...DEFAULTS, ...options };

  function setVisible(visible: boolean) {
    node.classList.toggle(config.visibleClass, visible);
    node.dataset.revealState = visible ? 'visible' : 'hidden';
  }

  function cleanup() {
    observer?.disconnect();
    observer = null;
    motionQuery?.removeEventListener('change', restart);
    motionQuery = null;
  }

  function restart() {
    cleanup();

    const shouldDisable =
      config.disabled ||
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window);

    if (config.delay > 0) {
      node.style.setProperty('--reveal-delay', `${config.delay}ms`);
    } else {
      node.style.removeProperty('--reveal-delay');
    }

    motionQuery = shouldDisable ? null : window.matchMedia('(prefers-reduced-motion: reduce)');

    if (shouldDisable || motionQuery?.matches) {
      setVisible(true);
      return;
    }

    setVisible(false);

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (config.once) {
              observer?.disconnect();
              observer = null;
            }
          } else if (!config.once) {
            setVisible(false);
          }
        }
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
      }
    );

    observer.observe(node);
    motionQuery?.addEventListener('change', restart);
  }

  restart();

  return {
    update(nextOptions: RevealOptions = {}) {
      config = { ...DEFAULTS, ...nextOptions };
      restart();
    },
    destroy() {
      cleanup();
      node.style.removeProperty('--reveal-delay');
      delete node.dataset.revealState;
    },
  };
}
