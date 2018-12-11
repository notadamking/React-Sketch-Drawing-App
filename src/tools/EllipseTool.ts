import DrawingTool from "./DrawingTool";
import { Ellipse, Point } from "../shapes";

class EllipseTool implements DrawingTool {
  public numPoints: number = 2;
  public isSelectionTool: boolean = false;

  public create(points: Point[]): Ellipse {
    const center = points[0];
    const edge = points[1];

    return new Ellipse({
      center,
      radiusX: Math.abs(center.getX() - edge.getX()),
      radiusY: Math.abs(center.getY() - edge.getY())
    });
  }
}

export default EllipseTool;
