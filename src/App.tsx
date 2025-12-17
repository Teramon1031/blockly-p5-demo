import { useEffect, useMemo, useRef, useState } from "react";
import { BlocklyPane } from "./BlocklyPane";
import { mountP5 } from "./p5Runner";

const CANVAS_W = 400;
const CANVAS_H = 400;

export default function App() {
  const [generated, setGenerated] = useState<string>("");
  const [autoRun, setAutoRun] = useState(true);
  const [animate, setAnimate] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canvasHostRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef<{
    destroy: () => void;
    getError: () => string | null;
  } | null>(null);

  const wrappedCode = useMemo(() => {
    // animate が false のときは setupで1回だけ描いて noLoop にする
    if (!animate) {
      return `
p.setup = () => {
  p.createCanvas(${CANVAS_W}, ${CANVAS_H});
  ${generated}
  p.noLoop();
};
p.draw = () => {};
`;
    }

    // animate true: 毎フレーム draw 実行
    return `
p.setup = () => {
  p.createCanvas(${CANVAS_W}, ${CANVAS_H});
};

p.draw = () => {
${generated}
};
`;
  }, [generated, animate]);

  const run = () => {
    if (!canvasHostRef.current) return;
    runningRef.current?.destroy();
    runningRef.current = mountP5(canvasHostRef.current, wrappedCode);
    setError(runningRef.current.getError());
  };

  const stop = () => {
    runningRef.current?.destroy();
    runningRef.current = null;
    if (canvasHostRef.current) canvasHostRef.current.innerHTML = "";
  };

  const reset = () => {
    stop();
    run();
  };

  // Blockly変更で自動Run（授業で強い）
  useEffect(() => {
    if (!autoRun) return;
    // 連打しすぎ防止の軽いデバウンス
    const t = window.setTimeout(() => run(), 120);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generated, animate, autoRun]);

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      {/* Left: Blockly */}
      <div style={{ minWidth: 0, borderRight: "1px solid #e5e5e5" }}>
        <div
          style={{ padding: 10, display: "flex", gap: 8, alignItems: "center" }}
        >
          <div style={{ fontWeight: 700 }}>Blockly</div>
          <label
            style={{
              marginLeft: "auto",
              fontSize: 12,
              color: "#333",
              display: "flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={autoRun}
              onChange={(e) => setAutoRun(e.target.checked)}
            />
            Auto Run
          </label>
        </div>
        <div style={{ height: "calc(100% - 44px)" }}>
          <BlocklyPane onCode={setGenerated} />
        </div>
      </div>

      {/* Right: Code + Canvas */}
      <div
        style={{ minWidth: 0, display: "grid", gridTemplateRows: "1fr 1fr" }}
      >
        <div style={{ borderBottom: "1px solid #e5e5e5", minHeight: 0 }}>
          <div
            style={{
              padding: 10,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 700 }}>Generated JS</div>
            <button onClick={() => navigator.clipboard.writeText(wrappedCode)}>
              Copy
            </button>
            <label
              style={{
                marginLeft: "auto",
                fontSize: 12,
                color: "#333",
                display: "flex",
                gap: 6,
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                checked={animate}
                onChange={(e) => setAnimate(e.target.checked)}
              />
              Animate (draw)
            </label>
          </div>
          <pre
            style={{
              margin: 0,
              padding: 10,
              height: "calc(100% - 44px)",
              overflow: "auto",
              background: "#fafafa",
            }}
          >
            <code>{wrappedCode}</code>
          </pre>
        </div>

        <div style={{ minHeight: 0 }}>
          <div
            style={{
              padding: 10,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 700 }}>p5 Canvas</div>
            <button onClick={run}>Run</button>
            <button onClick={stop}>Stop</button>
            <button onClick={reset}>Reset</button>
            {error && (
              <div
                style={{
                  marginLeft: 10,
                  color: "#b00020",
                  fontSize: 12,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Error: {error}
              </div>
            )}
          </div>

          <div style={{ padding: 10 }}>
            <div
              ref={canvasHostRef}
              style={{
                width: CANVAS_W,
                height: CANVAS_H,
                border: "1px solid #ddd",
                borderRadius: 8,
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
