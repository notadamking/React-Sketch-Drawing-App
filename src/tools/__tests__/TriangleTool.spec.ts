import Point from "../../shapes/Point";
import TriangleTool from "../TriangleTool";

it("Creates valid shape", () => {
  const tool = new TriangleTool();
  const points = [
    new Point({ x: 50, y: 50 }),
    new Point({ x: 60, y: 60 }),
    new Point({ x: 70, y: 70 })
  ];

  const shape = tool.create(points);

  const pointA = shape.getPointA();
  const pointB = shape.getPointB();
  const pointC = shape.getPointC();

  expect(pointA.getX()).toEqual(50);
  expect(pointA.getY()).toEqual(50);
  expect(pointB.getX()).toEqual(60);
  expect(pointB.getY()).toEqual(60);
  expect(pointC.getX()).toEqual(70);
  expect(pointC.getY()).toEqual(70);
});
