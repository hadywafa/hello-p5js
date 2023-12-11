import p5 from "p5";
import P5JsUtils from "../p5Utils";

class Point {
  pos: p5.Vector;
  radius: number;
  isBeingDragged: boolean;
  dragEnabled: boolean;
  isDragged = false;
  constructor(private p: p5, x: number, y: number) {
    this.pos = p.createVector(x, y);
    this.radius = 10;
    this.isBeingDragged = false;
    this.dragEnabled = false;
  }

  get x(): number {
    return this.pos.x;
  }

  get y(): number {
    return this.pos.y;
  }

  set x(newVal: number) {
    this.pos.x = newVal;
  }

  set y(newVal: number) {
    this.pos.y = newVal;
  }

  set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  distTo(otherPoint: Point): number {
    return this.p.dist(this.x, this.y, otherPoint.x, otherPoint.y);
  }

  move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  add(point: Point): void {
    this.x += point.x;
    this.y += point.y;
  }

  static get ALIGN_MODE_MOVE_3(): number {
    return 2;
  }

  static get ALIGN_MODE_AVERAGE(): number {
    return 3;
  }

  align(p1: Point, p2: Point, p3: Point, mode?: number): void {
    mode = mode ?? Point.ALIGN_MODE_MOVE_3;

    const vec12 = this.p.createVector(p2.x - p1.x, p2.y - p1.y);
    const vec21 = this.p.createVector(p1.x - p2.x, p1.y - p2.y);
    vec21;
    const vec23 = this.p.createVector(p3.x - p2.x, p3.y - p2.y);

    const heading12 = vec12.heading();
    const heading23 = vec23.heading();

    switch (mode) {
      case Point.ALIGN_MODE_MOVE_3:
        vec23.rotate(heading12 - heading23);
        p3.x = p2.x + vec23.x;
        p3.y = p2.y + vec23.y;
        return;
      case Point.ALIGN_MODE_AVERAGE:
        vec23.rotate(heading12 - heading23);
        p3.x = p2.x + vec23.x;
        p3.y = p2.y + vec23.y;
        return;
    }
  }

  rotateAbout(a: Point | number, b?: number, c?: number): void {
    let otherPoint: p5.Vector;
    let heading: number;

    if (a instanceof Point) {
      otherPoint = a.pos;
      heading = b as number;
    } else {
      otherPoint = this.p.createVector(a as number, b as number);
      heading = c as number;
    }

    const diff = p5.Vector.sub(this.pos, otherPoint);
    diff.rotate(heading);
    this.x = otherPoint.x + diff.x;
    this.y = otherPoint.y + diff.y;
  }

  containsXY(x: number, y: number): boolean {
    return this.p.dist(x, y, this.x, this.y) < this.radius;
  }

  handleMousePressed(mouseX: number, mouseY: number): boolean {
    this.isDragged = this.containsXY(mouseX, mouseY);
    return this.isDragged;
  }

  handleMouseDragged(mouseX: number, mouseY: number): void {
    this.set(mouseX, mouseY);
  }

  handleMouseReleased(): void {
    this.isDragged = false;
  }

  draw(mouseX: number, mouseY: number): void {
    if (this.dragEnabled) {
      const p5JsUtils = new P5JsUtils(this.p);
      p5JsUtils.drawControlPoints(mouseX, mouseY, [this]);
    }
    this.p.point(this.x, this.y);
  }
}
export default Point;
