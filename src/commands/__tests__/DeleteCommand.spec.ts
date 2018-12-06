import DrawingState from "../../state/DrawingState";
import DeleteCommand from "../DeleteCommand";
import { Point, Square } from "../../shapes";

it("Execute and undo work correctly", () => {
  const topLeft = new Point({ x: 50, y: 50 });
  const width = 10;

  const state = new DrawingState();
  const command = new DeleteCommand();
  const square = new Square({ topLeft, width });

  state.addShape(square);

  expect(state.shapes.getChildren()).toHaveLength(1);

  state.setSelectedShapes([square]);

  command.execute(state);

  expect(state.shapes.getChildren()).toHaveLength(0);

  command.undo(state);

  expect(state.shapes.getChildren()).toHaveLength(1);
});
