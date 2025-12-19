import type { RefObject } from "react";
import { PaneShell } from "../../shared/ui/PaneShell";
import { HeaderBar } from "../../shared/ui/HeaderBar";
import { P5CanvasView } from "../../features/canvas/P5CanvasView";

type Props = {
  hostRef: RefObject<HTMLDivElement | null>;
  error: string | null;
  onRun: () => void;
  onStop: () => void;
  onReset: () => void;
  canvasW: number;
  canvasH: number;
};

export function CanvasPane({
  hostRef,
  error,
  onRun,
  onStop,
  onReset,
  canvasW,
  canvasH,
}: Props) {
  return (
    <div style={{ minHeight: 0 }}>
      <PaneShell
        header={
          <HeaderBar
            title="p5 Canvas"
            right={
              <>
                <button onClick={onRun}>Run</button>
                <button onClick={onStop}>Stop</button>
                <button onClick={onReset}>Reset</button>
                {error && (
                  <span
                    style={{
                      color: "#b00020",
                      fontSize: 12,
                      maxWidth: 320,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "inline-block",
                    }}
                    title={error}
                  >
                    Error: {error}
                  </span>
                )}
              </>
            }
          />
        }
      >
        <div
          style={{
            height: "100%",
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end", // ★下寄せ
          }}
        >
          <P5CanvasView hostRef={hostRef} canvasW={canvasW} canvasH={canvasH} />
        </div>
      </PaneShell>
    </div>
  );
}
