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
    let settleTimer: number | null = null;
    let lastWheelAt = 0;
    let gestureAxis: 'x' | 'y' | null = null;
    let gestureConsumed = 0;

    const WHEEL_GESTURE_IDLE_MS = 140;
    const VERTICAL_CAPTURE_LIMIT_FACTOR = 1.15;

    function getScrollAmount(): number {
      const styles = window.getComputedStyle(strip);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      const firstCard = strip.querySelector<HTMLElement>('.card:not(.card--clone)') ?? strip.querySelector<HTMLElement>('.card');
      const width = firstCard?.getBoundingClientRect().width ?? 300;
      return width + gap;
    }

    function getCardElements(): HTMLElement[] {
      const originalCards = Array.from(strip.querySelectorAll<HTMLElement>('.card:not(.card--clone)'));
      if (originalCards.length > 0) return originalCards;
      return Array.from(strip.querySelectorAll<HTMLElement>('.card'));
    }

    function getMaxScrollLeft(): number {
      return Math.max(0, strip.scrollWidth - strip.clientWidth);
    }

    function clampScrollLeft(value: number): number {
      return Math.min(Math.max(0, value), getMaxScrollLeft());
    }

    function getSnapPoint(card: HTMLElement): number {
      const styles = window.getComputedStyle(strip);
      const inlineStart = parseFloat(styles.paddingInlineStart || styles.paddingLeft || '0');
      return clampScrollLeft(card.offsetLeft - inlineStart);
    }

    function getNearestSnapPoint(base = strip.scrollLeft): number {
      const cards = getCardElements();
      if (cards.length === 0) return clampScrollLeft(base);

      let nearestPoint = getSnapPoint(cards[0]);
      let nearestDistance = Math.abs(base - nearestPoint);

      for (const card of cards.slice(1)) {
        const point = getSnapPoint(card);
        const distance = Math.abs(base - point);
        if (distance < nearestDistance) {
          nearestPoint = point;
          nearestDistance = distance;
        }
      }

      return nearestPoint;
    }

    function clearSettleTimer(): void {
      if (settleTimer !== null) {
        window.clearTimeout(settleTimer);
        settleTimer = null;
      }
    }

    function settleToNearestCard(): void {
      if (isDragging || getMaxScrollLeft() <= 1) return;

      const target = getNearestSnapPoint();
      if (Math.abs(target - strip.scrollLeft) <= 6) return;

      strip.scrollTo({
        left: target,
        behavior: prefersReduced.matches ? 'auto' : 'smooth',
      });
      updateChrome();
    }

    function scheduleSettle(delay = 120): void {
      clearSettleTimer();
      settleTimer = window.setTimeout(() => {
        settleTimer = null;
        settleToNearestCard();
      }, delay);
    }

    function resetWheelGesture(): void {
      gestureAxis = null;
      gestureConsumed = 0;
      lastWheelAt = 0;
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
        try {
          strip.releasePointerCapture?.(pointerId);
        } catch {
          // Pointer capture may already be released during fast route or device changes.
        }
      }
      pointerId = null;
      isDragging = false;
      scheduleSettle(150);
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
      clearSettleTimer();
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
      if (event.ctrlKey) return;

      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      const now = performance.now();
      const isNewGesture = now - lastWheelAt > WHEEL_GESTURE_IDLE_MS;
      if (isNewGesture) {
        gestureAxis = null;
        gestureConsumed = 0;
      }
      lastWheelAt = now;

      const horizontalIntent = event.shiftKey || absX > absY * 0.9;
      const verticalIntent = finePointer.matches && absY > 0 && absY >= absX;
      gestureAxis ??= horizontalIntent ? 'x' : verticalIntent ? 'y' : null;

      let delta = 0;
      if (gestureAxis === 'x' && horizontalIntent) {
        delta = absX > 0 ? event.deltaX : event.deltaY;
      } else if (gestureAxis === 'y' && verticalIntent) {
        const remaining = getScrollAmount() * VERTICAL_CAPTURE_LIMIT_FACTOR - Math.abs(gestureConsumed);
        if (remaining <= 1) return;
        delta = Math.sign(event.deltaY) * Math.min(absY * 0.88, remaining);
      }

      if (!delta || !canConsume(delta)) return;

      event.preventDefault();
      clearSettleTimer();
      strip.scrollLeft = clampScrollLeft(strip.scrollLeft + delta);
      if (gestureAxis === 'y') {
        gestureConsumed += delta;
      }
      updateChrome();
      scheduleSettle();
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
      clearSettleTimer();
      resetWheelGesture();
      strip.scrollLeft = clampScrollLeft(strip.scrollLeft);
      updateChrome();
    };
    window.addEventListener('resize', onResize);
    updateChrome();

    return () => {
      clearSettleTimer();
      resetWheelGesture();
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
