import DrawingState from "../../state/DrawingState";
import PasteCommand from "../PasteCommand";
import { Point, Square } from "../../shapes";

it("Execute and undo work correctly", () => {
  const topLeft = new Point({ x: 50, y: 50 });
  const width = 10;

  const state = new DrawingState();
  const command = new PasteCommand(state);
  const square = new Square({ topLeft, width });

  state.addShape(square);

  expect(state.shapes.getChildren()).toHaveLength(1);

  state.setSelectedShapes([square]);
  state.copySelectedToPasteBuffer();

  command.execute(state);

  expect(state.shapes.getChildren()).toHaveLength(2);

  const children = state.shapes.getChildren();

  for (const child of children) {
    expect(child instanceof Square).toBe(true);
  }

  command.undo(state);

  expect(state.shapes.getChildren()).toHaveLength(1);
});
