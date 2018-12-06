import { createCanvas } from "canvas";

import Triangle from "../Triangle";
import Point from "../Point";

test("ValidConstruction", () => {
  const pointA = new Point({ x: 1, y: 1 });
  const pointB = new Point({ x: 5, y: 1 });
  const pointC = new Point({ x: 3, y: 4 });

  const triangle1 = new Triangle({ pointA, pointB, pointC });
  expect(triangle1.getPointA().getX()).toEqual(pointA.getX());
  expect(triangle1.getPointA().getY()).toEqual(pointA.getY());
  expect(triangle1.getPointB().getX()).toEqual(pointB.getX());
  expect(triangle1.getPointB().getY()).toEqual(pointB.getY());
  expect(triangle1.getPointC().getX()).toEqual(pointC.getX());
  expect(triangle1.getPointC().getY()).toEqual(pointC.getY());

  const triangle4 = Triangle.create({
    xPointA: pointA.getX(),
    yPointA: pointA.getY(),
    xPointB: pointB.getX(),
    yPointB: pointB.getY(),
    xPointC: pointC.getX(),
    yPointC: pointC.getY()
  });
  expect(triangle4.getPointA().getX()).toEqual(pointA.getX());
  expect(triangle4.getPointA().getY()).toEqual(pointA.getY());
  expect(triangle4.getPointB().getX()).toEqual(pointB.getX());
  expect(triangle4.getPointB().getY()).toEqual(pointB.getY());
  expect(triangle4.getPointC().getX()).toEqual(pointC.getX());
  expect(triangle4.getPointC().getY()).toEqual(pointC.getY());
});

// tslint:disable:no-unused-expression no-empty
test("InvalidConstruction", () => {
  const pointA = new Point({ x: 1, y: 1 });
  const pointC = new Point({ x: 3, y: 4 });

  const badPointB = new Point({ x: 1, y: 3 });
  const badPointC = new Point({ x: 1, y: 9 });

  try {
    new Triangle({ pointA, pointB: badPointB, pointC: badPointC });
    fail("All three vertices of a triangle cannot be on the same line.");
  } catch (err) {}

  try {
    new Triangle({ pointA, pointB: pointA, pointC });
    fail("A triangle cannot have an edge with non-positive length.");
  } catch (err) {}
});

test("Getters", () => {
  const pointA = new Point({ x: 1, y: 1 });
  const pointB = new Point({ x: 5, y: 1 });
  const pointC = new Point({ x: 3, y: 4 });

  const triangle = new Triangle({ pointA, pointB, pointC });

  expect(triangle.getPointA().getX()).toEqual(pointA.getX());
  expect(triangle.getPointA().getY()).toEqual(pointA.getY());
  expect(triangle.getPointB().getX()).toEqual(pointB.getX());
  expect(triangle.getPointB().getY()).toEqual(pointB.getY());
  expect(triangle.getPointC().getX()).toEqual(pointC.getX());
  expect(triangle.getPointC().getY()).toEqual(pointC.getY());
});

test("ToJSON", () => {
  const pointA = new Point({ x: 1, y: 1 });
  const pointB = new Point({ x: 5, y: 1 });
  const pointC = new Point({ x: 3, y: 4 });

  const triangle = new Triangle({ pointA, pointB, pointC });

  expect(triangle.toJSON()).toEqual({
    type: "Triangle",
    xPointA: 1,
    yPointA: 1,
    xPointB: 5,
    yPointB: 1,
    xPointC: 3,
    yPointC: 4
  });
});

test("Move", () => {
  const pointA = new Point({ x: 1, y: 1 });
  const pointB = new Point({ x: 5, y: 1 });
  const pointC = new Point({ x: 3, y: 4 });

  const triangle = new Triangle({ pointA, pointB, pointC });

  triangle.move(3, 4);
  expect(triangle.getPointA().getX()).toEqual(4);
  expect(triangle.getPointA().getY()).toEqual(5);
  expect(triangle.getPointB().getX()).toEqual(8);
  expect(triangle.getPointB().getY()).toEqual(5);
  expect(triangle.getPointC().getX()).toEqual(6);
  expect(triangle.getPointC().getY()).toEqual(8);

  triangle.move(-0.4321, -0.7654);
  expect(triangle.getPointA().getX()).toEqual(4 - 0.4321);
  expect(triangle.getPointA().getY()).toEqual(5 - 0.7654);
  expect(triangle.getPointB().getX()).toEqual(8 - 0.4321);
  expect(triangle.getPointB().getY()).toEqual(5 - 0.7654);
  expect(triangle.getPointC().getX()).toEqual(6 - 0.4321);
  expect(triangle.getPointC().getY()).toEqual(8 - 0.7654);
});

test("ComputeArea", () => {
  const pointA = new Point({ x: 1, y: 1 });
  const pointB = new Point({ x: 5, y: 1 });
  const pointC = new Point({ x: 3, y: 4 });

  const triangle = new Triangle({ pointA, pointB, pointC });

  expect(triangle.computeArea()).toEqual(6);
});

test("Draw", () => {
  const pointA = new Point({ x: 1, y: 1 });
  const pointB = new Point({ x: 5, y: 1 });
  const pointC = new Point({ x: 3, y: 4 });

  const triangle = new Triangle({ pointA, pointB, pointC });

  const canvas = createCanvas(600, 600);
  const ctx = canvas.getContext("2d");

  try {
    triangle.draw(ctx);
  } catch (err) {
    fail(`Triangle.draw() threw an error: ${err}`);
  }
});

test("StrongEncapsulation", () => {
  const pointA = new Point({ x: 1, y: 1 });
  const pointB = new Point({ x: 5, y: 1 });
  const pointC = new Point({ x: 3, y: 4 });

  const triangle = new Triangle({ pointA, pointB, pointC });

  expect(pointA).not.toBe(triangle.getPointA());
  expect(pointB).not.toBe(triangle.getPointB());
  expect(pointC).not.toBe(triangle.getPointC());

  pointA.move(10, 20);
  expect(triangle.getPointA().getX()).toEqual(1);
  expect(triangle.getPointA().getY()).toEqual(1);
  expect(triangle.getPointB().getX()).toEqual(5);
  expect(triangle.getPointB().getY()).toEqual(1);
  expect(triangle.getPointC().getX()).toEqual(3);
  expect(triangle.getPointC().getY()).toEqual(4);
});
