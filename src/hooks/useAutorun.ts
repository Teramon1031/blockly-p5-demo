import { useEffect } from "react";
import * as Blockly from "blockly";

type Opts = {
  enabled: boolean;
  restoring: boolean;
  workspace: Blockly.WorkspaceSvg | null;
  delayMs?: number;
  run: () => void;
  deps: unknown[];
};

function isDragging(ws: Blockly.WorkspaceSvg | null): boolean {
  if (!ws) return false;
  const maybe = ws as unknown as { isDragging?: () => boolean };
  return typeof maybe.isDragging === "function" ? maybe.isDragging() : false;
}

export function useAutorun({
  enabled,
  restoring,
  workspace,
  delayMs = 300,
  run,
  deps,
}: Opts) {
  useEffect(() => {
    if (!enabled) return;
    if (restoring) return;

    if (Blockly.WidgetDiv.isVisible()) return;

    if (isDragging(workspace)) return;

    const t = window.setTimeout(() => run(), delayMs);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, restoring, workspace, delayMs, run, ...deps]);
}
