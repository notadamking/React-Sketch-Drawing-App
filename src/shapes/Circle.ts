import Ellipse from "./Ellipse";
import Point from "./Point";

interface ICircleConstructorSingle {
  type?: "Circle";
  color?: string;
  centerX: number;
  centerY: number;
  radius: number;
}

class Circle extends Ellipse {
  public static create({
    color,
    centerX,
    centerY,
    radius
  }: ICircleConstructorSingle): Circle {
    const center = new Point({ x: centerX, y: centerY });

    return new Circle({ color, radius, center });
  }

  private radius: number;

  constructor({
    radius,
    center,
    color
  }: {
    color?: string;
    center: Point;
    radius: number;
  }) {
    super({
      color,
      center,
      radiusX: radius,
      radiusY: radius
    });

    this.radius = radius;
    this.validate();
  }

  public toJSON(): ICircleConstructorSingle {
    return {
      type: "Circle",
      color: this.color,
      centerX: this.center.getX(),
      centerY: this.center.getY(),
      radius: this.radius
    };
  }

  public getRadius(): number {
    return this.radius;
  }

  public setRadius(radius: number) {
    this.radius = radius;
    this.radiusX = radius;
    this.radiusY = radius;
    this.resetEdges();
  }

  public computeArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
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
      this.center.getX() - this.radius,
      this.center.getY() - this.radius
    );
    context.scale(this.radius, this.radius);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);

    context.fill();
    context.restore();
  }
}

export default Circle;
