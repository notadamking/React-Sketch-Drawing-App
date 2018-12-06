import { createCanvas } from "canvas";

import Ellipse from "../Ellipse";
import Point from "../Point";

test("ValidConstruction", () => {
  const center = new Point({ x: 1, y: 1 });
  const radiusX = 10;
  const radiusY = 10;

  const ellipse1 = new Ellipse({
    center,
    radiusX,
    radiusY
  });
  expect(ellipse1.getCenter().getX()).toEqual(center.getX());
  expect(ellipse1.getCenter().getY()).toEqual(center.getY());
  expect(ellipse1.getRadiusX()).toEqual(radiusX);
  expect(ellipse1.getRadiusY()).toEqual(radiusY);

  const ellipse4 = Ellipse.create({
    centerX: center.getX(),
    centerY: center.getY(),
    radiusX,
    radiusY
  });
  expect(ellipse4.getCenter().getX()).toEqual(center.getX());
  expect(ellipse4.getCenter().getY()).toEqual(center.getY());
  expect(ellipse4.getRadiusX()).toEqual(radiusX);
  expect(ellipse4.getRadiusY()).toEqual(radiusY);
});

// tslint:disable:no-unused-expression no-empty
test("InvalidConstruction", () => {
  const center = new Point({ x: 1, y: 1 });
  const radiusX = 10;
  const radiusY = 10;

  try {
    new Ellipse({
      center,
      radiusX,
      radiusY: Infinity
    });
    fail(
      "An ellipse cannot have a radiusY with non-positive or infinite length."
    );
  } catch (err) {}

  try {
    new Ellipse({
      center,
      radiusX: Infinity,
      radiusY
    });
    fail(
      "An ellipse cannot have a radiusY with non-positive or infinite length."
    );
  } catch (err) {}

  try {
    new Ellipse({
      center,
      radiusX,
      radiusY: -Infinity
    });
    fail(
      "An ellipse cannot have a radiusY with non-positive or infinite length."
    );
  } catch (err) {}

  try {
    new Ellipse({
      center,
      radiusX,
      radiusY: NaN
    });
    fail(
      "An ellipse cannot have a radiusY with non-positive or infinite length."
    );
  } catch (err) {}

  try {
    new Ellipse({ center, radiusX, radiusY: 0 });
    fail(
      "An ellipse cannot have a radiusY with non-positive or infinite length."
    );
  } catch (err) {}

  try {
    new Ellipse({
      center,
      radiusX,
      radiusY: -5
    });
    fail(
      "An ellipse cannot have a radiusY with non-positive or infinite length."
    );
  } catch (err) {}
});

test("Getters", () => {
  const center = new Point({ x: 1, y: 1 });
  const radiusX = 10;
  const radiusY = 10;

  const ellipse = new Ellipse({
    center,
    radiusX,
    radiusY
  });

  expect(ellipse.getCenter().getX()).toEqual(center.getX());
  expect(ellipse.getCenter().getY()).toEqual(center.getY());
  expect(ellipse.getRadiusX()).toEqual(radiusX);
  expect(ellipse.getRadiusY()).toEqual(radiusY);
});

test("ToJSON", () => {
  const center = new Point({ x: 1, y: 1 });
  const radiusX = 10;
  const radiusY = 10;

  const ellipse = new Ellipse({
    center,
    radiusX,
    radiusY
  });

  expect(ellipse.toJSON()).toEqual({
    type: "Ellipse",
    centerX: center.getX(),
    centerY: center.getY(),
    radiusX,
    radiusY
  });
});

test("Move", () => {
  const center = new Point({ x: 1, y: 1 });
  const radiusX = 10;
  const radiusY = 10;

  const ellipse = new Ellipse({
    center,
    radiusX,
    radiusY
  });

  ellipse.move(3, 4);
  expect(ellipse.getCenter().getX()).toEqual(4);
  expect(ellipse.getCenter().getY()).toEqual(5);

  ellipse.move(-0.4321, -0.7654);
  expect(ellipse.getCenter().getX()).toEqual(4 - 0.4321);
  expect(ellipse.getCenter().getY()).toEqual(5 - 0.7654);
});

test("Draw", () => {
  const center = new Point({ x: 1, y: 1 });
  const radiusX = 10;
  const radiusY = 10;

  const ellipse = new Ellipse({
    center,
    radiusX,
    radiusY
  });

  const canvas = createCanvas(600, 600);
  const ctx = canvas.getContext("2d");

  try {
    ellipse.draw(ctx);
  } catch (err) {
    fail(`Ellipse.draw() threw an error: ${err}`);
  }
});

test("ComputeArea", () => {
  const center = new Point({ x: 1, y: 1 });
  const radiusX = 10;
  const radiusY = 10;

  const ellipse = new Ellipse({
    center,
    radiusX,
    radiusY
  });

  expect(ellipse.computeArea()).toEqual(Math.PI * radiusX * radiusY);
});

test("StrongEncapsulation", () => {
  const center = new Point({ x: 1, y: 1 });
  const radiusX = 10;
  const radiusY = 10;

  const ellipse = new Ellipse({
    center,
    radiusX,
    radiusY
  });

  expect(center).not.toBe(ellipse.getCenter());

  center.move(10, 20);
  expect(ellipse.getCenter().getX()).toEqual(1);
  expect(ellipse.getCenter().getY()).toEqual(1);
});
