import p5 from "p5";
import Point from "./point";
import LineSegment from "./line-segment";
import P5JsUtils from "../p5Utils";

class Circle {
  pos: p5.Vector;
  radius: number;
  debugMode: boolean;
  dragEnabled: boolean;
  isDragged: boolean;
  dragPos: Point;
  dragSize: Point;
  points: Point[];
  fillColor?: p5.Color;
  constructor(private p: p5, x: number, y: number, radius: number) {
    this.pos = p.createVector(x, y);
    this.radius = radius;
    this.debugMode = false;
    this.dragEnabled = false;
    this.isDragged = false;

    this.dragPos = new Point(p, 0, 0);
    this.dragPos.pos = this.pos;
    this.dragSize = new Point(p, this.x + this.radius, this.y);
    this.points = [this.dragPos, this.dragSize];
  }

  get x() {
    return this.pos.x;
  }
  get y() {
    return this.pos.y;
  }
  get minX() {
    return this.pos.x - this.radius;
  }
  get maxX() {
    return this.pos.x + this.radius;
  }
  get minY() {
    return this.pos.y - this.radius;
  }
  get maxY() {
    return this.pos.y + this.radius;
  }
  get centerX() {
    return this.pos.x;
  }
  get centerY() {
    return this.pos.y;
  }
  get width() {
    return this.radius * 2;
  }
  get height() {
    return this.radius * 2;
  }

  setSize(newSize: number) {
    this.radius = newSize / 2;
  }

  pointsAtX(x: number) {
    if (x < this.minX || x > this.maxX) {
      return [];
    }

    // dx^2 + dy^2 = r^2
    // dy = (r^2 - dx^2) ^ 0.5
    const dx = this.x - x;
    const rSquared = Math.pow(this.radius, 2);
    const dy = Math.pow(rSquared - dx * dx, 0.5);

    return [
      { x: x, y: this.y + dy },
      { x: x, y: this.y - dy },
    ];
  }

  pointsAtY(y: number) {
    if (y < this.minY || y > this.maxY) {
      return [];
    }

    // dx^2 + dy^2 = r^2
    // dx = (r^2 - dy^2) ^ 0.5
    const dy = this.y - y;
    const rSquared = Math.pow(this.radius, 2);
    const dx = Math.pow(rSquared - dy * dy, 0.5);

    return [
      { x: this.x + dx, y: y },
      { x: this.x - dx, y: y },
    ];
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
      if (this.dragSize == pointDragged) {
        pointDragged.x = mouseX;
        this.radius = this.p.dist(pointDragged.x, pointDragged.y, this.x, this.y);
      } else if (this.dragPos == pointDragged) {
        pointDragged.set(mouseX, mouseY);
        this.dragSize.y = pointDragged.y;
        this.dragSize.x = pointDragged.x + this.radius;
      }
    }
  }

  handleMouseReleased() {
    this.points.forEach((p) => {
      p.isBeingDragged = false;
    });
    this.isDragged = false;
  }

  containsXY(x: number, y: number) {
    return this.p.dist(x, y, this.x, this.y) < this.radius;
  }

  tangentPoint(point: Point, clockwiseWrap = true) {
    const vec = this.p.createVector(this.x - point.x, this.y - point.y);
    const dist = vec.mag();
    if (dist < this.radius) {
      return point;
    }

    const theta = Math.asin(this.radius / dist);
    const rotationAngle = clockwiseWrap ? -1 * theta : theta;
    vec.rotate(rotationAngle);
    vec.setMag(dist * Math.cos(theta));
    return { x: point.x + vec.x, y: point.y + vec.y };
  }

  radialVector(point: Point) {
    return this.p.createVector(point.x - this.x, point.y - this.y);
  }

  static get TANGENT_MODE_POS_TO_POS() {
    return 1;
  }
  static get TANGENT_MODE_POS_TO_NEG() {
    return -1;
  }
  static get TANGENT_MODE_NEG_TO_POS() {
    return -2;
  }
  static get TANGENT_MODE_NEG_TO_NEG() {
    return 2;
  }

  tangentToCircle(other: Point, mode = Circle.TANGENT_MODE_POS_TO_POS, mouseX: number, mouseY: number) {
    const wrap = mode == Circle.TANGENT_MODE_POS_TO_POS || mode == Circle.TANGENT_MODE_NEG_TO_POS;
    if (other.radius == undefined || other.radius == 0) {
      const tangentPt = this.tangentPoint(other, wrap);
      return new LineSegment(this.p, other.x, other.y, tangentPt.x, tangentPt.y);
    }

    const bigger = this.radius >= other.radius ? this : other;
    const smaller = this.radius >= other.radius ? other : this;

    const modifier = Math.sign(mode);
    const virtualRadius = bigger.radius - smaller.radius * modifier;
    const virtualCircle = new Circle(this.p, bigger.x, bigger.y, virtualRadius);

    const tangentPtOnVirtual = virtualCircle.tangentPoint(smaller as Point, wrap);
    const radialLine = virtualCircle.radialVector(tangentPtOnVirtual as Point);
    radialLine.setMag(smaller.radius);

    if (this.debugMode) {
      this.debugHelperObjects(virtualCircle, smaller, tangentPtOnVirtual, radialLine, mouseX, mouseY);
    }

    const tangentSegment = new LineSegment(this.p, smaller.x, smaller.y, tangentPtOnVirtual.x, tangentPtOnVirtual.y);
    tangentSegment.translate(modifier * radialLine.x, modifier * radialLine.y);
    return tangentSegment;
  }

  debugHelperObjects(
    virtualCircle: Circle,
    smaller: any,
    tangentPtOnVirtual: any,
    radialLine: any,
    mouseX: number,
    mouseY: number
  ) {
    this.p.stroke(50, 200, 40);
    virtualCircle.draw(mouseX, mouseY);

    this.p.stroke(200, 200, 40);
    this.p.line(smaller.x, smaller.y, tangentPtOnVirtual.x, tangentPtOnVirtual.y);

    const debugRadialSegment = new LineSegment(
      smaller.x,
      smaller.y,
      radialLine.x + smaller.x,
      radialLine.y + smaller.y
    );
    this.p.stroke(40, 200, 200);
    debugRadialSegment.draw(mouseX, mouseY);
  }

  draw(mouseX: number, mouseY: number) {
    const p5JsUtils = new P5JsUtils(this.p);
    p5JsUtils.applyStyleSet(this);
    this.p.ellipseMode("center");
    this.p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

    if (this.dragEnabled) {
      p5JsUtils.drawControlPoints(mouseX, mouseY, [(this.dragPos, this.dragSize)]);
    }
  }
}
export default Circle;
