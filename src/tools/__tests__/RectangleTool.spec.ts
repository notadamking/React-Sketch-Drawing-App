import Point from "../../shapes/Point";
import RectangleTool from "../RectangleTool";

it("Creates valid shape", () => {
  const tool = new RectangleTool();
  const points = [new Point({ x: 50, y: 50 }), new Point({ x: 60, y: 60 })];

  const shape = tool.create(points);

  const topLeft = shape.getTopLeft();

  expect(topLeft.getX()).toEqual(50);
  expect(topLeft.getY()).toEqual(50);
});
