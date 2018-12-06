import { Shape, Point } from "../shapes";
import DrawingState from "../state/DrawingState";

abstract class DrawingTool {
  public abstract numPoints: number;
  public abstract shouldRender: boolean;

  public abstract create(points: Point[], state?: DrawingState): Shape;
}

export default DrawingTool;
