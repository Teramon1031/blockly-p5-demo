import * as Blockly from "blockly";
import { FieldColour } from "@blockly/field-colour";

/**
 * p5 Flow
 */
Blockly.Blocks["p5_setup"] = {
  init() {
    this.appendDummyInput().appendField("setup (1回だけ)");
    this.appendStatementInput("DO").appendField("do");
    this.setColour(20);
    this.setDeletable(false);
    this.setMovable(false);
    this.setEditable(true);
    this.setTooltip("最初に1回だけ実行される処理");
  },
};

Blockly.Blocks["p5_draw"] = {
  init() {
    this.appendDummyInput().appendField("draw (毎フレーム)");
    this.appendStatementInput("DO").appendField("do");
    this.setColour(20);
    this.setDeletable(false);
    this.setMovable(false);
    this.setEditable(true);
    this.setTooltip("毎フレーム実行される処理");
  },
};

/**
 * p5 Values
 */
Blockly.Blocks["p5_color"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("color")
      .appendField(new FieldColour("#ff0000"), "COLOR");
    this.setOutput(true, "Colour"); // Blocklyの型名は英式
    this.setColour(230);
  },
};

Blockly.Blocks["p5_rgb"] = {
  init: function () {
    this.appendValueInput("R").setCheck("Number").appendField("rgb r");
    this.appendValueInput("G").setCheck("Number").appendField("g");
    this.appendValueInput("B").setCheck("Number").appendField("b");
    this.setOutput(true, "Colour");
    this.setColour(230);
  },
};

Blockly.Blocks["p5_millis"] = {
  init: function () {
    this.appendDummyInput().appendField("millis");
    this.setOutput(true, "Number");
    this.setColour(230);
  },
};

Blockly.Blocks["p5_mousex"] = {
  init: function () {
    this.appendDummyInput().appendField("mouseX");
    this.setOutput(true, "Number");
    this.setColour(230);
  },
};

Blockly.Blocks["p5_mousey"] = {
  init: function () {
    this.appendDummyInput().appendField("mouseY");
    this.setOutput(true, "Number");
    this.setColour(230);
  },
};

Blockly.Blocks["p5_mouseispressed"] = {
  init: function () {
    this.appendDummyInput().appendField("mouseIsPressed");
    this.setOutput(true, "Boolean");
    this.setColour(230);
  },
};

/**
 * p5 Draw
 */
Blockly.Blocks["p5_background"] = {
  init: function () {
    this.appendValueInput("COLOR")
      .setCheck(["Number", "Colour"]) // グレー(数値)でも色(#rrggbb)でもOK
      .appendField("background");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};

Blockly.Blocks["p5_circle"] = {
  init: function () {
    this.appendValueInput("X").setCheck("Number").appendField("circle x");
    this.appendValueInput("Y").setCheck("Number").appendField("y");
    this.appendValueInput("D").setCheck("Number").appendField("d");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};

Blockly.Blocks["p5_rect"] = {
  init: function () {
    this.appendValueInput("X").setCheck("Number").appendField("rect x");
    this.appendValueInput("Y").setCheck("Number").appendField("y");
    this.appendValueInput("W").setCheck("Number").appendField("w");
    this.appendValueInput("H").setCheck("Number").appendField("h");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};

Blockly.Blocks["p5_line"] = {
  init: function () {
    this.appendValueInput("X1").setCheck("Number").appendField("line x1");
    this.appendValueInput("Y1").setCheck("Number").appendField("y1");
    this.appendValueInput("X2").setCheck("Number").appendField("x2");
    this.appendValueInput("Y2").setCheck("Number").appendField("y2");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};

/**
 * p5 Style
 */
Blockly.Blocks["p5_fill"] = {
  init: function () {
    this.appendValueInput("COLOR")
      .setCheck(["Number", "Colour"])
      .appendField("fill");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};

Blockly.Blocks["p5_stroke"] = {
  init: function () {
    this.appendValueInput("COLOR")
      .setCheck(["Number", "Colour"])
      .appendField("stroke");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};

Blockly.Blocks["p5_nofill"] = {
  init: function () {
    this.appendDummyInput().appendField("noFill");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};

Blockly.Blocks["p5_nostroke"] = {
  init: function () {
    this.appendDummyInput().appendField("noStroke");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};

Blockly.Blocks["p5_strokeweight"] = {
  init: function () {
    this.appendValueInput("W").setCheck("Number").appendField("strokeWeight");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};

/**
 * p5 Transform
 */
Blockly.Blocks["p5_push"] = {
  init: function () {
    this.appendDummyInput().appendField("push");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
  },
};

Blockly.Blocks["p5_pop"] = {
  init: function () {
    this.appendDummyInput().appendField("pop");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
  },
};

Blockly.Blocks["p5_translate"] = {
  init: function () {
    this.appendValueInput("X").setCheck("Number").appendField("translate x");
    this.appendValueInput("Y").setCheck("Number").appendField("y");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
  },
};

Blockly.Blocks["p5_rotate"] = {
  init: function () {
    this.appendValueInput("A")
      .setCheck("Number")
      .appendField("rotate (radians)");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
  },
};
