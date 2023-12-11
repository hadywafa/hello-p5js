import p5 from "p5";
import Rect from "../../core/shapes/rect";
import P5JsUtils from "../p5Utils";
import Point from "./point";

class Rectangle extends Rect {
  private points!: Point[];
  private topLeft!: Point;
  private topRight!: Point;
  private bottomRight!: Point;
  private bottomLeft!: Point;
  private dragArea: Rect;
  dragEnabled: boolean = false;
  fillColor?: p5.Color;
  constructor(private p: p5, x: number, y: number, p_nWidth: number, p_nHeight: number) {
    super(x, y, p_nWidth, p_nHeight);
    this.initPoints();
    this.computePoints();
    this.dragArea = this;
  }

  setSize(newSize: number): void {
    const deltaWidth = this.width - newSize;
    const deltaHeight = this.height - newSize;

    // Maintain location
    this._x += deltaWidth / 2;
    this._y += deltaHeight / 2;

    this._width = newSize;
    this._height = newSize;
  }

  initPoints(): void {
    this.topLeft = new Point(this.p, 0, 0);
    this.topRight = new Point(this.p, 0, 0);
    this.bottomRight = new Point(this.p, 0, 0);
    this.bottomLeft = new Point(this.p, 0, 0);

    this.points = [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
  }

  computePoints(): void {
    this.topLeft.set(this.minX, this.minY);
    this.topRight.set(this.maxX, this.minY);
    this.bottomRight.set(this.maxX, this.maxY);
    this.bottomLeft.set(this.minX, this.maxY);
  }

  computePosAndSize(): void {
    const allX = this.points.map((p) => p.x);
    const allY = this.points.map((p) => p.y);

    const minX = Math.min(...allX);
    const minY = Math.min(...allY);
    const maxX = Math.max(...allX);
    const maxY = Math.max(...allY);

    this._x = minX;
    this._y = minY;
    this._width = maxX - minX;
    this._height = maxY - minY;
  }

  handleMousePressed(mouseX: number, mouseY: number): boolean {
    const pointPressed = this.points.find((p) => p.containsXY(mouseX, mouseY));

    if (pointPressed) {
      pointPressed.isBeingDragged = true;
      return true;
    } else {
      const dragAreaPressed = this.dragArea.containsXY(mouseX, mouseY);
      if (dragAreaPressed) {
        return true;
      }
    }
    return false;
  }

  handleMouseDragged(mouseX: number, mouseY: number): void {
    const pointDragged = this.points.find((p) => p.isBeingDragged);

    if (pointDragged) {
      pointDragged.set(mouseX, mouseY);

      if (this.topLeft == pointDragged) {
        this.bottomLeft.x = pointDragged.x;
        this.topRight.y = pointDragged.y;
      } else if (this.topRight == pointDragged) {
        this.bottomRight.x = pointDragged.x;
        this.topLeft.y = pointDragged.y;
      } else if (this.bottomRight == pointDragged) {
        this.topRight.x = pointDragged.x;
        this.bottomLeft.y = pointDragged.y;
      } else if (this.bottomLeft == pointDragged) {
        this.topLeft.x = pointDragged.x;
        this.bottomRight.y = pointDragged.y;
      }
      this.computePosAndSize();
    }
  }

  handleMouseReleased(): void {
    this.points.forEach((p) => {
      p.isBeingDragged = false;
    });
  }

  draw(mouseX: number, mouseY: number): void {
    const p5JsUtils = new P5JsUtils(this.p);
    p5JsUtils.applyStyleSet(this);
    this.p.rect(this.x, this.y, this.width, this.height);

    if (this.dragEnabled) {
      p5JsUtils.drawControlPoints(mouseX, mouseY, this.points);
    }
  }
}

export default Rectangle;
