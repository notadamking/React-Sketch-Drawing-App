import DrawingTool from "./DrawingTool";
import { Square, Point } from "../shapes";

class SquareTool implements DrawingTool {
  public numPoints: number = 2;
  public shouldRender: boolean = true;

  public create(points: Point[]): Square {
    const firstX = points[0].getX();
    const firstY = points[0].getY();
    const secondX = points[1].getX();
    const secondY = points[1].getY();

    let topLeft;

    if (firstX < secondX) {
      if (firstY < secondY) {
        topLeft = points[0];
      } else {
        topLeft = new Point({ x: firstX, y: secondY });
      }
    } else {
      if (firstY < secondY) {
        topLeft = new Point({ x: secondX, y: firstY });
      } else {
        topLeft = points[1];
      }
    }

    return new Square({
      topLeft,
      width: Math.abs(secondY - firstY)
    });
  }
}

export default SquareTool;
