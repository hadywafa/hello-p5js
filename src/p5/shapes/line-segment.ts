import p5 from "p5";
import Point from "./point";
import P5JsUtils from "../p5Utils";
import { HorizontalLine, Line, VerticalLine } from "../../core/shapes/line";

class LineSegment {
  start: Point;
  end?: Point;
  points: Point[];
  dragEnabled: boolean;
  isDragged: boolean;
  fillColor?: p5.Color;
  strokeColor?: p5.Color;
  constructor(private p: p5, x1: number | Point, y1?: number, x2?: number, y2?: number) {
    if (typeof x1 === "object" && y1 === undefined) {
      this.start = x1;
      this.end = y1;
    } else {
      this.start = new Point(this.p, x1 as number, y1 as number);
      this.end = new Point(this.p, x2 as number, y2 as number);
    }

    this.points = [this.start, this.end!];
    this.dragEnabled = false;
    this.isDragged = true;
  }

  get dx(): number {
    return this.end!.x - this.start.x;
  }

  get dy(): number {
    return this.end!.y - this.start.y;
  }

  get slope(): number {
    return this.dy / this.dx;
  }

  get offset(): number | undefined {
    if (this.slope === Infinity) {
      return undefined;
    }
    return this.start.y + this.slope * (0 - this.start.x);
  }

  getLine(): Line {
    const slope = this.slope;
    if (slope === Infinity || slope === -Infinity) {
      return new VerticalLine(this.start.x);
    } else if (slope === 0) {
      return new HorizontalLine(this.start.y);
    }

    const line = new Line(slope, undefined);
    line.offset = this.start.y + slope * (0 - this.start.x);
    return line;
  }

  translate(x: number, y: number): void {
    this.start.move(x, y);
    this.end!.move(x, y);
  }

  set startX(val: number) {
    this.start.x = val;
  }

  set startY(val: number) {
    this.start.y = val;
  }

  set endX(val: number) {
    this.end!.x = val;
  }

  set endY(val: number) {
    this.end!.y = val;
  }

  get startX(): number {
    return this.start.x;
  }

  get startY(): number {
    return this.start.y;
  }

  get endX(): number {
    return this.end!.x;
  }

  get endY(): number {
    return this.end!.y;
  }

  handleMousePressed(mouseX: number, mouseY: number): boolean {
    const pointPressed = this.points.find((p) => p.containsXY(mouseX, mouseY));

    if (pointPressed) {
      pointPressed.isBeingDragged = true;
      this.isDragged = true;
      return true;
    }
    return false;
  }

  handleMouseDragged(mouseX: number, mouseY: number): void {
    const pointDragged = this.points.find((p) => p.isBeingDragged);

    if (pointDragged) {
      pointDragged.set(mouseX, mouseY);
    }
  }

  handleMouseReleased(): void {
    this.points.forEach((p) => {
      p.isBeingDragged = false;
    });
    this.isDragged = false;
  }

  draw(mouseX: number, mouseY: number): void {
    const p5JsUtils = new P5JsUtils(this.p);
    p5JsUtils.applyStyleSet(this);
    this.p.line(this.startX, this.startY, this.endX, this.endY);

    if (this.dragEnabled) {
      p5JsUtils.drawControlPoints(mouseX, mouseY, this.points);
    }
  }
}

export default LineSegment;
