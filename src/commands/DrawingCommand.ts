import DrawingState from "src/state/DrawingState";
import { Shape } from "src/shapes";

abstract class DrawingCommand {
  private prevShapes: Shape[];

  protected abstract executeCommand: (state: DrawingState) => void;

  public execute(state: DrawingState) {
    this.prevShapes = state.shapes.getChildren();

    this.executeCommand(state);
  }

  public undo(state: DrawingState) {
    state.shapes.setChildren(this.prevShapes);
  }
}

export default DrawingCommand;
