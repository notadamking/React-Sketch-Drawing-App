import { createCanvas } from "canvas";

import Square from "../Square";
import Point from "../Point";

test("ValidConstruction", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;

  const rect1 = new Square({ topLeft, width });
  expect(rect1.getTopLeft().getX()).toEqual(topLeft.getX());
  expect(rect1.getTopLeft().getY()).toEqual(topLeft.getY());
  expect(rect1.getWidth()).toEqual(width);
  expect(rect1.getHeight()).toEqual(width);

  const rect4 = Square.create({
    topLeftX: topLeft.getX(),
    topLeftY: topLeft.getY(),
    width
  });
  expect(rect4.getTopLeft().getX()).toEqual(topLeft.getX());
  expect(rect4.getTopLeft().getY()).toEqual(topLeft.getY());
  expect(rect4.getWidth()).toEqual(width);
  expect(rect4.getHeight()).toEqual(width);
});

// tslint:disable:no-unused-expression no-empty
test("InvalidConstruction", () => {
  const topLeft = new Point({ x: 1, y: 2 });

  try {
    new Square({ topLeft, width: Infinity });
    fail("Square cannot have an edge with non-positive or infinite length");
  } catch (err) {}

  try {
    new Square({ topLeft, width: -Infinity });
    fail("Square cannot have an edge with non-positive or infinite length");
  } catch (err) {}

  try {
    new Square({ topLeft, width: NaN });
    fail("Square cannot have an edge with non-positive or infinite length");
  } catch (err) {}

  try {
    new Square({ topLeft, width: 0 });
    fail("Square cannot have an edge with non-positive or infinite length");
  } catch (err) {}

  try {
    new Square({ topLeft, width: -5 });
    fail("Square cannot have an edge with non-positive or infinite length");
  } catch (err) {}
});

test("Getters", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;

  const rect = new Square({ topLeft, width });

  expect(rect.getWidth()).toEqual(width);
  expect(rect.getHeight()).toEqual(width);
  expect(rect.getTopLeft().getX()).toEqual(topLeft.getX());
  expect(rect.getTopLeft().getY()).toEqual(topLeft.getY());
  expect(rect.getTopRight().getX()).toEqual(topLeft.getX() + width);
  expect(rect.getTopRight().getY()).toEqual(topLeft.getY());
  expect(rect.getBottomLeft().getX()).toEqual(topLeft.getX());
  expect(rect.getBottomLeft().getY()).toEqual(topLeft.getY() + width);
  expect(rect.getBottomRight().getX()).toEqual(topLeft.getX() + width);
  expect(rect.getBottomRight().getY()).toEqual(topLeft.getY() + width);
});

test("ToJSON", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;

  const rect = new Square({ topLeft, width });

  expect(rect.toJSON()).toEqual({
    type: "Square",
    topLeftX: topLeft.getX(),
    topLeftY: topLeft.getY(),
    width
  });
});

test("Move", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;

  const rect = new Square({ topLeft, width });

  rect.move(3, 4);
  expect(rect.getTopLeft().getX()).toEqual(4);
  expect(rect.getTopLeft().getY()).toEqual(6);

  rect.move(0.4321, 0.7654);
  expect(rect.getTopLeft().getX()).toEqual(4.4321);
  expect(rect.getTopLeft().getY()).toEqual(6.7654);

  rect.move(-0.4321, -0.7654);
  expect(rect.getTopLeft().getX()).toEqual(4);
  expect(rect.getTopLeft().getY()).toEqual(6);

  expect(rect.getWidth()).toEqual(width);
  expect(rect.getHeight()).toEqual(width);
});

test("ComputeArea", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;

  const rect = new Square({ topLeft, width });

  expect(rect.computeArea()).toEqual(width * width);
});

test("Draw", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;

  const square = new Square({ topLeft, width });

  const canvas = createCanvas(600, 600);
  const ctx = canvas.getContext("2d");

  try {
    square.draw(ctx);
  } catch (err) {
    fail(`Square.draw() threw an error: ${err}`);
  }
});

test("StrongEncapsulation", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;

  const rect = new Square({ topLeft, width });

  expect(topLeft).not.toBe(rect.getTopLeft());

  topLeft.move(10, 20);
  expect(rect.getTopLeft().getX()).toEqual(1);
  expect(rect.getTopLeft().getY()).toEqual(2);
});
