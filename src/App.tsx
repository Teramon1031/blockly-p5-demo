import { useMemo, useRef, useState } from "react";
import { BlocklyPane } from "./BlocklyPane";
import { mountP5 } from "./p5Runner";

const CANVAS_W = 400;
const CANVAS_H = 400;

export default function App() {
  const [generated, setGenerated] = useState<string>("");

  const canvasHostRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef<{ destroy: () => void } | null>(null);

  const wrappedCode = useMemo(() => {
    // 生成コード（p.background等）を draw の中に流し込む
    // 最小の“動く土台”をここで用意するのがコツ
    return `
p.setup = () => {
  p.createCanvas(${CANVAS_W}, ${CANVAS_H});
};

p.draw = () => {
${generated}
};
`;
  }, [generated]);

  const run = () => {
    if (!canvasHostRef.current) return;
    runningRef.current?.destroy();
    runningRef.current = mountP5(canvasHostRef.current, wrappedCode);
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
          <div style={{ color: "#666", fontSize: 12 }}>
            ブロックを動かすとコードが更新されます
          </div>
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
