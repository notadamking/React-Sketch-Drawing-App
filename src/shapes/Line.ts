import Shape from "./Shape";
import Point from "./Point";
import Validator from "./Validator";

interface ILineConstructor {
  type?: "Line";
  xPointA: number;
  yPointA: number;
  xPointB: number;
  yPointB: number;
}

class Line extends Shape {
  public static create({
    xPointA,
    yPointA,
    xPointB,
    yPointB
  }: ILineConstructor) {
    const pointA = new Point({ x: xPointA, y: yPointA });
    const pointB = new Point({ x: xPointB, y: yPointB });

    return new Line({ pointA, pointB });
  }

  private pointA: Point;
  private pointB: Point;

  constructor({ pointA, pointB }: { pointA: Point; pointB: Point }) {
    super();

    this.pointA = pointA.clone();
    this.pointB = pointB.clone();

    this.validate();
  }

  public toJSON(): ILineConstructor {
    return {
      type: "Line",
      xPointA: this.pointA.getX(),
      yPointA: this.pointA.getY(),
      xPointB: this.pointB.getX(),
      yPointB: this.pointB.getY()
    };
  }

  public validate() {
    Validator.validatePositiveDouble(
      this.computeLength(),
      "Line cannot have non-positive or infinite length."
    );
  }

  public getPointA(): Point {
    return this.pointA.clone();
  }

  public getPointB(): Point {
    return this.pointB.clone();
  }

  public setPointA(pointA: Point) {
    this.pointA = pointA.clone();
  }

  public setPointB(pointB: Point) {
    this.pointB = pointB.clone();
  }

  public getPoints() {
    return [this.pointA, this.pointB];
  }

  public move(deltaX: number, deltaY: number) {
    this.pointA.move(deltaX, deltaY);
    this.pointB.move(deltaX, deltaY);
  }

  public computeLength(): number {
    const distA = Math.pow(this.pointB.getX() - this.pointA.getX(), 2);
    const distB = Math.pow(this.pointB.getY() - this.pointA.getY(), 2);

    return Math.sqrt(distA + distB);
  }

  public computeSlope(): number {
    const rise = this.pointB.getY() - this.pointA.getY();
    const run = this.pointB.getX() - this.pointA.getX();
    return rise / run;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();

    context.strokeStyle = context.fillStyle;

    context.beginPath();
    context.moveTo(this.pointA.getX(), this.pointA.getY());
    context.lineTo(this.pointB.getX(), this.pointB.getY());
    context.stroke();

    context.restore();
  }
}

export default Line;
