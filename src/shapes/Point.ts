import Shape from "./Shape";
import Validator from "./Validator";

interface IPointConstructor {
  type?: "Point";
  color?: string;
  x: number;
  y: number;
}

class Point extends Shape {
  public static create({ color, x, y }: IPointConstructor) {
    return new Point({ color, x, y });
  }

  private x: number;
  private y: number;

  constructor({ color, x, y }: IPointConstructor) {
    super();

    this.x = x;
    this.y = y;

    if (color) {
      this.color = color;
    }

    this.validate();
  }

  public clone(): Point {
    return new Point({ color: this.color, x: this.x, y: this.y });
  }

  public toJSON(): IPointConstructor {
    return {
      type: "Point",
      color: this.color,
      x: this.x,
      y: this.y
    };
  }

  public validate() {
    Validator.validateDouble(this.x);
    Validator.validateDouble(this.y);
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public setX(x: number) {
    Validator.validateDouble(x);

    this.x = x;
  }

  public setY(y: number) {
    Validator.validateDouble(y);

    this.y = y;
  }

  public getPoints() {
    return [this];
  }

  public isEqual(point: Point): boolean {
    return this.x === point.getX() && this.y === point.getY();
  }

  public moveX(deltaX: number) {
    Validator.validateDouble(deltaX);

    this.x += deltaX;
  }

  public moveY(deltaY: number) {
    Validator.validateDouble(deltaY);

    this.y += deltaY;
  }

  public move(deltaX: number, deltaY: number) {
    this.moveX(deltaX);
    this.moveY(deltaY);
  }

  public draw(
    context: CanvasRenderingContext2D,
    options?: { opacity?: number }
  ): void {
    context.fillStyle = options
      ? this.getColorWithOpacity(options.opacity)
      : this.color;

    context.fillRect(this.x, this.y, 1, 1);
  }
}

export default Point;
