import { createCanvas } from "canvas";

import Rectangle from "../Rectangle";
import Point from "../Point";

test("ValidConstruction", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;
  const height = 10;

  const rect1 = new Rectangle({ topLeft, width, height });
  expect(rect1.getTopLeft().getX()).toEqual(topLeft.getX());
  expect(rect1.getTopLeft().getY()).toEqual(topLeft.getY());
  expect(rect1.getWidth()).toEqual(width);
  expect(rect1.getHeight()).toEqual(height);

  const rect4 = Rectangle.create({
    topLeftX: topLeft.getX(),
    topLeftY: topLeft.getY(),
    width,
    height
  });
  expect(rect4.getTopLeft().getX()).toEqual(topLeft.getX());
  expect(rect4.getTopLeft().getY()).toEqual(topLeft.getY());
  expect(rect4.getWidth()).toEqual(width);
  expect(rect4.getHeight()).toEqual(height);
});

// tslint:disable:no-unused-expression no-empty
test("InvalidConstruction", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;

  try {
    new Rectangle({ topLeft, width, height: Infinity });
    fail("Rectangle cannot have an edge with non-positive or infinite length");
  } catch (err) {}

  try {
    new Rectangle({ topLeft, width, height: -Infinity });
    fail("Rectangle cannot have an edge with non-positive or infinite length");
  } catch (err) {}

  try {
    new Rectangle({ topLeft, width, height: NaN });
    fail("Rectangle cannot have an edge with non-positive or infinite length");
  } catch (err) {}

  try {
    new Rectangle({ topLeft, width: 0, height: 0 });
    fail("Rectangle cannot have an edge with non-positive or infinite length");
  } catch (err) {}

  try {
    new Rectangle({ topLeft, width: -5, height: -5 });
    fail("Rectangle cannot have an edge with non-positive or infinite length");
  } catch (err) {}
});

test("Getters", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;
  const height = 10;

  const rect = new Rectangle({ topLeft, width, height });

  expect(rect.getWidth()).toEqual(width);
  expect(rect.getHeight()).toEqual(height);
  expect(rect.getTopLeft().getX()).toEqual(topLeft.getX());
  expect(rect.getTopLeft().getY()).toEqual(topLeft.getY());
  expect(rect.getTopRight().getX()).toEqual(topLeft.getX() + width);
  expect(rect.getTopRight().getY()).toEqual(topLeft.getY());
  expect(rect.getBottomLeft().getX()).toEqual(topLeft.getX());
  expect(rect.getBottomLeft().getY()).toEqual(topLeft.getY() + height);
  expect(rect.getBottomRight().getX()).toEqual(topLeft.getX() + width);
  expect(rect.getBottomRight().getY()).toEqual(topLeft.getY() + height);
});

test("ToJSON", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;
  const height = 10;

  const rect = new Rectangle({ topLeft, width, height });

  expect(rect.toJSON()).toEqual({
    type: "Rectangle",
    color: "black",
    topLeftX: topLeft.getX(),
    topLeftY: topLeft.getY(),
    height,
    width
  });
});

test("Move", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;
  const height = 10;

  const rect = new Rectangle({ topLeft, width, height });

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
  expect(rect.getHeight()).toEqual(height);
});

test("ComputeArea", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;
  const height = 10;

  const rect = new Rectangle({ topLeft, width, height });

  expect(rect.computeArea()).toEqual(width * height);
});

test("Draw", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;
  const height = 10;

  const rect = new Rectangle({ topLeft, width, height });

  const canvas = createCanvas(600, 600);
  const ctx = canvas.getContext("2d");

  try {
    rect.draw(ctx);
  } catch (err) {
    fail(`Rectangle.draw() threw an error: ${err}`);
  }
});

test("StrongEncapsulation", () => {
  const topLeft = new Point({ x: 1, y: 2 });
  const width = 10;
  const height = 10;

  const rect = new Rectangle({ topLeft, width, height });

  expect(topLeft).not.toBe(rect.getTopLeft());

  topLeft.move(10, 20);
  expect(rect.getTopLeft().getX()).toEqual(1);
  expect(rect.getTopLeft().getY()).toEqual(2);
});
