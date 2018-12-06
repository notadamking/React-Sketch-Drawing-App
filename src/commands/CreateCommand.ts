import DrawingCommand from "./DrawingCommand";
import DrawingState from "src/state/DrawingState";
import { Shape, Point } from "src/shapes";

class CreateCommand extends DrawingCommand {
  private createdShape: Shape;

  constructor(state: DrawingState, selectedPoints: Point[]) {
    super();
    this.createdShape = state.activeTool!.create(selectedPoints, state);
    this.createdShape.setColor(state.color);
  }

  public execute = (state: DrawingState) => {
    state.addShape(this.createdShape);
  };

  public undo = (state: DrawingState) => {
    state.removeShape(this.createdShape);
  };
}

export default CreateCommand;
