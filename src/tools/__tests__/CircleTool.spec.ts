import Point from "../../shapes/Point";
import CircleTool from "../CircleTool";

it("Creates valid shape", () => {
  const tool = new CircleTool();
  const points = [new Point({ x: 50, y: 50 }), new Point({ x: 60, y: 60 })];

  const shape = tool.create(points);

  const center = shape.getCenter();

  expect(center.getX()).toEqual(50);
  expect(center.getY()).toEqual(50);
});
