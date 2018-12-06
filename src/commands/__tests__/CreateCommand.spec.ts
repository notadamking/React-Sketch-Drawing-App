import DrawingState from "../../state/DrawingState";
import RectangleTool from "../../tools/RectangleTool";
import CreateCommand from "../CreateCommand";
import { Point, Rectangle } from "../../shapes";

it("Execute and undo work correctly", () => {
  const points = [new Point({ x: 50, y: 50 }), new Point({ x: 60, y: 60 })];

  const state = new DrawingState();
  const tool = new RectangleTool();
  const command = new CreateCommand(state, points);

  state.setActiveTool(tool);

  command.execute(state);

  expect(state.shapes.getChildren()).toHaveLength(1);

  const rectangle = state.shapes.getChildren()[0] as Rectangle;
  const topLeft = rectangle.getTopLeft();

  expect(topLeft.getX()).toEqual(50);
  expect(topLeft.getY()).toEqual(50);

  command.undo(state);

  expect(state.shapes.getChildren()).toHaveLength(0);
});
