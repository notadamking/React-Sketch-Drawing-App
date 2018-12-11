import DrawingTool from "./DrawingTool";
import { Rectangle, Point } from "../shapes";

class RectangleTool implements DrawingTool {
  public numPoints: number = 2;
  public isSelectionTool: boolean = false;

  public create(points: Point[]): Rectangle {
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

    return new Rectangle({
      topLeft,
      height: Math.abs(secondY - firstY),
      width: Math.abs(secondX - firstX)
    });
  }
}

export default RectangleTool;
