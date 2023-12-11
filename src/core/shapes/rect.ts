class Rect {
  public _x: number;
  public _y: number;
  public _width: number;
  public _height: number;

  constructor(x: number, y: number, p_nWidth: number, p_nHeight: number) {
    this._x = x;
    this._y = y;
    this._width = p_nWidth;
    this._height = p_nHeight;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get minX(): number {
    return this._x;
  }

  get minY(): number {
    return this._y;
  }

  get maxX(): number {
    return this._x + this._width;
  }

  get maxY(): number {
    return this._y + this._height;
  }

  get centerX(): number {
    return this._x + this._width / 2;
  }

  get centerY(): number {
    return this._y + this._height / 2;
  }

  move(x: number, y: number): void {
    this._x += x;
    this._y += y;
  }

  copy(): Rect {
    return new Rect(this._x, this._y, this._width, this._height);
  }

  localRect(): Rect {
    return new Rect(0, 0, this.width, this.height);
  }

  contains(otherRect: Rect): boolean {
    return (
      this.minX < otherRect.minX &&
      this.maxX > otherRect.maxX &&
      this.minY < otherRect.minY &&
      this.maxY > otherRect.maxY
    );
  }

  expandToIncludeRect(otherRect: Rect): void {
    let maxX = this.maxX;
    let maxY = this.maxY;

    this._x = Math.min(this._x, otherRect.x);
    this._y = Math.min(this._y, otherRect.y);

    maxX = Math.max(maxX, otherRect.maxX);
    maxY = Math.max(maxY, otherRect.maxY);

    this._width = maxX - this._x;
    this._height = maxY - this._y;
  }

  containsXY(x: number, y: number): boolean {
    return this.minX <= x && x < this.maxX && this.minY <= y && y < this.maxY;
  }

  getConcentric(scale: number): Rect {
    const newX = this.x - ((scale - 1) * this.width) / 2;
    const newY = this.y - ((scale - 1) * this.height) / 2;
    return new Rect(newX, newY, this.width * scale, this.height * scale);
  }
}

export default Rect;
