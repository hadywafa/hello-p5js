export class Line {
  slope: any;
  offset: any;
  constructor(slope: any, offset: any) {
    this.slope = slope;
    this.offset = offset;
  }

  valueAt(x: any) {
    return this.slope * x + this.offset;
  }

  reflectPoint(point: any) {
    // following this simple explanation:
    // https://martin-thoma.com/reflecting-a-point-over-a-line/
    const bisector = this.perpendicularBisector();

    // with:  y = slope * x + offset, solve for Offset at known 'point'
    bisector.offset = point.y - bisector.slope * point.x;

    // solve for interset of this line, and its bisector through the 'point'
    const xIntersect = (bisector.offset - this.offset) / (this.slope - bisector.slope);
    const yIntersect = this.valueAt(xIntersect);

    const reflectedPoint = { x: undefined, y: undefined };
    reflectedPoint.x = point.x + 2 * (xIntersect - point.x);
    reflectedPoint.y = point.y + 2 * (yIntersect - point.y);
    return reflectedPoint;
  }

  perpendicularBisector() {
    return new Line(-1 / this.slope, undefined);
  }
}

// Special Cases below - to avoid divide-by-zero cases.

export class VerticalLine {
  slope: number;
  offset: undefined;
  xOffset: any;
  constructor(xOffset: any) {
    this.slope = Infinity;
    this.offset = undefined;
    this.xOffset = xOffset;
  }

  valueAt() {
    return undefined;
  }

  reflectPoint(point: any) {
    const reflectedPoint = { x: point.x, y: point.y };
    reflectedPoint.x = this.xOffset - (point.x - this.xOffset);
    return reflectedPoint;
  }

  perpendicularBisector() {
    return new HorizontalLine(0);
  }
}

export class HorizontalLine {
  slope: number;
  offset: any;
  constructor(yOffset: any) {
    this.slope = 0;
    this.offset = yOffset;
  }

  valueAt() {
    return this.offset;
  }

  reflectPoint(point: any) {
    const reflectedPoint = { x: point.x, y: point.y };
    reflectedPoint.y = this.offset - (point.y - this.offset);
    return reflectedPoint;
  }

  perpendicularBisector() {
    return new VerticalLine(undefined);
  }
}
