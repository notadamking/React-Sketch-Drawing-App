import DrawingCommand from "./DrawingCommand";
import DrawingState from "src/state/DrawingState";
import Shape from "src/shapes/Shape";

class DeleteCommand extends DrawingCommand {
  private selectedShapes: Shape[];

  constructor(state: DrawingState) {
    super();
    this.selectedShapes = state.selectedShapes.slice();
  }

  public execute = (state: DrawingState) => {
    this.selectedShapes.forEach(shape => state.removeShape(shape));
  };

  public undo = (state: DrawingState) => {
    this.selectedShapes.forEach(shape => state.addShape(shape));
  };
}

export default DeleteCommand;
