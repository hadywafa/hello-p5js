import p5 from "p5";
import P5JsUtils from "../p5Utils";
import Point from "./point";

class Triangle {
  p1: Point;
  p2: Point;
  p3: Point;
  dragEnabled: boolean;
  isDragged: boolean;
  fillColor?: p5.Color;
  points: Point[];
  constructor(private p: p5, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    this.p1 = new Point(p, x1, y1);
    this.p2 = new Point(p, x2, y2);
    this.p3 = new Point(p, x3, y3);

    this.dragEnabled = false;
    this.isDragged = false;
    this.points = [this.p1, this.p2, this.p3];
  }

  handleMousePressed(mouseX: number, mouseY: number) {
    const pointPressed = this.points.find((p) => p.containsXY(mouseX, mouseY));

    if (pointPressed) {
      pointPressed.isBeingDragged = true;
      this.isDragged = true;
      return true;
    }
    return false;
  }

  handleMouseDragged(mouseX: number, mouseY: number) {
    const pointDragged = this.points.find((p) => p.isBeingDragged);

    if (pointDragged) {
      pointDragged.set(mouseX, mouseY);
    }
  }

  handleMouseReleased() {
    this.points.forEach((p) => {
      p.isBeingDragged = false;
    });
    this.isDragged = false;
  }

  draw(mouseX: number, mouseY: number) {
    const p5JsUtils = new P5JsUtils(this.p);
    p5JsUtils.applyStyleSet(this);
    this.p.triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);

    if (this.dragEnabled) {
      p5JsUtils.drawControlPoints(mouseX, mouseY, this.points);
    }
  }
}
export default Triangle;
