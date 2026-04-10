<script lang="ts">
  import { onMount } from 'svelte';

  const REVEAL_CLASS = 'js-reveal-ready';

  function setupReveal() {
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>('.fade-up'));

    if (!items.length) {
      root.classList.remove(REVEAL_CLASS);
      return () => {};
    }

    const markViewportItemsVisible = () => {
      const threshold = window.innerHeight * 0.9;
      for (const item of items) {
        const rect = item.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom >= 0) {
          item.classList.add('visible');
        }
      }
    };

    markViewportItemsVisible();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      root.classList.remove(REVEAL_CLASS);
      items.forEach((item) => item.classList.add('visible'));
      return () => {};
    }

    root.classList.add(REVEAL_CLASS);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      root.classList.remove(REVEAL_CLASS);
    };
  }

  onMount(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cleanup = setupReveal();

    const rerun = () => {
      cleanup();
      cleanup = setupReveal();
    };

    window.addEventListener('astro:page-load', rerun);
    motionQuery.addEventListener('change', rerun);

    return () => {
      cleanup();
      window.removeEventListener('astro:page-load', rerun);
      motionQuery.removeEventListener('change', rerun);
      document.documentElement.classList.remove(REVEAL_CLASS);
    };
  });
</script>
