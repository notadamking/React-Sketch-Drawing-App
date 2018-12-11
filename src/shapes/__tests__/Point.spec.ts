import { createCanvas } from "canvas";

import Point from "../Point";

test("ValidConstruction", () => {
  let p1 = new Point({ x: 1, y: 2 });

  expect(p1.getX()).toEqual(1);
  expect(p1.getY()).toEqual(2);

  p1 = new Point({ x: 1.111, y: 2.222 });

  expect(p1.getX()).toEqual(1.111);
  expect(p1.getY()).toEqual(2.222);
});

// tslint:disable:no-unused-expression no-empty
test("InvalidConstruction", () => {
  try {
    new Point({ x: 1, y: Infinity });
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    new Point({ x: 1, y: -Infinity });
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    new Point({ x: 1, y: NaN });
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    new Point({ x: Infinity, y: 1 });
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    new Point({ x: -Infinity, y: 1 });
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    new Point({ x: NaN, y: 1 });
    fail("Expected exception not thrown");
  } catch (err) {}
});

test("Setter", () => {
  const p1 = new Point({ x: 1, y: 2 });

  p1.setX(10);
  expect(p1.getX()).toEqual(10);

  p1.setY(8);
  expect(p1.getY()).toEqual(8);

  try {
    p1.setX(Infinity);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.setX(-Infinity);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.setX(NaN);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.setY(Infinity);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.setY(-Infinity);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.setY(NaN);
    fail("Expected exception not thrown");
  } catch (err) {}
});

test("ToJSON", () => {
  const point = new Point({ x: 1, y: 2 });

  expect(point.toJSON()).toEqual({
    type: "Point",
    color: "black",
    x: point.getX(),
    y: point.getY()
  });
});

test("MoveX", () => {
  const p1 = new Point({ x: 1, y: 2 });

  p1.moveX(10);
  expect(p1.getX()).toEqual(11);
  expect(p1.getY()).toEqual(2);

  p1.moveX(0.1234);
  expect(p1.getX()).toEqual(11.1234);
  expect(p1.getY()).toEqual(2);

  p1.moveX(-20);
  expect(p1.getX()).toEqual(-8.8766);
  expect(p1.getY()).toEqual(2);

  p1.moveX(0);
  expect(p1.getX()).toEqual(-8.8766);
  expect(p1.getY()).toEqual(2);

  try {
    p1.moveX(Infinity);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.moveX(-Infinity);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.moveX(NaN);
    fail("Expected exception not thrown");
  } catch (err) {}
});

test("MoveY", () => {
  const p1 = new Point({ x: 1, y: 2 });

  p1.moveY(10);
  expect(p1.getX()).toEqual(1);
  expect(p1.getY()).toEqual(12);

  p1.moveY(0.1234);
  expect(p1.getX()).toEqual(1);
  expect(p1.getY()).toEqual(12.1234);

  p1.moveY(-20);
  expect(p1.getX()).toEqual(1);
  expect(p1.getY()).toEqual(-7.8766);

  p1.moveY(0);
  expect(p1.getX()).toEqual(1);
  expect(p1.getY()).toEqual(-7.8766);

  try {
    p1.moveY(Infinity);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.moveY(-Infinity);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.moveY(NaN);
    fail("Expected exception not thrown");
  } catch (err) {}
});

test("Move", () => {
  const p1 = new Point({ x: 1, y: 2 });

  p1.move(10, 20);
  expect(p1.getX()).toEqual(11);
  expect(p1.getY()).toEqual(22);

  p1.move(10.222, 20.333);
  expect(p1.getX()).toEqual(21.222);
  expect(p1.getY()).toEqual(42.333);

  p1.move(-0.222, -0.333);
  expect(p1.getX()).toEqual(21);
  expect(p1.getY()).toEqual(42);

  p1.move(-20, -30);
  expect(p1.getX()).toEqual(1);
  expect(p1.getY()).toEqual(12);

  try {
    p1.move(1, Infinity);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.move(1, -Infinity);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.move(1, NaN);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.move(Infinity, 1);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.move(-Infinity, 1);
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    p1.move(NaN, 1);
    fail("Expected exception not thrown");
  } catch (err) {}
});

test("Draw", () => {
  const point = new Point({ x: 1, y: 2 });

  const canvas = createCanvas(600, 600);
  const ctx = canvas.getContext("2d");

  try {
    point.draw(ctx);
  } catch (err) {
    fail(`Point.draw() threw an error: ${err}`);
  }
});

test("Clone", () => {
  const p1 = new Point({ x: -123.45, y: -23.45 });

  expect(p1.getX()).toEqual(-123.45);
  expect(p1.getY()).toEqual(-23.45);

  const p2 = p1.clone();

  expect(p1).not.toBe(p2);

  expect(p1.getX()).toEqual(p2.getX());
  expect(p1.getY()).toEqual(p2.getY());

  p2.move(1, 1);

  expect(p1.getX()).not.toEqual(p2.getX());
  expect(p1.getY()).not.toEqual(p2.getY());
});
