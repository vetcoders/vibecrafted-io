<script lang="ts">
  let reducedMotion = $state(false);

  $effect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = motionQuery.matches;

    const items = document.querySelectorAll('.fade-up');
    if (!items.length) return;

    // Reduced motion or no IntersectionObserver: show all immediately
    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        }
      },
      { threshold: 0.12 }
    );

    items.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  });
</script>
