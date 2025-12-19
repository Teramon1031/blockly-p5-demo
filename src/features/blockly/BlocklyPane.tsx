import type * as Blockly from "blockly";
import { PaneShell } from "../../shared/ui/PaneShell";
import { HeaderBar } from "../../shared/ui/HeaderBar";
import { BlocklyWorkspace, type P5Code } from "./BlocklyWorkspace";

type Props = {
  autoRun: boolean;
  onAutoRunChange: (v: boolean) => void;
  onCode: (c: P5Code) => void;
  onWorkspace: (ws: Blockly.WorkspaceSvg) => void;
};

export function BlocklyPane({
  autoRun,
  onAutoRunChange,
  onCode,
  onWorkspace,
}: Props) {
  return (
    <div style={{ height: "100vh", borderRight: "1px solid #e5e5e5" }}>
      <PaneShell
        header={
          <HeaderBar
            title="Blockly"
            right={
              <label
                style={{
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
                  onChange={(e) => onAutoRunChange(e.target.checked)}
                />
                Auto Run
              </label>
            }
          />
        }
      >
        <BlocklyWorkspace onCode={onCode} onWorkspace={onWorkspace} />
      </PaneShell>
    </div>
  );
}
