import p5 from "p5";
import Point from "./shapes/point";

class P5JsUtils {
  /**
   *
   */
  constructor(private p: p5) {}
  applyStyleSet(styleSet: any, buffer: any = undefined) {
    if (buffer) {
      if (styleSet.fillColor) {
        buffer.fill(styleSet.fillColor);
      }
      if (styleSet.noFill) {
        buffer.noFill();
      }
      if (styleSet.strokeColor) {
        buffer.stroke(styleSet.strokeColor);
      }
      if (styleSet.noStroke) {
        buffer.noStroke();
      }
      if (styleSet.strokeWeight) {
        buffer.strokeWeight(styleSet.strokeWeight);
      }
    } else {
      if (styleSet.fillColor) {
        this.p.fill(styleSet.fillColor);
      }
      if (styleSet.noFill) {
        this.p.noFill();
      }
      if (styleSet.strokeColor) {
        this.p.stroke(styleSet.strokeColor);
      }
      if (styleSet.noStroke) {
        this.p.noStroke();
      }
      if (styleSet.strokeWeight) {
        this.p.strokeWeight(styleSet.strokeWeight);
      }
    }
  }
  drawControlPoints(mouseX: number, mouseY: number, points: Point[]) {
    this.p.push();
    points.forEach((p) => this._drawControlPoint(mouseX, mouseY, p));
    this.p.pop();
  }
  _drawControlPoint(mouseX: number, mouseY: number, point: Point) {
    if (point.containsXY(mouseX, mouseY)) {
      this.p.fill(200, 200, 100);
    } else {
      this.p.fill(100, 200, 100);
    }
    this.p.noStroke();
    this.p.ellipse(point.x, point.y, 100, 100);
  }
}

export default P5JsUtils;
