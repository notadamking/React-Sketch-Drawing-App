import DrawingCommand from "./DrawingCommand";
import DrawingState from "src/state/DrawingState";
import { Shape } from "src/shapes";

class PasteCommand extends DrawingCommand {
  private pasteBuffer: Shape[];
  private selectedShapes: Shape[];

  constructor(state: DrawingState) {
    super();

    this.selectedShapes = state.selectedShapes.slice();
    this.pasteBuffer = state.pasteBuffer.slice();
    this.pasteBuffer.forEach(shape => shape.move(10, 10));
  }

  public execute = (state: DrawingState) => {
    this.pasteBuffer.forEach(shape => state.addShape(shape));
    state.setSelectedShapes(this.pasteBuffer);
  };

  public undo = (state: DrawingState) => {
    this.pasteBuffer.forEach(shape => state.removeShape(shape));
    state.setSelectedShapes(this.selectedShapes);
  };
}

export default PasteCommand;
