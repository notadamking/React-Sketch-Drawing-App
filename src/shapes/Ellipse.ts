import Shape2D from "./Shape2D";
import Point from "./Point";
import Validator from "./Validator";

interface IEllipseConstructorDouble {
  type?: "Ellipse";
  color?: string;
  centerX: number;
  centerY: number;
  radiusY: number;
  radiusX: number;
}

interface IEllipseConstructorSingle {
  type?: "Ellipse" | "Circle";
  color?: string;
  centerX: number;
  centerY: number;
  radius: number;
}

class Ellipse extends Shape2D {
  public static create(
    spec: IEllipseConstructorDouble | IEllipseConstructorSingle
  ) {
    const center = new Point({
      x: spec.centerX,
      y: spec.centerY
    });
    let radiusX;
    let radiusY;

    if ("radiusX" in spec) {
      radiusX = spec.radiusX;
    } else {
      radiusX = spec.radius;
    }

    if ("radiusY" in spec) {
      radiusY = spec.radiusY;
    } else {
      radiusY = spec.radius;
    }

    return new Ellipse({ color: spec.color, center, radiusX, radiusY });
  }

  protected center: Point;
  protected topEdge: Point;
  protected bottomEdge: Point;
  protected rightEdge: Point;
  protected leftEdge: Point;
  protected radiusX: number;
  protected radiusY: number;

  constructor({
    color,
    center,
    radiusX,
    radiusY
  }: {
    color?: string;
    center: Point;
    radiusY: number;
    radiusX: number;
  }) {
    super();

    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.center = center.clone();

    if (color) {
      this.color = color;
    }

    this.resetEdges();

    this.validate();
  }

  public toJSON(): IEllipseConstructorDouble | IEllipseConstructorSingle {
    return {
      type: "Ellipse",
      color: this.color,
      centerX: this.center.getX(),
      centerY: this.center.getY(),
      radiusX: this.radiusX,
      radiusY: this.radiusY
    };
  }

  public validate() {
    Validator.validatePositiveDouble(
      this.radiusY,
      "An ellipse cannot have a radiusY with non-positive or infinite length."
    );
    Validator.validatePositiveDouble(
      this.radiusX,
      "An ellipse cannot have a radiusX with non-positive or infinite length."
    );
  }

  public getCenter(): Point {
    return this.center.clone();
  }

  public getRadiusX(): number {
    return this.radiusX;
  }

  public getRadiusY(): number {
    return this.radiusY;
  }

  public setCenter(center: Point) {
    this.center = center.clone();
    this.resetEdges();
  }

  public setRadiusX(radiusX: number) {
    this.radiusX = radiusX;
    this.resetEdges();
  }

  public setRadiusY(radiusY: number) {
    this.radiusY = radiusY;
    this.resetEdges();
  }

  public scale(scaleFactor: number) {
    this.setRadiusX(this.radiusX * scaleFactor);
    this.setRadiusY(this.radiusY * scaleFactor);
  }

  protected resetEdges() {
    this.topEdge = new Point({
      x: this.center.getX(),
      y: this.center.getY() - this.radiusY
    });
    this.bottomEdge = new Point({
      x: this.center.getX(),
      y: this.center.getY() + this.radiusY
    });
    this.rightEdge = new Point({
      x: this.center.getX() + this.radiusX,
      y: this.center.getY()
    });
    this.leftEdge = new Point({
      x: this.center.getX() - this.radiusX,
      y: this.center.getY()
    });
  }

  public getPoints(): Point[] {
    return [
      this.center,
      this.topEdge,
      this.bottomEdge,
      this.rightEdge,
      this.leftEdge
    ];
  }

  public contains(point: Point) {
    const x = point.getX();
    const y = point.getY();
    const h = this.center.getX();
    const k = this.center.getY();

    return (
      Math.pow(x - h, 2) / Math.pow(this.radiusX, 2) +
        Math.pow(y - k, 2) / Math.pow(this.radiusY, 2) <
      1
    );
  }

  public move(deltaX: number, deltaY: number) {
    this.center.move(deltaX, deltaY);
    this.resetEdges();
  }

  public computeArea(): number {
    return Math.PI * this.radiusY * this.radiusX;
  }

  public draw(
    context: CanvasRenderingContext2D,
    options?: { opacity?: number }
  ): void {
    context.save();
    context.beginPath();

    context.fillStyle = options
      ? this.getColorWithOpacity(options.opacity)
      : this.color;

    context.translate(
      this.center.getX() - this.radiusX,
      this.center.getY() - this.radiusY
    );
    context.scale(this.radiusX, this.radiusY);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);

    context.fill();
    context.restore();
  }
}

export default Ellipse;
