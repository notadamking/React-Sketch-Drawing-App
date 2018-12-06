import DrawingCommand from "./DrawingCommand";
import DrawingState from "src/state/DrawingState";
import { Shape } from "src/shapes";

class MoveCommand extends DrawingCommand {
  private selectedShapes: Shape[];
  private deltaX: number;
  private deltaY: number;

  constructor({
    deltaX = 0,
    deltaY = 0
  }: {
    deltaX?: number;
    deltaY?: number;
  }) {
    super();

    this.deltaX = deltaX;
    this.deltaY = deltaY;
  }

  protected executeCommand = (state: DrawingState) => {
    this.selectedShapes = state.selectedShapes.slice();
    this.selectedShapes.forEach(shape => shape.move(this.deltaX, this.deltaY));
  };

  public undo = (state: DrawingState) => {
    super.undo(state);

    this.selectedShapes.forEach(shape =>
      shape.move(-this.deltaX, -this.deltaY)
    );
  };
}

export default MoveCommand;
