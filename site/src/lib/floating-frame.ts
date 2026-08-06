/**
 * Pure size/shot helpers for the floating product proof frame.
 * Separated from DOM listeners so unit checks exercise real shipped logic.
 * Inspired by vetcoders-io FloatingTerminal clamp/resize behavior.
 */

export const MIN_PANEL_WIDTH = 360;
export const MIN_PANEL_HEIGHT = 280;
export const DEFAULT_PANEL_WIDTH = 920;
export const DEFAULT_PANEL_HEIGHT = 580;

export type PanelSize = { width: number; height: number };

export type ResizeStart = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function clampSize(
  width: number,
  height: number,
  minWidth: number = MIN_PANEL_WIDTH,
  minHeight: number = MIN_PANEL_HEIGHT,
  maxWidth: number = Number.POSITIVE_INFINITY,
  maxHeight: number = Number.POSITIVE_INFINITY,
): PanelSize {
  return {
    width: Math.min(maxWidth, Math.max(minWidth, width)),
    height: Math.min(maxHeight, Math.max(minHeight, height)),
  };
}

/** Bottom-right resize: grow/shrink from pointer delta, then clamp. */
export function applyResize(
  start: ResizeStart,
  clientX: number,
  clientY: number,
  minWidth: number = MIN_PANEL_WIDTH,
  minHeight: number = MIN_PANEL_HEIGHT,
  maxWidth: number = Number.POSITIVE_INFINITY,
  maxHeight: number = Number.POSITIVE_INFINITY,
): PanelSize {
  return clampSize(
    start.width + (clientX - start.x),
    start.height + (clientY - start.y),
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
  );
}

export function clampShotIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return Math.max(0, Math.min(length - 1, Math.trunc(index)));
}

/** Wrap shot index by delta (keyboard / next-prev). */
export function nextShotIndex(
  current: number,
  delta: number,
  length: number,
): number {
  if (length <= 0) return 0;
  const base = clampShotIndex(current, length);
  return (((base + delta) % length) + length) % length;
}

/** Keep panel top-left inside a viewport box with a margin. */
export function clampPosition(
  left: number,
  top: number,
  size: PanelSize,
  viewportWidth: number,
  viewportHeight: number,
  margin: number = 8,
): { left: number; top: number } {
  const maxLeft = Math.max(margin, viewportWidth - size.width - margin);
  const maxTop = Math.max(margin, viewportHeight - size.height - margin);
  return {
    left: Math.min(maxLeft, Math.max(margin, left)),
    top: Math.min(maxTop, Math.max(margin, top)),
  };
}
