import { javascriptGenerator, Order } from "blockly/javascript";

/**
 * Flow blocks themselves generate nothing.
 * (BlocklyPane 側で statementToCode で中身だけ拾う前提)
 */
javascriptGenerator.forBlock["p5_setup"] = () => "";
javascriptGenerator.forBlock["p5_draw"] = () => "";

/**
 * Values
 */
javascriptGenerator.forBlock["p5_color"] = (block) => {
  const color = block.getFieldValue("COLOR") || "#000000";
  return [`"${color}"`, Order.ATOMIC];
};

javascriptGenerator.forBlock["p5_rgb"] = (block) => {
  const r = javascriptGenerator.valueToCode(block, "R", Order.NONE) || "0";
  const g = javascriptGenerator.valueToCode(block, "G", Order.NONE) || "0";
  const b = javascriptGenerator.valueToCode(block, "B", Order.NONE) || "0";
  return [`p.color(${r}, ${g}, ${b})`, Order.ATOMIC];
};

javascriptGenerator.forBlock["p5_millis"] = () => {
  return ["p.millis()", Order.ATOMIC];
};

javascriptGenerator.forBlock["p5_mousex"] = () => {
  return ["p.mouseX", Order.ATOMIC];
};

javascriptGenerator.forBlock["p5_mousey"] = () => {
  return ["p.mouseY", Order.ATOMIC];
};

javascriptGenerator.forBlock["p5_mouseispressed"] = () => {
  return ["p.mouseIsPressed", Order.ATOMIC];
};

/**
 * Draw
 */
javascriptGenerator.forBlock["p5_background"] = (block) => {
  const c =
    javascriptGenerator.valueToCode(block, "COLOR", Order.NONE) || "255";
  return `p.background(${c});\n`;
};

javascriptGenerator.forBlock["p5_circle"] = (block) => {
  const x = javascriptGenerator.valueToCode(block, "X", Order.NONE) || "0";
  const y = javascriptGenerator.valueToCode(block, "Y", Order.NONE) || "0";
  const d = javascriptGenerator.valueToCode(block, "D", Order.NONE) || "10";
  return `p.circle(${x}, ${y}, ${d});\n`;
};

javascriptGenerator.forBlock["p5_rect"] = (block) => {
  const x = javascriptGenerator.valueToCode(block, "X", Order.NONE) || "0";
  const y = javascriptGenerator.valueToCode(block, "Y", Order.NONE) || "0";
  const w = javascriptGenerator.valueToCode(block, "W", Order.NONE) || "10";
  const h = javascriptGenerator.valueToCode(block, "H", Order.NONE) || "10";
  return `p.rect(${x}, ${y}, ${w}, ${h});\n`;
};

javascriptGenerator.forBlock["p5_line"] = (block) => {
  const x1 = javascriptGenerator.valueToCode(block, "X1", Order.NONE) || "0";
  const y1 = javascriptGenerator.valueToCode(block, "Y1", Order.NONE) || "0";
  const x2 = javascriptGenerator.valueToCode(block, "X2", Order.NONE) || "0";
  const y2 = javascriptGenerator.valueToCode(block, "Y2", Order.NONE) || "0";
  return `p.line(${x1}, ${y1}, ${x2}, ${y2});\n`;
};

/**
 * Style
 */
javascriptGenerator.forBlock["p5_fill"] = (block) => {
  const c =
    javascriptGenerator.valueToCode(block, "COLOR", Order.NONE) || "255";
  return `p.fill(${c});\n`;
};

javascriptGenerator.forBlock["p5_stroke"] = (block) => {
  const c = javascriptGenerator.valueToCode(block, "COLOR", Order.NONE) || "0";
  return `p.stroke(${c});\n`;
};

javascriptGenerator.forBlock["p5_nofill"] = () => `p.noFill();\n`;
javascriptGenerator.forBlock["p5_nostroke"] = () => `p.noStroke();\n`;

javascriptGenerator.forBlock["p5_strokeweight"] = (block) => {
  const w = javascriptGenerator.valueToCode(block, "W", Order.NONE) || "1";
  return `p.strokeWeight(${w});\n`;
};

/**
 * Transform
 */
javascriptGenerator.forBlock["p5_push"] = () => `p.push();\n`;
javascriptGenerator.forBlock["p5_pop"] = () => `p.pop();\n`;

javascriptGenerator.forBlock["p5_translate"] = (block) => {
  const x = javascriptGenerator.valueToCode(block, "X", Order.NONE) || "0";
  const y = javascriptGenerator.valueToCode(block, "Y", Order.NONE) || "0";
  return `p.translate(${x}, ${y});\n`;
};

javascriptGenerator.forBlock["p5_rotate"] = (block) => {
  const a = javascriptGenerator.valueToCode(block, "A", Order.NONE) || "0";
  return `p.rotate(${a});\n`;
};
