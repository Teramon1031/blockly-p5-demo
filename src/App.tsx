import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Blockly from "blockly";
import { BlocklyPane, type P5Code } from "./BlocklyPane";
import { mountP5 } from "./p5Runner";

const CANVAS_W = 400;
const CANVAS_H = 400;
const STORAGE_KEY = "blockly-workspace-v1";

function saveWorkspace(ws: Blockly.WorkspaceSvg) {
  const json = Blockly.serialization.workspaces.save(ws);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
}

function loadWorkspace(ws: Blockly.WorkspaceSvg) {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  const parsed: unknown = JSON.parse(raw);
  if (typeof parsed !== "object" || parsed === null) return;

  try {
    Blockly.serialization.workspaces.load(
      parsed as ReturnType<typeof Blockly.serialization.workspaces.save>,
      ws
    );
  } catch {
    console.error("Failed to load workspace");
  }
}

export default function App() {
  const [code, setCode] = useState<P5Code>({
    setupBody: "",
    drawBody: "",
    helpers: "",
  });
  const [autoRun, setAutoRun] = useState(true);
  const [animate, setAnimate] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canvasHostRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef<{
    destroy: () => void;
    getError: () => string | null;
  } | null>(null);

  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const restoringRef = useRef(false);

  const handleWorkspace = useCallback((ws: Blockly.WorkspaceSvg) => {
    workspaceRef.current = ws;

    restoringRef.current = true;
    loadWorkspace(ws);
    requestAnimationFrame(() => {
      restoringRef.current = false;
    });
  }, []);

  const handleCode = useCallback((next: P5Code) => {
    setCode(next);

    // 復元中は localStorage へ保存しない（連打＆上書き事故回避）
    if (restoringRef.current) return;

    const ws = workspaceRef.current;
    if (ws) saveWorkspace(ws);
  }, []);
  const wrappedCode = useMemo(() => {
    if (!animate) {
      return `
      ${code.helpers}
      p.setup = () => {
        p.createCanvas(${CANVAS_W}, ${CANVAS_H});
      ${code.setupBody}
      ${code.drawBody}
      console.log(${code.helpers});
            console.log(${code.setupBody});
            console.log(${code.drawBody});
        p.noLoop();
      };
      p.draw = () => {};
      `;
    }

    return `
      ${code.helpers}
      p.setup = () => {
        p.createCanvas(${CANVAS_W}, ${CANVAS_H});
      ${code.setupBody}
      };

      p.draw = () => {
      ${code.drawBody}
      };
      `;
  }, [code.drawBody, code.setupBody, animate]);

  const run = useCallback(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    runningRef.current?.destroy();
    runningRef.current = mountP5(host, wrappedCode);
    setError(runningRef.current.getError());
  }, [wrappedCode]);

  const stop = useCallback(() => {
    runningRef.current?.destroy();
    runningRef.current = null;
    if (canvasHostRef.current) canvasHostRef.current.innerHTML = "";
  }, []);

  const reset = useCallback(() => {
    stop();
    run();
  }, [stop, run]);

  useEffect(() => {
    // AutoRun：復元中・入力中・ドラッグ中は走らせない
    if (!autoRun) return;
    if (restoringRef.current) return;
    if (Blockly.WidgetDiv.isVisible()) return;

    const ws = workspaceRef.current;
    // ドラッグ中は邪魔しない（型の都合で存在確認）
    const maybeDragging =
      ws &&
      typeof (ws as unknown as { isDragging?: () => boolean }).isDragging ===
        "function" &&
      (ws as unknown as { isDragging: () => boolean }).isDragging();

    if (maybeDragging) return;

    // タイピングのデバウンス
    const t = window.setTimeout(() => run(), 300);
    return () => window.clearTimeout(t);
  }, [autoRun, code, animate, run]);

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
          <BlocklyPane onCode={handleCode} onWorkspace={handleWorkspace} />
        </div>
      </div>

      {/* Right: Code + Canvas */}
      <div
        style={{
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Generated JS */}
        <div
          style={{
            borderBottom: "1px solid #e5e5e5",
            maxHeight: "40%",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
              overflow: "auto",
              background: "#fafafa",
              flex: 1,
            }}
          >
            <code>{wrappedCode}</code>
          </pre>
        </div>

        {/* Canvas */}
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
