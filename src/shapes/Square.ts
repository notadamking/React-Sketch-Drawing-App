import Rectangle from "./Rectangle";
import Point from "./Point";

interface ISquareConstructor {
  type?: "Square";
  topLeftX: number;
  topLeftY: number;
  width: number;
}

class Square extends Rectangle {
  public static create({ topLeftX, topLeftY, width }: ISquareConstructor) {
    const topLeft = new Point({ x: topLeftX, y: topLeftY });
    return new Square({ topLeft, width });
  }

  constructor(square: { topLeft: Point; width: number }) {
    super({ ...square, height: square.width });
  }

  public toJSON(): ISquareConstructor {
    return {
      type: "Square",
      topLeftX: this.topLeft.getX(),
      topLeftY: this.topLeft.getY(),
      width: this.width
    };
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.fillRect(
      this.topLeft.getX(),
      this.topLeft.getY(),
      this.width,
      this.width
    );
  }
}

export default Square;
