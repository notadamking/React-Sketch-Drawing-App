import { createCanvas } from "canvas";

import Line from "../Line";
import Point from "../Point";

test("ValidConstruction", () => {
  let p1 = new Point({ x: 1, y: 2 });
  let p2 = new Point({ x: 4, y: 10 });

  let myLine = new Line({ pointA: p1, pointB: p2 });
  expect(myLine.getPointA().getX()).toEqual(1);
  expect(myLine.getPointA().getY()).toEqual(2);
  expect(myLine.getPointB().getX()).toEqual(4);
  expect(myLine.getPointB().getY()).toEqual(10);

  p1 = new Point({ x: 1.4, y: 2.5 });
  p2 = new Point({ x: 4.6, y: 10.7 });
  myLine = new Line({ pointA: p1, pointB: p2 });
  expect(myLine.getPointA().getX()).toEqual(1.4);
  expect(myLine.getPointA().getY()).toEqual(2.5);
  expect(myLine.getPointB().getX()).toEqual(4.6);
  expect(myLine.getPointB().getY()).toEqual(10.7);

  myLine = Line.create({
    xPointA: 1,
    yPointA: 3.33,
    xPointB: 4.444,
    yPointB: 5.5555
  });
  expect(myLine.getPointA().getX()).toEqual(1);
  expect(myLine.getPointA().getY()).toEqual(3.33);
  expect(myLine.getPointB().getX()).toEqual(4.444);
  expect(myLine.getPointB().getY()).toEqual(5.5555);
});

// tslint:disable:no-unused-expression no-empty
test("InvalidConstruction", () => {
  const p1 = new Point({ x: 1, y: 2 });

  try {
    new Line({ pointA: p1, pointB: p1 });
    fail("Expected exception not thrown");
  } catch (err) {}

  try {
    Line.create({
      xPointA: 1,
      yPointA: 1,
      xPointB: 1,
      yPointB: 1
    });
    fail("Expected exception not thrown");
  } catch (err) {}
});

test("ToJSON", () => {
  const pointA = new Point({ x: 1, y: 2 });
  const pointB = new Point({ x: 3, y: 4 });

  const line = new Line({ pointA, pointB });

  expect(line.toJSON()).toEqual({
    type: "Line",
    color: "black",
    xPointA: pointA.getX(),
    yPointA: pointA.getY(),
    xPointB: pointB.getX(),
    yPointB: pointB.getY()
  });
});

test("Move", () => {
  const myLine = Line.create({
    xPointA: 1,
    yPointA: 2,
    xPointB: 4,
    yPointB: 10
  });

  myLine.move(3, 4);
  expect(myLine.getPointA().getX()).toEqual(4);
  expect(myLine.getPointA().getY()).toEqual(6);
  expect(myLine.getPointB().getX()).toEqual(7);
  expect(myLine.getPointB().getY()).toEqual(14);

  myLine.move(0.4321, 0.7654);
  expect(myLine.getPointA().getX()).toEqual(4.4321);
  expect(myLine.getPointA().getY()).toEqual(6.7654);
  expect(myLine.getPointB().getX()).toEqual(7.4321);
  expect(myLine.getPointB().getY()).toEqual(14.7654);

  myLine.move(-0.4321, -0.7654);
  expect(myLine.getPointA().getX()).toEqual(4);
  expect(myLine.getPointA().getY()).toEqual(6);
  expect(myLine.getPointB().getX()).toEqual(7);
  expect(myLine.getPointB().getY()).toEqual(14);
});

test("ComputeLength", () => {
  let myLine = Line.create({ xPointA: 1, yPointA: 2, xPointB: 4, yPointB: 10 });
  expect(myLine.computeLength()).toBeCloseTo(8.544, 3);

  myLine = Line.create({ xPointA: 3, yPointA: -2, xPointB: -4, yPointB: 10 });
  expect(myLine.computeLength()).toBeCloseTo(13.892, 3);
});

test("ComputeSlope", () => {
  let myLine = Line.create({ xPointA: 2, yPointA: 2, xPointB: 4, yPointB: 10 });
  expect(myLine.computeSlope()).toEqual(4);

  myLine = Line.create({ xPointA: 2, yPointA: 2, xPointB: 2, yPointB: 4 });
  expect([Infinity, 0]).toContainEqual(myLine.computeSlope());

  myLine = Line.create({ xPointA: 2, yPointA: 2, xPointB: 4, yPointB: 2 });
  expect([Infinity, 0]).toContainEqual(myLine.computeSlope());

  myLine = Line.create({ xPointA: 4, yPointA: 2, xPointB: 2, yPointB: 2 });
  expect([-Infinity, -0]).toContainEqual(myLine.computeSlope());

  try {
    myLine = Line.create({ xPointA: 2, yPointA: 2, xPointB: 2, yPointB: 2 });
    fail("Expected exception not thrown");
  } catch (err) {}
});

test("Draw", () => {
  const p1 = new Point({ x: 1, y: 2 });
  const p2 = new Point({ x: 4, y: 10 });

  const line = new Line({ pointA: p1, pointB: p2 });

  const canvas = createCanvas(600, 600);
  const ctx = canvas.getContext("2d");

  try {
    line.draw(ctx);
  } catch (err) {
    fail(`Line.draw() threw an error: ${err}`);
  }
});

test("StrongEncapsulation", () => {
  const p1 = new Point({ x: 1, y: 2 });
  const p2 = new Point({ x: 4, y: 10 });

  const myLine = new Line({ pointA: p1, pointB: p2 });
  expect(p1).not.toBe(myLine.getPointA());
  expect(p2).not.toBe(myLine.getPointB());

  p1.move(10, 20);
  expect(myLine.getPointA().getX()).toEqual(1);
  expect(myLine.getPointA().getY()).toEqual(2);
  expect(myLine.getPointB().getX()).toEqual(4);
  expect(myLine.getPointB().getY()).toEqual(10);

  p2.move(20, 30);
  expect(myLine.getPointA().getX()).toEqual(1);
  expect(myLine.getPointA().getY()).toEqual(2);
  expect(myLine.getPointB().getX()).toEqual(4);
  expect(myLine.getPointB().getY()).toEqual(10);
});
