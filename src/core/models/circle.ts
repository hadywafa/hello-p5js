import p5 from "p5";

export class Circle {
  constructor(public x: number, public y: number) {}

  show(p: p5): void {
    p.fill(255);
    p.noStroke();
    p.ellipse(this.x, this.y, 15, 15);
  }

  static create(count: number, p: p5): Circle[] {
    return Array.from({ length: count }, () => {
      const x = p.random(-500, p.windowWidth + 500);
      const y = p.random(-500, p.windowHeight + 500);
      return new Circle(x, y);
    });
  }
}
