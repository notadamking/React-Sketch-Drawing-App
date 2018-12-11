import { Shape, Point } from "../shapes";
import DrawingState from "../state/DrawingState";

abstract class DrawingTool {
  public abstract numPoints: number;
  public abstract isSelectionTool: boolean;

  public abstract create(points: Point[], state?: DrawingState): Shape | null;
}

export default DrawingTool;
