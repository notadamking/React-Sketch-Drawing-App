import Ellipse from "./Ellipse";
import Point from "./Point";

interface ICircleConstructorSingle {
  type?: "Circle";
  centerX: number;
  centerY: number;
  radius: number;
}

class Circle extends Ellipse {
  public static create({
    centerX,
    centerY,
    radius
  }: ICircleConstructorSingle): Circle {
    const center = new Point({ x: centerX, y: centerY });

    return new Circle({ radius, center });
  }

  private radius: number;

  constructor({ radius, center }: { center: Point; radius: number }) {
    super({
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

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.beginPath();

    context.translate(
      this.center.getX() - this.radius,
      this.center.getY() - this.radius
    );
    context.scale(this.radius, this.radius);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);

    context.restore();
    context.fill();
  }
}

export default Circle;
