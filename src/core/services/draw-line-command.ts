import { Command } from "../models/command";
import { Controls, Line } from "../models/controls";

export class DrawLineCommand implements Command {
  private controls: Controls;
  private line: Line;

  constructor(controls: Controls, line: Line) {
    this.controls = controls;
    this.line = line;
  }

  execute() {
    this.controls.drawnElements.push(this.line);
  }

  undo() {
    this.controls.drawnElements.pop();
  }
}
