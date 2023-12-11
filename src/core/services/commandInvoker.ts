import { Command } from "../models/command";

export class CommandInvoker {
  private history: Command[] = [];
  private currentIndex: number = -1;

  executeCommand(command: Command) {
    command.execute();
    this.history.push(command);
    this.currentIndex = this.history.length - 1;
  }

  undo() {
    if (this.currentIndex >= 0) {
      this.history[this.currentIndex].undo();
      this.currentIndex--;
    }
  }

  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.history[this.currentIndex].execute();
    }
  }
}
