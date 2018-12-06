import DrawingTool from "./DrawingTool";
import { Triangle, Point } from "../shapes";

class TriangleTool implements DrawingTool {
  public numPoints: number = 3;
  public shouldRender: boolean = true;

  public create(points: Point[]): Triangle {
    const pointA = points[0];
    const pointB = points[1];
    const pointC = points[2];

    return new Triangle({ pointA, pointB, pointC });
  }
}

export default TriangleTool;
