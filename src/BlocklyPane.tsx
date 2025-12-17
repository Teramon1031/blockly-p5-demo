import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";

import "./blocks/p5Blocks";
import "./blocks/p5Generators";

type Props = {
  onCode: (code: string) => void;
};

export function BlocklyPane({ onCode }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!divRef.current) return;

    const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "p5",
          contents: [
            {
              kind: "block",
              type: "p5_background",
              inputs: {
                GRAY: { shadow: { type: "math_number", fields: { NUM: 220 } } },
              },
            },
            {
              kind: "block",
              type: "p5_fill",
              inputs: {
                GRAY: { shadow: { type: "math_number", fields: { NUM: 0 } } },
              },
            },
            {
              kind: "block",
              type: "p5_circle",
              inputs: {
                X: { shadow: { type: "math_number", fields: { NUM: 200 } } },
                Y: { shadow: { type: "math_number", fields: { NUM: 200 } } },
                D: { shadow: { type: "math_number", fields: { NUM: 120 } } },
              },
            },
            {
              kind: "block",
              type: "p5_rect",
              inputs: {
                X: { shadow: { type: "math_number", fields: { NUM: 40 } } },
                Y: { shadow: { type: "math_number", fields: { NUM: 40 } } },
                W: { shadow: { type: "math_number", fields: { NUM: 120 } } },
                H: { shadow: { type: "math_number", fields: { NUM: 80 } } },
              },
            },
          ],
        },
        {
          kind: "category",
          name: "Math",
          contents: [
            { kind: "block", type: "math_number" },
            { kind: "block", type: "math_arithmetic" },
            { kind: "block", type: "math_random_int" },
          ],
        },
        {
          kind: "category",
          name: "Control",
          contents: [{ kind: "block", type: "controls_repeat_ext" }],
        },
        {
          kind: "category",
          name: "Input",
          contents: [
            { kind: "block", type: "p5_mousex" },
            { kind: "block", type: "p5_mousey" },
            { kind: "block", type: "p5_framecount" },
            {
              kind: "block",
              type: "p5_background_rgb",
              inputs: {
                R: { shadow: { type: "math_number", fields: { NUM: 30 } } },
                G: { shadow: { type: "math_number", fields: { NUM: 30 } } },
                B: { shadow: { type: "math_number", fields: { NUM: 60 } } },
              },
            },
            {
              kind: "block",
              type: "p5_stroke",
              inputs: {
                GRAY: { shadow: { type: "math_number", fields: { NUM: 0 } } },
              },
            },
            { kind: "block", type: "p5_nostroke" },
          ],
        },

        // 値ブロック（Number出力）
      ],
    };

    const workspace = Blockly.inject(divRef.current, {
      toolbox,
      trashcan: true,
      scrollbars: true,
      grid: { spacing: 20, length: 3, colour: "#ddd", snap: true },
    });
    workspaceRef.current = workspace;

    const update = () => {
      const code = javascriptGenerator.workspaceToCode(workspace);
      onCode(code);
    };
    workspace.addChangeListener(update);
    update();

    return () => workspace.dispose();
  }, [onCode]);

  return <div ref={divRef} style={{ width: "100%", height: "100%" }} />;
}
