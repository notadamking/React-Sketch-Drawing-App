import Rectangle from "./Rectangle";
import Point from "./Point";

interface ISquareConstructor {
  type?: "Square";
  color?: string;
  topLeftX: number;
  topLeftY: number;
  width: number;
}

class Square extends Rectangle {
  public static create({
    color,
    topLeftX,
    topLeftY,
    width
  }: ISquareConstructor) {
    const topLeft = new Point({ x: topLeftX, y: topLeftY });
    return new Square({ color, topLeft, width });
  }

  constructor(square: { color?: string; topLeft: Point; width: number }) {
    super({ ...square, height: square.width });
  }

  public toJSON(): ISquareConstructor {
    return {
      type: "Square",
      color: this.color,
      topLeftX: this.topLeft.getX(),
      topLeftY: this.topLeft.getY(),
      width: this.width
    };
  }

  public draw(
    context: CanvasRenderingContext2D,
    options?: { opacity?: number }
  ): void {
    context.fillStyle = options
      ? this.getColorWithOpacity(options.opacity)
      : this.color;

    context.fillRect(
      this.topLeft.getX(),
      this.topLeft.getY(),
      this.width,
      this.width
    );
  }
}

export default Square;
