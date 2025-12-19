import type { BlocklyOptions } from "blockly";

export const toolbox: BlocklyOptions["toolbox"] = {
  kind: "categoryToolbox",
  contents: [
    // --- p5 core ---
    {
      kind: "category",
      name: "p5 Flow",
      colour: "#5C81A6",
      contents: [
        { kind: "block", type: "p5_setup" },
        { kind: "block", type: "p5_draw" },
      ],
    },

    {
      kind: "category",
      name: "p5 Values",
      colour: "#5CA65C",
      contents: [
        { kind: "block", type: "p5_color" },
        { kind: "block", type: "p5_rgb" },
        { kind: "block", type: "p5_millis" },
        { kind: "block", type: "p5_mousex" },
        { kind: "block", type: "p5_mousey" },
        { kind: "block", type: "p5_mouseispressed" },
      ],
    },

    {
      kind: "category",
      name: "p5 Draw",
      colour: "#A6745C",
      contents: [
        {
          kind: "block",
          type: "p5_background",
          inputs: {
            COLOR: {
              shadow: { type: "p5_color" },
            },
          },
        },
        {
          kind: "block",
          type: "p5_circle",
          inputs: {
            X: { shadow: { type: "math_number", fields: { NUM: 200 } } },
            Y: { shadow: { type: "math_number", fields: { NUM: 200 } } },
            D: { shadow: { type: "math_number", fields: { NUM: 50 } } },
          },
        },
        {
          kind: "block",
          type: "p5_rect",
          inputs: {
            X: { shadow: { type: "math_number", fields: { NUM: 150 } } },
            Y: { shadow: { type: "math_number", fields: { NUM: 150 } } },
            W: { shadow: { type: "math_number", fields: { NUM: 100 } } },
            H: { shadow: { type: "math_number", fields: { NUM: 80 } } },
          },
        },
        {
          kind: "block",
          type: "p5_line",
          inputs: {
            X1: { shadow: { type: "math_number", fields: { NUM: 0 } } },
            Y1: { shadow: { type: "math_number", fields: { NUM: 0 } } },
            X2: { shadow: { type: "math_number", fields: { NUM: 400 } } },
            Y2: { shadow: { type: "math_number", fields: { NUM: 400 } } },
          },
        },
      ],
    },

    {
      kind: "category",
      name: "p5 Style",
      colour: "#A65C81",
      contents: [
        {
          kind: "block",
          type: "p5_fill",
          inputs: {
            COLOR: { shadow: { type: "p5_color" } },
          },
        },
        {
          kind: "block",
          type: "p5_stroke",
          inputs: {
            COLOR: { shadow: { type: "p5_color" } },
          },
        },
        { kind: "block", type: "p5_nofill" },
        { kind: "block", type: "p5_nostroke" },
        {
          kind: "block",
          type: "p5_strokeweight",
          inputs: {
            W: { shadow: { type: "math_number", fields: { NUM: 2 } } },
          },
        },
      ],
    },

    {
      kind: "category",
      name: "p5 Transform",
      colour: "#5C68A6",
      contents: [
        { kind: "block", type: "p5_push" },
        { kind: "block", type: "p5_pop" },
        {
          kind: "block",
          type: "p5_translate",
          inputs: {
            X: { shadow: { type: "math_number", fields: { NUM: 0 } } },
            Y: { shadow: { type: "math_number", fields: { NUM: 0 } } },
          },
        },
        {
          kind: "block",
          type: "p5_rotate",
          inputs: {
            A: { shadow: { type: "math_number", fields: { NUM: 0.1 } } },
          },
        },
      ],
    },

    // --- Blockly standard primitives ---
    { kind: "separator" },

    {
      kind: "category",
      name: "Control",
      colour: "#FFAB19",
      contents: [
        { kind: "block", type: "controls_if" },
        { kind: "block", type: "controls_repeat_ext" },
        { kind: "block", type: "controls_whileUntil" },
        { kind: "block", type: "controls_for" },
        { kind: "block", type: "controls_flow_statements" },
      ],
    },
    {
      kind: "category",
      name: "Logic",
      colour: "#4C97FF",
      contents: [
        { kind: "block", type: "logic_compare" },
        { kind: "block", type: "logic_operation" },
        { kind: "block", type: "logic_negate" },
        { kind: "block", type: "logic_boolean" },
      ],
    },
    {
      kind: "category",
      name: "Math",
      colour: "#59C059",
      contents: [
        { kind: "block", type: "math_number" },
        { kind: "block", type: "math_arithmetic" },
        { kind: "block", type: "math_modulo" },
        { kind: "block", type: "math_random_int" },
        { kind: "block", type: "math_random_float" },
      ],
    },

    {
      kind: "category",
      name: "Variables",
      custom: "VARIABLE",
      colour: "#FF8C1A",
    },
    {
      kind: "category",
      name: "Functions",
      custom: "PROCEDURE",
      colour: "#FF6680",
    },
  ],
};
