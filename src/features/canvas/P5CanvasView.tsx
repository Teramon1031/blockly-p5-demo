import type { RefObject } from "react";

type Props = {
  hostRef: RefObject<HTMLDivElement | null>;
  canvasW: number;
  canvasH: number;
};

export function P5CanvasView({ hostRef, canvasW, canvasH }: Props) {
  return (
    <div style={{ padding: 10 }}>
      <div
        ref={hostRef}
        style={{
          width: canvasW,
          height: canvasH,
          border: "1px solid #ddd",
          borderRadius: 8,
          overflow: "hidden",
        }}
      />
    </div>
  );
}
