import DrawingTool from "./DrawingTool";
import { Line, Point } from "../shapes";

class LineTool implements DrawingTool {
  public numPoints: number = 2;
  public shouldRender: boolean = true;

  public create(points: Point[]): Line {
    const pointA = points[0];
    const pointB = points[1];

    return new Line({ pointA, pointB });
  }
}

export default LineTool;
