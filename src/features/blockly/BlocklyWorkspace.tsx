import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { toolbox } from "./blocks/toolbox";

import "blockly/blocks";
import "./blocks/p5Blocks";
import "./blocks/p5Generators";

export type P5Code = {
  setupBody: string;
  drawBody: string;
  helpers: string;
};

type Props = {
  onCode: (code: P5Code) => void;
  onWorkspace?: (ws: Blockly.WorkspaceSvg) => void;
};

function firstBlock(
  ws: Blockly.WorkspaceSvg,
  type: string
): Blockly.Block | null {
  const blocks = ws.getBlocksByType(type, false);
  return blocks.length > 0 ? blocks[0] : null;
}

export function BlocklyWorkspace({ onCode, onWorkspace }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = divRef.current;
    if (!host) return;

    const workspace = Blockly.inject(host, {
      toolbox,
      trashcan: true,
      scrollbars: true,
      grid: { spacing: 20, length: 3, colour: "#ddd", snap: true },
    });

    // paneのサイズ変更に追従
    const ro = new ResizeObserver(() => {
      Blockly.svgResize(workspace);
      workspace.scrollbar?.resize();
    });
    ro.observe(host);

    const update = () => {
      javascriptGenerator.init(workspace);

      const setupBlock = firstBlock(workspace, "p5_setup");
      const drawBlock = firstBlock(workspace, "p5_draw");

      const setupBody = setupBlock
        ? javascriptGenerator.statementToCode(setupBlock, "DO")
        : "";
      const drawBody = drawBlock
        ? javascriptGenerator.statementToCode(drawBlock, "DO")
        : "";

      const helpers = javascriptGenerator.finish("");

      onCode({ setupBody, drawBody, helpers });
    };

    const listener = (e: Blockly.Events.Abstract) => {
      if (e.isUiEvent) return;
      update();
    };

    workspace.addChangeListener(listener);
    onWorkspace?.(workspace);

    // 初回も一度サイズ反映
    Blockly.svgResize(workspace);
    workspace.scrollbar?.resize();

    update();

    return () => {
      ro.disconnect();
      workspace.removeChangeListener(listener);
      workspace.dispose();
    };
  }, [onCode, onWorkspace]);

  return (
    <div
      ref={divRef}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    />
  );
}
