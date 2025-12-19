import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;

  initialLeftPx?: number;
  minLeftPx?: number;
  maxLeftPx?: number;
  splitterPx?: number;
  breakpointPx?: number;

  storageKey?: string;
  style?: React.CSSProperties;
};

export function ResizableColumns({
  left,
  right,
  initialLeftPx = 480,
  minLeftPx = 280,
  maxLeftPx = 900,
  splitterPx = 6,
  breakpointPx = 768,
  storageKey = "ui-left-pane-width",
  style,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const [leftPx, setLeftPx] = useState<number>(() => {
    if (!storageKey) return initialLeftPx;
    const raw = localStorage.getItem(storageKey);
    const n = raw ? Number(raw) : initialLeftPx;
    return Number.isFinite(n) ? n : initialLeftPx;
  });

  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setIsNarrow(w < breakpointPx);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [breakpointPx]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, String(leftPx));
  }, [leftPx, storageKey]);

  const clamp = useCallback(
    (v: number) => Math.max(minLeftPx, Math.min(maxLeftPx, v)),
    [minLeftPx, maxLeftPx]
  );

  const gridTemplateColumns = useMemo(() => {
    if (isNarrow) return "1fr";
    return `${leftPx}px ${splitterPx}px 1fr`;
  }, [isNarrow, leftPx, splitterPx]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isNarrow) return;
      draggingRef.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.preventDefault();
    },
    [isNarrow]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isNarrow) return;
      if (!draggingRef.current) return;
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      setLeftPx(clamp(e.clientX - rect.left));
    },
    [clamp, isNarrow]
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
        display: "grid",
        gridTemplateColumns,
        gap: isNarrow ? 12 : 0,
        ...style,
      }}
    >
      <div style={{ minWidth: 0, width: "100%" }}>{left}</div>

      {!isNarrow && (
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          title="Drag to resize"
          style={{
            cursor: "col-resize",
            background: "#f3f3f3",
            touchAction: "none",
            userSelect: "none",
          }}
        />
      )}

      <div style={{ minWidth: 0, width: "100%" }}>{right}</div>
    </div>
  );
}
