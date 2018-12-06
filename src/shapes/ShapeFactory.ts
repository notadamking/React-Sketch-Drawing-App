import Shape from "./Shape";
import CompositeShape from "./CompositeShape";
import Point from "./Point";
import Line from "./Line";
import Triangle from "./Triangle";
import Rectangle from "./Rectangle";
import Square from "./Square";
import Ellipse from "./Ellipse";
import Circle from "./Circle";
import EmbeddedPicture from "./EmbeddedPicture";
import InvalidShapeError from "./InvalidShapeError";

interface IShapeSpecification {
  type: string;
  [key: string]: string;
}

export default class ShapeFactory {
  private flyweights: { [key: string]: (spec: any) => Shape } = {
    Point: Point.create,
    Line: Line.create,
    Triangle: Triangle.create,
    Rectangle: Rectangle.create,
    Square: Square.create,
    Ellipse: Ellipse.create,
    Circle: Circle.create,
    CompositeShape: CompositeShape.create,
    EmbeddedPicture: EmbeddedPicture.create
  };

  public createFromStream(
    stream: NodeJS.ReadableStream,
    callback: (shape: Shape) => void
  ) {
    const chunks: Uint8Array[] = [];

    stream.on("data", chunk => chunks.push(chunk));

    stream.on("end", () => {
      const script = Buffer.concat(chunks).toString("utf8");
      callback(this.create(script));
    });
  }

  public create(
    script: string | IShapeSpecification,
    createFunction?: () => Shape
  ): Shape {
    let spec: IShapeSpecification;

    if (typeof script === "string") {
      spec = JSON.parse(script) as IShapeSpecification;
    } else {
      spec = script;
    }

    if (!spec.type) {
      throw new InvalidShapeError(
        "Invalid shape type. A shape definition must define a type of shape, followed by its specification."
      );
    }

    if (!this.flyweights[spec.type]) {
      if (createFunction === undefined) {
        throw new InvalidShapeError(
          `No flyweight exists or was passed in for the shape type: ${
            spec.type
          }`
        );
      } else {
        this.flyweights[spec.type] = createFunction;
      }
    }

    return this.flyweights[spec.type](spec);
  }
}
