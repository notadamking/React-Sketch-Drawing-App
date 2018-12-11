import DrawingState from "../../state/DrawingState";
import ColorCommand from "../ColorCommand";
import { Point, Square } from "../../shapes";

it("Execute and undo work correctly", () => {
  const topLeft = new Point({ x: 50, y: 50 });
  const width = 10;

  const state = new DrawingState();
  const square = new Square({ topLeft, width, color: "black" });

  state.addShape(square);

  expect(state.shapes.getChildren()[0].getColor()).toBe("black");

  state.setSelectedShapes([square]);
  state.setColor("red");

  const command = new ColorCommand(state);

  command.execute(state);

  expect(state.shapes.getChildren()[0].getColor()).toBe("red");

  command.undo(state);

  expect(state.shapes.getChildren()[0].getColor()).toBe("black");
});
