import Shape2D from "./Shape2D";
import InvalidShapeError from "./InvalidShapeError";
import Point from "./Point";
import Line from "./Line";

interface ITriangleConstructor {
  type?: "Triangle";
  color?: string;
  xPointA: number;
  yPointA: number;
  xPointB: number;
  yPointB: number;
  xPointC: number;
  yPointC: number;
}

class Triangle extends Shape2D {
  public static create({
    color,
    xPointA,
    yPointA,
    xPointB,
    yPointB,
    xPointC,
    yPointC
  }: ITriangleConstructor) {
    const pointA = new Point({ x: xPointA, y: yPointA });
    const pointB = new Point({ x: xPointB, y: yPointB });
    const pointC = new Point({ x: xPointC, y: yPointC });

    return new Triangle({ pointA, pointB, pointC });
  }

  private pointA: Point;
  private pointB: Point;
  private pointC: Point;

  constructor({
    color,
    pointA,
    pointB,
    pointC
  }: {
    color?: string;
    pointA: Point;
    pointB: Point;
    pointC: Point;
  }) {
    super();

    this.pointA = pointA.clone();
    this.pointB = pointB.clone();
    this.pointC = pointC.clone();

    if (color) {
      this.color = color;
    }

    this.validate();
  }

  public toJSON(): ITriangleConstructor {
    return {
      type: "Triangle",
      color: this.color,
      xPointA: this.pointA.getX(),
      yPointA: this.pointA.getY(),
      xPointB: this.pointB.getX(),
      yPointB: this.pointB.getY(),
      xPointC: this.pointC.getX(),
      yPointC: this.pointC.getY()
    };
  }

  public validate() {
    const edgeA = new Line({ pointA: this.pointA, pointB: this.pointB });
    const edgeB = new Line({ pointA: this.pointA, pointB: this.pointC });
    const edgeC = new Line({ pointA: this.pointB, pointB: this.pointC });
    const lengthA = edgeA.computeLength();
    const lengthB = edgeB.computeLength();
    const lengthC = edgeC.computeLength();

    if (lengthA <= 0 || lengthB <= 0 || lengthC <= 0) {
      throw new InvalidShapeError(
        "A triangle cannot have an edge with non-positive length."
      );
    }

    if (
      lengthA > lengthB + lengthC ||
      lengthB > lengthA + lengthC ||
      lengthC > lengthA + lengthB
    ) {
      throw new InvalidShapeError(
        "A triangle cannot have an edge longer than the sum of its other two edges."
      );
    }

    if (
      (this.pointA.getX() === this.pointB.getX() &&
        this.pointA.getX() === this.pointC.getX()) ||
      (this.pointA.getY() === this.pointB.getY() &&
        this.pointA.getY() === this.pointC.getY())
    ) {
      throw new InvalidShapeError(
        "All three vertices of a triangle cannot be on the same line."
      );
    }
  }

  public getPointA(): Point {
    return this.pointA.clone();
  }

  public getPointB(): Point {
    return this.pointB.clone();
  }

  public getPointC(): Point {
    return this.pointC.clone();
  }

  public setPointA(pointA: Point) {
    this.pointA = pointA.clone();
  }

  public setPointB(pointB: Point) {
    this.pointB = pointB.clone();
  }

  public setPointC(pointC: Point) {
    this.pointC = pointC.clone();
  }

  public getPoints() {
    return [this.pointA, this.pointB, this.pointC];
  }

  public move(deltaX: number, deltaY: number): void {
    this.pointA.move(deltaX, deltaY);
    this.pointB.move(deltaX, deltaY);
    this.pointC.move(deltaX, deltaY);
  }

  public computeArea(): number {
    const base =
      (this.pointA.getX() - this.pointC.getX()) *
      (this.pointB.getY() - this.pointA.getY());
    const edges =
      (this.pointA.getX() - this.pointB.getX()) *
      (this.pointC.getY() - this.pointA.getY());

    return Math.abs(base - edges) / 2;
  }

  public draw(
    context: CanvasRenderingContext2D,
    options?: { opacity?: number }
  ): void {
    context.save();

    context.fillStyle = options
      ? this.getColorWithOpacity(options.opacity)
      : this.color;

    context.beginPath();
    context.moveTo(this.pointA.getX(), this.pointA.getY());
    context.lineTo(this.pointB.getX(), this.pointB.getY());
    context.lineTo(this.pointC.getX(), this.pointC.getY());
    context.closePath();
    context.fill();

    context.restore();
  }
}

export default Triangle;
