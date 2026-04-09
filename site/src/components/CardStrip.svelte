<script lang="ts">
  $effect(() => {
    const wrap = document.querySelector('.framework-strip-wrap') as HTMLElement | null;
    const strip = document.querySelector('.framework-strip') as HTMLElement | null;
    const leftBtn = document.querySelector('.strip-arrow--left') as HTMLButtonElement | null;
    const rightBtn = document.querySelector('.strip-arrow--right') as HTMLButtonElement | null;
    if (!wrap || !strip || !leftBtn || !rightBtn) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const originals = Array.from(strip.children) as HTMLElement[];
    if (!originals.length) return;

    let cycleWidth = 0;
    let resetQueued = false;
    let targetScrollLeft = 0;
    let velocity = 0;
    let animationFrame = 0;
    let isMomentumScroll = false;

    function cloneCard(card: HTMLElement): HTMLElement {
      const clone = card.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      clone.classList.add('card--clone');
      return clone;
    }

    function seedInfiniteStrip(): void {
      const before = document.createDocumentFragment();
      const after = document.createDocumentFragment();
      for (const card of originals) {
        before.appendChild(cloneCard(card));
        after.appendChild(cloneCard(card));
      }
      strip.insertBefore(before, strip.firstChild);
      strip.appendChild(after);
    }

    function measureCycleWidth(): void {
      const styles = window.getComputedStyle(strip);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      cycleWidth = originals.reduce((sum, card, index) =>
        sum + card.getBoundingClientRect().width + (index < originals.length - 1 ? gap : 0), 0);
    }

    function normalizeScrollLeft(value: number): number {
      if (!cycleWidth) return value;
      while (value < cycleWidth * 0.5) value += cycleWidth;
      while (value > cycleWidth * 1.5) value -= cycleWidth;
      return value;
    }

    function jumpToMiddle(force: boolean): void {
      measureCycleWidth();
      if (!cycleWidth) return;
      if (force) {
        strip.scrollLeft = cycleWidth;
        targetScrollLeft = cycleWidth;
        return;
      }
      strip.scrollLeft = normalizeScrollLeft(strip.scrollLeft);
      targetScrollLeft = normalizeScrollLeft(targetScrollLeft || strip.scrollLeft);
    }

    function queueWrap(): void {
      if (resetQueued) return;
      resetQueued = true;
      requestAnimationFrame(() => {
        resetQueued = false;
        jumpToMiddle(false);
      });
    }

    function getScrollAmount(): number {
      const styles = window.getComputedStyle(strip);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      const width = originals[0]?.getBoundingClientRect().width ?? 300;
      return width + gap;
    }

    function stopMomentum(): void {
      velocity = 0;
      if (!animationFrame) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    function stepMomentum(): void {
      animationFrame = 0;
      measureCycleWidth();
      if (!cycleWidth) return;

      const current = strip.scrollLeft;
      const delta = targetScrollLeft - current;
      const attraction = prefersReduced ? 0.18 : 0.11;
      const damping = prefersReduced ? 0.56 : 0.82;

      velocity += delta * attraction;
      velocity *= damping;

      if (Math.abs(delta) < 0.35 && Math.abs(velocity) < 0.16) {
        isMomentumScroll = true;
        strip.scrollLeft = targetScrollLeft;
        queueWrap();
        isMomentumScroll = false;
        velocity = 0;
        return;
      }

      isMomentumScroll = true;
      strip.scrollLeft = current + velocity;
      queueWrap();
      animationFrame = requestAnimationFrame(stepMomentum);
    }

    function ensureMomentum(): void {
      if (prefersReduced) {
        stopMomentum();
        strip.scrollLeft = targetScrollLeft;
        queueWrap();
        return;
      }
      if (!animationFrame) animationFrame = requestAnimationFrame(stepMomentum);
    }

    function pushMomentum(distance: number, impulseMultiplier: number): void {
      measureCycleWidth();
      if (!cycleWidth) return;
      targetScrollLeft = normalizeScrollLeft((targetScrollLeft || strip.scrollLeft) + distance);
      velocity += distance * impulseMultiplier;
      ensureMomentum();
    }

    function scrollStrip(direction: number): void {
      const amount = getScrollAmount() * (prefersReduced ? 1 : 1.15);
      pushMomentum(direction * amount, prefersReduced ? 0.02 : 0.04);
    }

    // Keyboard navigation on the wrapper
    function handleKeydown(e: KeyboardEvent): void {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollStrip(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollStrip(1);
      }
    }

    // Initialize
    seedInfiniteStrip();
    jumpToMiddle(true);

    leftBtn.addEventListener('click', () => scrollStrip(-1));
    rightBtn.addEventListener('click', () => scrollStrip(1));
    strip.addEventListener('pointerdown', () => { stopMomentum(); targetScrollLeft = strip.scrollLeft; });
    strip.addEventListener('touchstart', () => { stopMomentum(); targetScrollLeft = strip.scrollLeft; }, { passive: true });
    strip.addEventListener('scroll', () => {
      if (!isMomentumScroll) targetScrollLeft = strip.scrollLeft;
      queueWrap();
      isMomentumScroll = false;
    }, { passive: true });

    const onWheel = (event: WheelEvent) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (!delta) return;
      event.preventDefault();
      pushMomentum(delta, prefersReduced ? 0.02 : 0.035);
    };
    wrap.addEventListener('wheel', onWheel, { passive: false });
    wrap.addEventListener('keydown', handleKeydown);

    const onResize = () => { stopMomentum(); jumpToMiddle(false); };
    window.addEventListener('resize', onResize);

    return () => {
      stopMomentum();
      window.removeEventListener('resize', onResize);
      wrap.removeEventListener('wheel', onWheel);
      wrap.removeEventListener('keydown', handleKeydown);
    };
  });
</script>
