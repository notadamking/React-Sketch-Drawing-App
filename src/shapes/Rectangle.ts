import Shape2D from "./Shape2D";
import Point from "./Point";
import Validator from "./Validator";
import Line from "./Line";

interface IRectangleConstructorDouble {
  type?: "Rectangle";
  color?: string;
  topLeftX: number;
  topLeftY: number;
  width: number;
  height: number;
  isOutline?: boolean;
}

interface IRectangleConstructorSingle {
  type?: "Rectangle" | "Square" | "EmbeddedPicture";
  color?: string;
  topLeftX: number;
  topLeftY: number;
  width: number;
  isOutline?: boolean;
}

class Rectangle extends Shape2D {
  public static create(
    spec: IRectangleConstructorDouble | IRectangleConstructorSingle
  ) {
    const topLeft = new Point({ x: spec.topLeftX, y: spec.topLeftY });
    let height;

    if ("height" in spec) {
      height = spec.height;
    } else {
      height = spec.width;
    }

    return new Rectangle({
      color: spec.color,
      topLeft,
      height,
      width: spec.width
    });
  }

  protected topLeft: Point;
  protected topRight?: Point;
  protected bottomLeft?: Point;
  protected bottomRight?: Point;
  protected height: number;
  protected width: number;
  protected isOutline: boolean;

  constructor({
    color,
    topLeft,
    height,
    width,
    isOutline = false
  }: {
    color?: string;
    topLeft: Point;
    width: number;
    height: number;
    isOutline?: boolean;
  }) {
    super();

    this.width = width;
    this.height = height;
    this.topLeft = topLeft.clone();
    this.isOutline = isOutline;

    if (color) {
      this.color = color;
    }

    this.validate();
  }

  public toJSON(): IRectangleConstructorDouble | IRectangleConstructorSingle {
    return {
      type: "Rectangle",
      color: this.color,
      topLeftX: this.topLeft.getX(),
      topLeftY: this.topLeft.getY(),
      height: this.height,
      width: this.width
    };
  }

  public validate() {
    const edgeA = new Line({
      pointA: this.getTopLeft(),
      pointB: this.getTopRight()
    });
    const edgeB = new Line({
      pointA: this.getTopRight(),
      pointB: this.getBottomRight()
    });
    const edgeC = new Line({
      pointA: this.getBottomLeft(),
      pointB: this.getBottomRight()
    });
    const edgeD = new Line({
      pointA: this.getTopLeft(),
      pointB: this.getBottomLeft()
    });

    Validator.validatePositiveDouble(
      edgeA.computeLength(),
      "Rectangle cannot have an edge with non-positive or infinite length."
    );

    Validator.validatePositiveDouble(
      edgeB.computeLength(),
      "Rectangle cannot have an edge with non-positive or infinite length."
    );

    Validator.validatePositiveDouble(
      edgeC.computeLength(),
      "Rectangle cannot have an edge with non-positive or infinite length."
    );

    Validator.validatePositiveDouble(
      edgeD.computeLength(),
      "Rectangle cannot have an edge with non-positive or infinite length."
    );

    Validator.validatePositiveDouble(
      this.width,
      "Rectangle cannot have non-positive or infinite width."
    );
    Validator.validatePositiveDouble(
      this.height,
      "Rectangle cannot have non-positive or infinite height."
    );
  }

  public getTopLeft(): Point {
    return this.topLeft;
  }

  public getTopRight(): Point {
    if (!this.topRight) {
      this.topRight = new Point({
        x: this.topLeft.getX() + this.width,
        y: this.topLeft.getY()
      });
    }
    return this.topRight;
  }

  public getBottomLeft(): Point {
    if (!this.bottomLeft) {
      this.bottomLeft = new Point({
        x: this.topLeft.getX(),
        y: this.topLeft.getY() + this.height
      });
    }
    return this.bottomLeft;
  }

  public getBottomRight(): Point {
    if (!this.bottomRight) {
      this.bottomRight = new Point({
        x: this.topLeft.getX() + this.width,
        y: this.topLeft.getY() + this.height
      });
    }
    return this.bottomRight;
  }

  public getHeight(): number {
    return this.height;
  }

  public getWidth(): number {
    return this.width;
  }

  public setTopLeft(topLeft: Point) {
    this.topLeft = topLeft.clone();
    this.topRight = undefined;
    this.bottomLeft = undefined;
    this.bottomRight = undefined;
  }

  public setHeight(height: number) {
    this.height = height;
  }

  public setWidth(width: number) {
    this.width = width;
  }

  public contains(point: Point): boolean {
    return (
      this.topLeft.getX() <= point.getX() &&
      point.getX() <= this.topLeft.getX() + this.width &&
      this.topLeft.getY() <= point.getY() &&
      point.getY() <= this.topLeft.getY() + this.height
    );
  }

  public getPoints(): Point[] {
    return [
      this.getTopLeft(),
      this.getTopRight(),
      this.getBottomLeft(),
      this.getBottomRight()
    ];
  }

  public move(deltaX: number, deltaY: number) {
    this.topLeft.move(deltaX, deltaY);
    this.topRight = undefined;
    this.bottomLeft = undefined;
    this.bottomRight = undefined;
  }

  public computeArea(): number {
    return this.width * this.height;
  }

  public draw(
    context: CanvasRenderingContext2D,
    options?: { opacity?: number }
  ): void {
    context.save();

    context.fillStyle = options
      ? this.getColorWithOpacity(options.opacity)
      : this.color;

    context.strokeStyle = "black";

    if (this.isOutline) {
      context.setLineDash([10, 3]);
      context.strokeRect(
        this.topLeft.getX(),
        this.topLeft.getY(),
        this.width,
        this.height
      );
    } else {
      context.fillRect(
        this.topLeft.getX(),
        this.topLeft.getY(),
        this.width,
        this.height
      );
    }

    context.restore();
  }
}

export default Rectangle;
