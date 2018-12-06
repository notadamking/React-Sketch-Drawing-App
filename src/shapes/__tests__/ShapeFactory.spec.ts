import fs from "fs";
import path from "path";

import ShapeFactory from "../ShapeFactory";
import Shape from "../Shape";
import Point from "../Point";

test("ValidConstruction", () => {
  const factory = new ShapeFactory();

  expect(factory).toBeInstanceOf(ShapeFactory);
});

test("CreateFromStream", () => {
  const stream = fs.createReadStream(path.join(__dirname, "./point_spec.json"));
  const factory = new ShapeFactory();

  factory.createFromStream(stream, (shape: Shape) => {
    expect(shape).toBeInstanceOf(Point);

    const point = shape as Point;

    expect(point.getX()).toEqual(75);
    expect(point.getY()).toEqual(75);
  });
});

test("CreateFromStream", () => {
  const json = fs.readFileSync(path.join(__dirname, "./point_spec.json"));
  const factory = new ShapeFactory();

  const shape = factory.create(json.toString());

  expect(shape).toBeInstanceOf(Point);

  const point = shape as Point;

  expect(point.getX()).toEqual(75);
  expect(point.getY()).toEqual(75);
});
