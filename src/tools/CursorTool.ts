import DrawingTool from "./DrawingTool";
import { Point } from "../shapes";

class CursorTool implements DrawingTool {
  public numPoints: number = 1;
  public isSelectionTool: boolean = true;

  public create(points?: Point[]) {
    return null;
  }
}

export default CursorTool;
