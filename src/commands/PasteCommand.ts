import DrawingCommand from "./DrawingCommand";
import DrawingState from "src/state/DrawingState";
import { Shape } from "src/shapes";

class PasteCommand extends DrawingCommand {
  protected executeCommand = (state: DrawingState) => {
    const selectedShapes = [] as Shape[];

    state.pasteBuffer.forEach(shape => {
      shape.move(5, 5);

      state.addShape(shape);

      selectedShapes.push(shape);
    });

    state.setSelectedShapes(selectedShapes);
  };
}

export default PasteCommand;
