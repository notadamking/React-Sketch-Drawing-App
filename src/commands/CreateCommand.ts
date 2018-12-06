import DrawingCommand from "./DrawingCommand";
import DrawingState from "src/state/DrawingState";
import { Shape, Point } from "src/shapes";

class CreateCommand extends DrawingCommand {
  private selectedPoints: Point[];

  constructor(selectedPoints: Point[]) {
    super();
    this.selectedPoints = selectedPoints;
  }

  protected executeCommand = (state: DrawingState) => {
    const newShape: Shape = state.activeTool!.create(
      this.selectedPoints,
      state
    );

    newShape.setColor(state.color);

    state.addShape(newShape);
  };
}

export default CreateCommand;
