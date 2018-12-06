import DrawingCommand from "./DrawingCommand";
import DrawingState from "src/state/DrawingState";
import { Shape } from "src/shapes";

class MoveCommand extends DrawingCommand {
  private selectedShapes: Shape[];
  private deltaX: number;
  private deltaY: number;

  constructor(
    state: DrawingState,
    {
      deltaX = 0,
      deltaY = 0
    }: {
      deltaX?: number;
      deltaY?: number;
    }
  ) {
    super();
    this.selectedShapes = state.selectedShapes.slice();
    this.deltaX = deltaX;
    this.deltaY = deltaY;
  }

  public execute = (state: DrawingState) => {
    this.selectedShapes.forEach(shape => shape.move(this.deltaX, this.deltaY));
  };

  public undo = (state: DrawingState) => {
    this.selectedShapes.forEach(shape =>
      shape.move(-this.deltaX, -this.deltaY)
    );
  };
}

export default MoveCommand;
