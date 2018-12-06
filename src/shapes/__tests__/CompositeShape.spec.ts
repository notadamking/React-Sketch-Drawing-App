import { createCanvas } from "canvas";

import CompositeShape from "../CompositeShape";
import Triangle from "../Triangle";
import Square from "../Square";
import Point from "../Point";

test("ValidConstruction", () => {
  const shape = new CompositeShape();
  const point = new Point({ x: 1, y: 1 });

  shape.addShape(point);

  expect(shape.getChildren()).toEqual([point]);
});

// tslint:disable:no-unused-expression no-empty
test("InvalidConstruction", () => {
  const shape = new CompositeShape();
  const shape2 = new CompositeShape();
  const shape3 = new CompositeShape();

  shape.addShape(shape2);
  shape.addShape(shape3);

  try {
    shape.addShape(shape);

    fail("A CompositeShape cannot contain itself.");
  } catch (err) {}

  try {
    shape2.addShape(shape);

    fail("A CompositeShape cannot contain itself indirectly.");
  } catch (err) {}
});

test("Getters", () => {
  const shape = new CompositeShape();
  const point = new Point({ x: 1, y: 1 });

  shape.addShape(point);

  expect(point.getParent()).toEqual(shape);
  expect(shape.getChildren()).toEqual([point]);
});

test("ToJSON", () => {
  const shape = new CompositeShape();
  const point = new Point({ x: 1, y: 1 });

  shape.addShape(point);

  expect(shape.toJSON()).toEqual({
    type: "CompositeShape",
    children: [{ type: "Point", x: 1, y: 1 }]
  });
});

test("Move", () => {
  const shape = new CompositeShape();
  const point = new Point({ x: 1, y: 1 });

  shape.addShape(point);
  shape.move(5, 5);

  expect(point.getX()).toEqual(6);
  expect(point.getY()).toEqual(6);
});

test("ComputeArea", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const pointA = new Point({ x: 1, y: 1 });
  const pointB = new Point({ x: 5, y: 1 });
  const pointC = new Point({ x: 3, y: 4 });
  const width = 10;

  const shape = new CompositeShape();
  const square = new Square({ topLeft, width });
  const triangle = new Triangle({ pointA, pointB, pointC });

  shape.addShape(square);
  shape.addShape(triangle);

  expect(shape.computeArea()).toEqual(
    square.computeArea() + triangle.computeArea()
  );
});

test("Draw", () => {
  const shape = new CompositeShape();
  const point = new Point({ x: 1, y: 1 });
  const topLeft = new Point({ x: 1, y: 2 });
  const pointA = new Point({ x: 1, y: 1 });
  const pointB = new Point({ x: 5, y: 1 });
  const pointC = new Point({ x: 3, y: 4 });
  const square = new Square({ topLeft, width: 10 });
  const triangle = new Triangle({ pointA, pointB, pointC });

  shape.addShape(point);
  shape.addShape(square);
  shape.addShape(triangle);

  const canvas = createCanvas(600, 600);
  const ctx = canvas.getContext("2d");

  try {
    shape.draw(ctx);
  } catch (err) {
    fail(`CompositeShape.draw() threw an error: ${err}`);
  }
});
