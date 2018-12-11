import DrawingTool from "./DrawingTool";
import { Circle, Point } from "../shapes";

class CircleTool implements DrawingTool {
  public numPoints: number = 2;
  public isSelectionTool: boolean = false;

  public create(points: Point[]): Circle {
    const center = points[0];
    const edge = points[1];

    return new Circle({
      center,
      radius: Math.sqrt(
        Math.pow(edge.getX() - center.getX(), 2) +
          Math.pow(edge.getY() - center.getY(), 2)
      )
    });
  }
}

export default CircleTool;
