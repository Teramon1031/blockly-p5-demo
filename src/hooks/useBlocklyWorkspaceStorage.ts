import { useCallback, useRef, useState } from "react";
import * as Blockly from "blockly";

type WorkspaceState = ReturnType<typeof Blockly.serialization.workspaces.save>;

export function useBlocklyWorkspaceStorage(storageKey: string) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  const [workspace, setWorkspace] = useState<Blockly.WorkspaceSvg | null>(null);
  const [restoring, setRestoring] = useState(false);

  const save = useCallback(() => {
    const ws = workspaceRef.current;
    if (!ws) return;
    const json = Blockly.serialization.workspaces.save(ws);
    localStorage.setItem(storageKey, JSON.stringify(json));
  }, [storageKey]);

  const attachWorkspace = useCallback(
    (ws: Blockly.WorkspaceSvg) => {
      workspaceRef.current = ws;
      setWorkspace(ws);

      setRestoring(true);

      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (typeof parsed === "object" && parsed !== null) {
          try {
            Blockly.serialization.workspaces.load(parsed as WorkspaceState, ws);
          } catch {
            console.error("Failed to load workspace");
          }
        }
      }

      requestAnimationFrame(() => {
        setRestoring(false);
      });
    },
    [storageKey]
  );

  return { workspaceRef, workspace, restoring, attachWorkspace, save };
}
