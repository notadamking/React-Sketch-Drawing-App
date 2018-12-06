import DrawingCommand from "./DrawingCommand";
import DrawingState from "src/state/DrawingState";

class DeleteCommand extends DrawingCommand {
  protected executeCommand = (state: DrawingState) => {
    state.selectedShapes.forEach(shape => state.removeShape(shape));
  };
}

export default DeleteCommand;
