<script lang="ts">
  $effect(() => {
    const wrap = document.querySelector('.framework-strip-wrap') as HTMLElement | null;
    const strip = document.querySelector('.framework-strip') as HTMLElement | null;
    const leftBtn = document.querySelector('.strip-arrow--left') as HTMLButtonElement | null;
    const rightBtn = document.querySelector('.strip-arrow--right') as HTMLButtonElement | null;
    if (!wrap || !strip || !leftBtn || !rightBtn) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let resizeObserver: ResizeObserver | null = null;
    let pointerId: number | null = null;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;
    let isDragging = false;

    function getScrollAmount(): number {
      const styles = window.getComputedStyle(strip);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      const firstCard = strip.querySelector<HTMLElement>('.card:not(.card--clone)') ?? strip.querySelector<HTMLElement>('.card');
      const width = firstCard?.getBoundingClientRect().width ?? 300;
      return width + gap;
    }

    function getMaxScrollLeft(): number {
      return Math.max(0, strip.scrollWidth - strip.clientWidth);
    }

    function clampScrollLeft(value: number): number {
      return Math.min(Math.max(0, value), getMaxScrollLeft());
    }

    function updateChrome(): void {
      const maxScrollLeft = getMaxScrollLeft();
      const scrollable = maxScrollLeft > 1;
      const atStart = strip.scrollLeft <= 1;
      const atEnd = strip.scrollLeft >= maxScrollLeft - 1;

      wrap.dataset.atStart = String(atStart);
      wrap.dataset.atEnd = String(atEnd);
      wrap.dataset.isScrollable = String(scrollable);
      wrap.dataset.isDragging = String(isDragging);

      leftBtn.disabled = !scrollable || atStart;
      rightBtn.disabled = !scrollable || atEnd;
    }

    function scrollStrip(direction: number): void {
      strip.scrollBy({
        left: direction * getScrollAmount(),
        behavior: prefersReduced.matches ? 'auto' : 'smooth',
      });
    }

    function canConsume(delta: number): boolean {
      const maxScrollLeft = getMaxScrollLeft();
      if (maxScrollLeft <= 1) return false;
      if (delta < 0 && strip.scrollLeft <= 1) return false;
      if (delta > 0 && strip.scrollLeft >= maxScrollLeft - 1) return false;
      return true;
    }

    function stopDrag(pointer?: number | null): void {
      if (pointerId !== null && pointer === pointerId) {
        strip.releasePointerCapture?.(pointerId);
      }
      pointerId = null;
      isDragging = false;
      updateChrome();
    }

    function handleKeydown(e: KeyboardEvent): void {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollStrip(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollStrip(1);
      }
    }

    const onLeftClick = () => scrollStrip(-1);
    const onRightClick = () => scrollStrip(1);

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      pointerId = event.pointerId;
      isDragging = true;
      dragStartX = event.clientX;
      dragStartScrollLeft = strip.scrollLeft;
      strip.setPointerCapture?.(event.pointerId);
      updateChrome();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging || pointerId !== event.pointerId) return;
      const delta = event.clientX - dragStartX;
      strip.scrollLeft = clampScrollLeft(dragStartScrollLeft - delta);
      updateChrome();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (pointerId !== event.pointerId) return;
      stopDrag(event.pointerId);
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.buttons === 0) {
        stopDrag(pointerId);
      }
    };

    const onScroll = () => {
      if (!isDragging) {
        updateChrome();
      }
    };

    const onWheel = (event: WheelEvent) => {
      const horizontalIntent = event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const translateVertical = finePointer.matches && Math.abs(event.deltaY) > Math.abs(event.deltaX);
      const delta = horizontalIntent
        ? event.deltaX
        : translateVertical
          ? event.deltaY * 0.92
          : 0;

      if (!delta || !canConsume(delta)) return;

      event.preventDefault();
      strip.scrollLeft = clampScrollLeft(strip.scrollLeft + delta);
      updateChrome();
    };

    wrap.addEventListener('wheel', onWheel, { passive: false });
    wrap.addEventListener('keydown', handleKeydown);
    leftBtn.addEventListener('click', onLeftClick);
    rightBtn.addEventListener('click', onRightClick);
    strip.addEventListener('pointerdown', onPointerDown);
    strip.addEventListener('pointermove', onPointerMove);
    strip.addEventListener('pointerup', onPointerUp);
    strip.addEventListener('pointercancel', onPointerUp);
    strip.addEventListener('pointerleave', onPointerLeave);
    strip.addEventListener('scroll', onScroll, { passive: true });

    resizeObserver = new ResizeObserver(() => updateChrome());
    resizeObserver.observe(strip);

    const onResize = () => {
      strip.scrollLeft = clampScrollLeft(strip.scrollLeft);
      updateChrome();
    };
    window.addEventListener('resize', onResize);
    updateChrome();

    return () => {
      stopDrag(pointerId);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', onResize);
      wrap.removeEventListener('wheel', onWheel);
      wrap.removeEventListener('keydown', handleKeydown);
      leftBtn.removeEventListener('click', onLeftClick);
      rightBtn.removeEventListener('click', onRightClick);
      strip.removeEventListener('pointerdown', onPointerDown);
      strip.removeEventListener('pointermove', onPointerMove);
      strip.removeEventListener('pointerup', onPointerUp);
      strip.removeEventListener('pointercancel', onPointerUp);
      strip.removeEventListener('pointerleave', onPointerLeave);
      strip.removeEventListener('scroll', onScroll);
    };
  });
</script>
