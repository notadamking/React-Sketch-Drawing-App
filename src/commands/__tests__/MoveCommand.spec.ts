import DrawingState from "../../state/DrawingState";
import MoveCommand from "../MoveCommand";
import { Point, Square } from "../../shapes";

it("Execute and undo work correctly", () => {
  const topLeft = new Point({ x: 50, y: 50 });
  const width = 10;

  const state = new DrawingState();
  const command = new MoveCommand(state, { deltaX: 10, deltaY: 10 });
  const square = new Square({ topLeft, width });

  state.addShape(square);

  expect(state.shapes.getChildren()).toHaveLength(1);

  state.setSelectedShapes([square]);

  command.execute(state);

  const newTopLeft = square.getTopLeft();

  expect(newTopLeft.getX()).toEqual(60);
  expect(newTopLeft.getY()).toEqual(60);

  command.undo(state);

  expect(state.shapes.getChildren()).toHaveLength(1);

  const lastTopLeft = square.getTopLeft();

  expect(lastTopLeft.getX()).toEqual(50);
  expect(lastTopLeft.getY()).toEqual(50);
});
