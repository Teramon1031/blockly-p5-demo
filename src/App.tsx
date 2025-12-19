import { useCallback, useMemo, useState } from "react";
import type * as Blockly from "blockly";

import { ResizableColumns } from "./shared/layout/ResizableColumns";

import { BlocklyPane } from "./features/blockly/BlocklyPane";
import type { P5Code } from "./features/blockly/BlocklyWorkspace";
import { GeneratedCodePane } from "./features/preview/GeneratedCodePane";
import { CanvasPane } from "./features/canvas/CanvasPane";

import { useBlocklyWorkspaceStorage } from "./hooks/useBlocklyWorkspaceStorage";
import { useAutorun } from "./hooks/useAutorun";
import { useP5Runner } from "./hooks/useP5Runner";

import { buildP5UserCode } from "./lib/p5Wrap";
import { ResizableRows } from "./shared/layout/ResizableRows";

const CANVAS_W = 400;
const CANVAS_H = 400;
const STORAGE_KEY = "blockly-workspace-v1";
const CANVAS_MIN_BOTTOM = CANVAS_H + 44 + 20;

export default function App() {
  const [code, setCode] = useState<P5Code>({
    setupBody: "",
    drawBody: "",
    helpers: "",
  });
  const [autoRun, setAutoRun] = useState(true);
  const [animate, setAnimate] = useState(true);

  const { workspace, restoring, attachWorkspace, save } =
    useBlocklyWorkspaceStorage(STORAGE_KEY);

  const { hostRef, error, run, stop, reset } = useP5Runner();

  const wrappedCode = useMemo(
    () =>
      buildP5UserCode(code, { canvasW: CANVAS_W, canvasH: CANVAS_H, animate }),
    [code, animate]
  );

  const onWorkspace = useCallback(
    (ws: Blockly.WorkspaceSvg) => attachWorkspace(ws),
    [attachWorkspace]
  );

  const onCode = useCallback(
    (next: P5Code) => {
      setCode(next);
      if (!restoring) save();
    },
    [save, restoring]
  );

  const runNow = useCallback(() => run(wrappedCode), [run, wrappedCode]);
  const resetNow = useCallback(() => reset(wrappedCode), [reset, wrappedCode]);

  useAutorun({
    enabled: autoRun,
    restoring,
    workspace,
    run: runNow,
    deps: [wrappedCode, animate, autoRun],
  });

  return (
    <ResizableColumns
      storageKey="ui-left-pane-width"
      left={
        <BlocklyPane
          autoRun={autoRun}
          onAutoRunChange={setAutoRun}
          onCode={onCode}
          onWorkspace={onWorkspace}
        />
      }
      right={
        <ResizableRows
          minBottomPx={CANVAS_MIN_BOTTOM}
          top={
            <GeneratedCodePane
              wrappedCode={wrappedCode}
              animate={animate}
              onAnimateChange={setAnimate}
            />
          }
          bottom={
            <CanvasPane
              hostRef={hostRef}
              error={error}
              onRun={runNow}
              onStop={stop}
              onReset={resetNow}
              canvasW={CANVAS_W}
              canvasH={CANVAS_H}
            />
          }
        />
      }
    />
  );
}
