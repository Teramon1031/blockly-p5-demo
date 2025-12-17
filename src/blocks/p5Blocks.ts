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
