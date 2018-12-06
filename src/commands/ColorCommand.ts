import DrawingCommand from "./DrawingCommand";
import DrawingState from "src/state/DrawingState";
import { Shape } from "src/shapes";

class ColorCommand extends DrawingCommand {
  private selectedShapes: { [color: string]: Shape[] };

  constructor(state: DrawingState) {
    super();
    this.selectedShapes = state.selectedShapes
      .slice()
      .reduce((shapes, shape) => {
        if (!shapes[shape.getColor()]) {
          shapes[shape.getColor()] = [shape];
        } else {
          shapes[shape.getColor()].push(shape);
        }

        return shapes;
      }, {});
  }

  public execute = (state: DrawingState) => {
    const colors = Object.keys(this.selectedShapes);
    colors.forEach(color => {
      const shapes = this.selectedShapes[color];
      shapes.forEach(shape => shape.setColor(state.color));
    });
  };

  public undo = (state: DrawingState) => {
    const colors = Object.keys(this.selectedShapes);
    colors.forEach(color => {
      const shapes = this.selectedShapes[color];
      shapes.forEach(shape => shape.setColor(color));
    });
  };
}

export default ColorCommand;
