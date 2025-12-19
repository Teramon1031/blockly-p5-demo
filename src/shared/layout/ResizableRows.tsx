import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  top: React.ReactNode;
  bottom: React.ReactNode;
  initialTopPx?: number;
  minTopPx?: number;
  minBottomPx: number;
  splitterPx?: number;
  storageKey?: string;
  style?: React.CSSProperties;
};

export function ResizableRows({
  top,
  bottom,
  initialTopPx = 320,
  minTopPx = 160,
  minBottomPx,
  splitterPx = 6,
  storageKey = "ui-right-top-height",
  style,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const [rootH, setRootH] = useState(0);

  const [topPx, setTopPx] = useState<number>(() => {
    if (!storageKey) return initialTopPx;
    const raw = localStorage.getItem(storageKey);
    const n = raw ? Number(raw) : initialTopPx;
    return Number.isFinite(n) ? n : initialTopPx;
  });
  useEffect(() => {
    if (rootH === 0) return;

    const lowestTopPx = Math.max(minTopPx, rootH - splitterPx - minBottomPx);

    const rafId = requestAnimationFrame(() => {
      setTopPx(lowestTopPx);
    });
    return () => cancelAnimationFrame(rafId);
  }, [rootH, splitterPx, minBottomPx, minTopPx]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ro = new ResizeObserver(() => {
      setRootH(root.clientHeight);
    });
    ro.observe(root);
    setRootH(root.clientHeight);

    return () => ro.disconnect();
  }, []);

  const maxTopPx = useMemo(() => {
    // bottom の最小高さを確保した残りが top の上限
    const max = rootH - splitterPx - minBottomPx;
    return Math.max(minTopPx, max);
  }, [rootH, splitterPx, minBottomPx, minTopPx]);

  const clamp = useCallback(
    (v: number) => Math.max(minTopPx, Math.min(maxTopPx, v)),
    [minTopPx, maxTopPx]
  );

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setTopPx((v) => clamp(v));
    });
    return () => cancelAnimationFrame(rafId);
  }, [clamp]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, String(topPx));
  }, [topPx, storageKey]);

  const gridTemplateRows = useMemo(
    () => `${topPx}px ${splitterPx}px 1fr`,
    [topPx, splitterPx]
  );

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      const root = rootRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      setTopPx(clamp(e.clientY - rect.top));
    },
    [clamp]
  );

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  return (
    <div
      ref={rootRef}
      style={{
        height: "100%",
        minHeight: 0,
        minWidth: 0,
        display: "grid",
        gridTemplateRows,
        ...style,
      }}
    >
      <div style={{ minHeight: 0, minWidth: 0, overflow: "hidden" }}>{top}</div>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          cursor: "row-resize",
          background: "#f3f3f3",
          touchAction: "none",
          userSelect: "none",
        }}
      />

      <div
        style={{
          minHeight: minBottomPx,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {bottom}
      </div>
    </div>
  );
}
