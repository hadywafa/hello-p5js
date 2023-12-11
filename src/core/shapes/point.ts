// class Point {
//   private _x: number;
//   private _y: number;
//   public isBeingDragged: boolean;

//   constructor(x: number, y: number) {
//     this._x = x;
//     this._y = y;
//     this.isBeingDragged = false;
//   }

//   get x(): number {
//     return this._x;
//   }

//   get y(): number {
//     return this._y;
//   }

//   setXY(x: number, y: number): void {
//     this._x = x;
//     this._y = y;
//   }
//   setX(x: number): void {
//     this._x = x;
//   }
//   setY(y: number): void {
//     this._y = y;
//   }
//   containsXY(x: number, y: number): boolean {
//     const radius = 8; // Adjust the radius as needed
//     const distanceSquared = Math.pow(x - this._x, 2) + Math.pow(y - this._y, 2);
//     return distanceSquared <= Math.pow(radius, 2);
//   }
// }
// export default Point;
