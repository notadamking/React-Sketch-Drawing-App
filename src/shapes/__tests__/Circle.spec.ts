import { createCanvas } from "canvas";

import Circle from "../Circle";
import Point from "../Point";

test("ValidConstruction", () => {
  const center = new Point({ x: 1, y: 1 });
  const radius = 10;

  const circle1 = new Circle({
    center,
    radius
  });
  expect(circle1.getCenter().getX()).toEqual(center.getX());
  expect(circle1.getCenter().getY()).toEqual(center.getY());
  expect(circle1.getRadius()).toEqual(radius);

  const circle4 = Circle.create({
    centerX: center.getX(),
    centerY: center.getY(),
    radius
  });
  expect(circle4.getCenter().getX()).toEqual(center.getX());
  expect(circle4.getCenter().getY()).toEqual(center.getY());
  expect(circle4.getRadius()).toEqual(radius);
});

// tslint:disable:no-unused-expression no-empty
test("InvalidConstruction", () => {
  const center = new Point({ x: 1, y: 1 });

  try {
    new Circle({
      center,
      radius: Infinity
    });
    fail(
      "An circle cannot have a radius with non-positive or infinite length."
    );
  } catch (err) {}

  try {
    new Circle({
      center,
      radius: -Infinity
    });
    fail(
      "An circle cannot have a radius with non-positive or infinite length."
    );
  } catch (err) {}

  try {
    new Circle({
      center,
      radius: NaN
    });
    fail(
      "An circle cannot have a radius with non-positive or infinite length."
    );
  } catch (err) {}

  try {
    new Circle({ center, radius: 0 });
    fail(
      "An circle cannot have a radius with non-positive or infinite length."
    );
  } catch (err) {}

  try {
    new Circle({
      center,
      radius: -5
    });
    fail(
      "An circle cannot have a radius with non-positive or infinite length."
    );
  } catch (err) {}
});

test("Getters", () => {
  const center = new Point({ x: 1, y: 1 });
  const radius = 10;

  const circle = new Circle({
    center,
    radius
  });

  expect(circle.getCenter().getX()).toEqual(center.getX());
  expect(circle.getCenter().getY()).toEqual(center.getY());
  expect(circle.getRadius()).toEqual(radius);
  expect(circle.getRadiusX()).toEqual(radius);
  expect(circle.getRadiusY()).toEqual(radius);
});

test("ToJSON", () => {
  const center = new Point({ x: 1, y: 1 });
  const radius = 10;

  const circle = new Circle({
    center,
    radius
  });

  expect(circle.toJSON()).toEqual({
    type: "Circle",
    centerX: center.getX(),
    centerY: center.getY(),
    radius
  });
});

test("Move", () => {
  const center = new Point({ x: 1, y: 1 });
  const radius = 10;

  const circle = new Circle({
    center,
    radius
  });

  circle.move(3, 4);
  expect(circle.getCenter().getX()).toEqual(4);
  expect(circle.getCenter().getY()).toEqual(5);

  circle.move(-0.4321, -0.7654);
  expect(circle.getCenter().getX()).toEqual(4 - 0.4321);
  expect(circle.getCenter().getY()).toEqual(5 - 0.7654);
});

test("ComputeArea", () => {
  const center = new Point({ x: 1, y: 1 });
  const radius = 10;

  const circle = new Circle({
    center,
    radius
  });

  expect(circle.computeArea()).toEqual(Math.PI * Math.pow(radius, 2));
});

test("Draw", () => {
  const center = new Point({ x: 1, y: 1 });
  const radius = 10;

  const circle = new Circle({
    center,
    radius
  });

  const canvas = createCanvas(600, 600);
  const ctx = canvas.getContext("2d");

  try {
    circle.draw(ctx);
  } catch (err) {
    fail(`Circle.draw() threw an error: ${err}`);
  }
});

test("StrongEncapsulation", () => {
  const center = new Point({ x: 1, y: 1 });
  const radius = 10;

  const circle = new Circle({
    center,
    radius
  });

  expect(center).not.toBe(circle.getCenter());

  center.move(10, 20);
  expect(circle.getCenter().getX()).toEqual(1);
  expect(circle.getCenter().getY()).toEqual(1);
  expect(circle.getCenter().getX()).toEqual(1);
  expect(circle.getCenter().getY()).toEqual(1);
});
