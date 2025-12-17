import * as Blockly from "blockly";

Blockly.Blocks["p5_background"] = {
  init: function () {
    this.appendValueInput("GRAY")
      .setCheck("Number")
      .appendField("background gray");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};

Blockly.Blocks["p5_fill"] = {
  init: function () {
    this.appendValueInput("GRAY").setCheck("Number").appendField("fill gray");
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

Blockly.Blocks["p5_framecount"] = {
  init: function () {
    this.appendDummyInput().appendField("frameCount");
    this.setOutput(true, "Number");
    this.setColour(230);
  },
};

Blockly.Blocks["p5_stroke"] = {
  init: function () {
    this.appendValueInput("GRAY").setCheck("Number").appendField("stroke gray");
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

Blockly.Blocks["p5_background_rgb"] = {
  init: function () {
    this.appendValueInput("R").setCheck("Number").appendField("background r");
    this.appendValueInput("G").setCheck("Number").appendField("g");
    this.appendValueInput("B").setCheck("Number").appendField("b");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};
