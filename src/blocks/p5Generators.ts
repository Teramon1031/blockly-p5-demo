import { javascriptGenerator } from "blockly/javascript";

javascriptGenerator.forBlock["p5_background"] = (block) => {
  const g =
    javascriptGenerator.valueToCode(
      block,
      "GRAY",
      javascriptGenerator.ORDER_NONE
    ) || "0";
  return `p.background(${g});\n`;
};

javascriptGenerator.forBlock["p5_fill"] = (block) => {
  const g =
    javascriptGenerator.valueToCode(
      block,
      "GRAY",
      javascriptGenerator.ORDER_NONE
    ) || "255";
  return `p.fill(${g});\n`;
};

javascriptGenerator.forBlock["p5_circle"] = (block) => {
  const x =
    javascriptGenerator.valueToCode(
      block,
      "X",
      javascriptGenerator.ORDER_NONE
    ) || "0";
  const y =
    javascriptGenerator.valueToCode(
      block,
      "Y",
      javascriptGenerator.ORDER_NONE
    ) || "0";
  const d =
    javascriptGenerator.valueToCode(
      block,
      "D",
      javascriptGenerator.ORDER_NONE
    ) || "10";
  return `p.circle(${x}, ${y}, ${d});\n`;
};

javascriptGenerator.forBlock["p5_rect"] = (block) => {
  const x =
    javascriptGenerator.valueToCode(
      block,
      "X",
      javascriptGenerator.ORDER_NONE
    ) || "0";
  const y =
    javascriptGenerator.valueToCode(
      block,
      "Y",
      javascriptGenerator.ORDER_NONE
    ) || "0";
  const w =
    javascriptGenerator.valueToCode(
      block,
      "W",
      javascriptGenerator.ORDER_NONE
    ) || "10";
  const h =
    javascriptGenerator.valueToCode(
      block,
      "H",
      javascriptGenerator.ORDER_NONE
    ) || "10";
  return `p.rect(${x}, ${y}, ${w}, ${h});\n`;
};

javascriptGenerator.forBlock["p5_mousex"] = () => [
  "p.mouseX",
  javascriptGenerator.ORDER_ATOMIC,
];

javascriptGenerator.forBlock["p5_mousey"] = () => [
  "p.mouseY",
  javascriptGenerator.ORDER_ATOMIC,
];
javascriptGenerator.forBlock["p5_framecount"] = () => [
  "p.frameCount",
  javascriptGenerator.ORDER_ATOMIC,
];

javascriptGenerator.forBlock["p5_stroke"] = (block) => {
  const g =
    javascriptGenerator.valueToCode(
      block,
      "GRAY",
      javascriptGenerator.ORDER_NONE
    ) || "0";
  return `p.stroke(${g});\n`;
};

javascriptGenerator.forBlock["p5_nostroke"] = () => `p.noStroke();\n`;

javascriptGenerator.forBlock["p5_background_rgb"] = (block) => {
  const r =
    javascriptGenerator.valueToCode(
      block,
      "R",
      javascriptGenerator.ORDER_NONE
    ) || "0";
  const g =
    javascriptGenerator.valueToCode(
      block,
      "G",
      javascriptGenerator.ORDER_NONE
    ) || "0";
  const b =
    javascriptGenerator.valueToCode(
      block,
      "B",
      javascriptGenerator.ORDER_NONE
    ) || "0";
  return `p.background(${r}, ${g}, ${b});\n`;
};
