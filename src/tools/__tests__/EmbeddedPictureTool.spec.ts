import Point from "../../shapes/Point";
import DrawingState from "../../state/DrawingState";
import EmbeddedPictureTool from "../EmbeddedPictureTool";

it("Creates valid shape", () => {
  const state = new DrawingState();
  const tool = new EmbeddedPictureTool();
  const points = [new Point({ x: 50, y: 50 }), new Point({ x: 60, y: 60 })];

  const shape = tool.create(points, state);

  const topLeft = shape.getTopLeft();

  expect(topLeft.getX()).toEqual(50);
  expect(topLeft.getY()).toEqual(50);
});
