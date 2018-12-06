import Point from "../../shapes/Point";
import SquareTool from "../SquareTool";

it("Creates valid shape", () => {
  const tool = new SquareTool();
  const points = [new Point({ x: 50, y: 50 }), new Point({ x: 60, y: 60 })];

  const shape = tool.create(points);

  const topLeft = shape.getTopLeft();

  expect(topLeft.getX()).toEqual(50);
  expect(topLeft.getY()).toEqual(50);
});
