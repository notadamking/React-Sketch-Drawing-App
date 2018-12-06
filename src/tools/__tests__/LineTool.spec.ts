import Point from "../../shapes/Point";
import LineTool from "../LineTool";

it("Creates valid shape", () => {
  const tool = new LineTool();
  const points = [new Point({ x: 50, y: 50 }), new Point({ x: 60, y: 60 })];

  const shape = tool.create(points);

  const pointA = shape.getPointA();

  expect(pointA.getX()).toEqual(50);
  expect(pointA.getY()).toEqual(50);
});
