import DrawingTool from "./DrawingTool";
import { EmbeddedPicture, Point } from "../shapes";
import DrawingState from "../state/DrawingState";

class EmbeddedPictureTool implements DrawingTool {
  public numPoints: number = 2;
  public isSelectionTool: boolean = false;

  public create(points: Point[], state: DrawingState): EmbeddedPicture {
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

    return new EmbeddedPicture({
      topLeft,
      height: Math.abs(secondY - firstY),
      width: Math.abs(secondX - firstX),
      imageHeight: state.imageHeight,
      imageWidth: state.imageWidth,
      data: state.imageData!
    });
  }
}

export default EmbeddedPictureTool;
