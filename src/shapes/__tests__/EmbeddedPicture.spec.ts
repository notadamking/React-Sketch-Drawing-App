import { createCanvas } from "canvas";
import jimp from "jimp";
import path from "path";

import EmbeddedPicture from "../EmbeddedPicture";
import Point from "../Point";

test("ValidConstruction", () => {
  jimp.read(path.join(__dirname, "../../panda.bmp")).then(pandaBmp => {
    const topLeft = new Point({ x: 1, y: 2 });

    const pic = new EmbeddedPicture({
      data: new Uint8ClampedArray(pandaBmp.bitmap.data),
      topLeft,
      imageWidth: pandaBmp.bitmap.width,
      imageHeight: pandaBmp.bitmap.height,
      height: 500,
      width: 500
    });

    expect(pic.getWidth()).toEqual(500);
    expect(pic.getHeight()).toEqual(500);
    expect(pic.getImageWidth()).toEqual(pandaBmp.bitmap.width);
    expect(pic.getImageHeight()).toEqual(pandaBmp.bitmap.height);
    expect(pic.getData()).toEqual(pandaBmp.bitmap.data);
    expect(pic.getTopLeft().getX()).toEqual(topLeft.getX());
    expect(pic.getTopLeft().getY()).toEqual(topLeft.getY());
  });
});

// tslint:disable:no-unused-expression no-empty
test("InvalidConstruction", () => {
  jimp.read(path.join(__dirname, "../../panda.bmp")).then(pandaBmp => {
    const topLeft = new Point({ x: 1, y: 2 });
    const width = 10;

    try {
      new EmbeddedPicture({
        data: new Uint8ClampedArray(pandaBmp.bitmap.data),
        imageWidth: pandaBmp.bitmap.width,
        imageHeight: pandaBmp.bitmap.height,
        topLeft,
        width,
        height: Infinity
      });
      fail(
        "EmbeddedPicture cannot have an edge with non-positive or infinite length"
      );
    } catch (err) {}

    try {
      new EmbeddedPicture({
        data: new Uint8ClampedArray(pandaBmp.bitmap.data),
        imageWidth: pandaBmp.bitmap.width,
        imageHeight: pandaBmp.bitmap.height,
        topLeft,
        width,
        height: -Infinity
      });
      fail(
        "EmbeddedPicture cannot have an edge with non-positive or infinite length"
      );
    } catch (err) {}

    try {
      new EmbeddedPicture({
        data: new Uint8ClampedArray(pandaBmp.bitmap.data),
        imageWidth: pandaBmp.bitmap.width,
        imageHeight: pandaBmp.bitmap.height,
        topLeft,
        width,
        height: NaN
      });
      fail(
        "EmbeddedPicture cannot have an edge with non-positive or infinite length"
      );
    } catch (err) {}

    try {
      new EmbeddedPicture({
        data: new Uint8ClampedArray(pandaBmp.bitmap.data),
        imageWidth: pandaBmp.bitmap.width,
        imageHeight: pandaBmp.bitmap.height,
        topLeft,
        width: 0,
        height: 0
      });
      fail(
        "EmbeddedPicture cannot have an edge with non-positive or infinite length"
      );
    } catch (err) {}

    try {
      new EmbeddedPicture({
        data: new Uint8ClampedArray(pandaBmp.bitmap.data),
        imageWidth: pandaBmp.bitmap.width,
        imageHeight: pandaBmp.bitmap.height,
        topLeft,
        width: -5,
        height: -5
      });
      fail(
        "EmbeddedPicture cannot have an edge with non-positive or infinite length"
      );
    } catch (err) {}
  });
});

test("Getters", () => {
  jimp.read(path.join(__dirname, "../../panda.bmp")).then(pandaBmp => {
    const topLeft = new Point({ x: 1, y: 2 });

    const pic = new EmbeddedPicture({
      data: new Uint8ClampedArray(pandaBmp.bitmap.data),
      topLeft,
      imageWidth: pandaBmp.bitmap.width,
      imageHeight: pandaBmp.bitmap.height,
      height: 500,
      width: 500
    });

    expect(pic.getWidth()).toEqual(500);
    expect(pic.getHeight()).toEqual(500);
    expect(pic.getImageWidth()).toEqual(pandaBmp.bitmap.width);
    expect(pic.getImageHeight()).toEqual(pandaBmp.bitmap.height);
    expect(pic.getData()).toEqual(pandaBmp.bitmap.data);
    expect(pic.getTopLeft().getX()).toEqual(topLeft.getX());
    expect(pic.getTopLeft().getY()).toEqual(topLeft.getY());
    expect(pic.getTopRight().getX()).toEqual(topLeft.getX() + 500);
    expect(pic.getTopRight().getY()).toEqual(topLeft.getY());
    expect(pic.getBottomLeft().getX()).toEqual(topLeft.getX());
    expect(pic.getBottomLeft().getY()).toEqual(topLeft.getY() - 500);
    expect(pic.getBottomRight().getX()).toEqual(topLeft.getX() + 500);
    expect(pic.getBottomRight().getY()).toEqual(topLeft.getY() - 500);
  });
});

test("ToJSON", () => {
  jimp.read(path.join(__dirname, "../../panda.bmp")).then(pandaBmp => {
    const topLeft = new Point({ x: 1, y: 2 });

    const pic = new EmbeddedPicture({
      data: new Uint8ClampedArray(pandaBmp.bitmap.data),
      topLeft,
      imageWidth: pandaBmp.bitmap.width,
      imageHeight: pandaBmp.bitmap.height,
      height: 500,
      width: 500
    });

    expect(pic.toJSON()).toEqual({
      type: "EmbeddedPicture",
      topLeftX: topLeft.getX(),
      topLeftY: topLeft.getY(),
      imageHeight: pandaBmp.bitmap.height,
      imageWidth: pandaBmp.bitmap.width,
      height: 500,
      width: 500,
      dataBuffer: pandaBmp.bitmap.data
    });
  });
});

test("Move", () => {
  jimp.read(path.join(__dirname, "../../panda.bmp")).then(pandaBmp => {
    const topLeft = new Point({ x: 1, y: 2 });

    const pic = new EmbeddedPicture({
      data: new Uint8ClampedArray(pandaBmp.bitmap.data),
      topLeft,
      imageWidth: pandaBmp.bitmap.width,
      imageHeight: pandaBmp.bitmap.height,
      height: 500,
      width: 500
    });

    pic.move(3, 4);
    expect(pic.getTopLeft().getX()).toEqual(4);
    expect(pic.getTopLeft().getY()).toEqual(6);

    pic.move(0.4321, 0.7654);
    expect(pic.getTopLeft().getX()).toEqual(4.4321);
    expect(pic.getTopLeft().getY()).toEqual(6.7654);

    pic.move(-0.4321, -0.7654);
    expect(pic.getTopLeft().getX()).toEqual(4);
    expect(pic.getTopLeft().getY()).toEqual(6);

    expect(pic.getWidth()).toEqual(500);
    expect(pic.getHeight()).toEqual(500);
  });
});

test("ComputeArea", () => {
  jimp.read(path.join(__dirname, "../../panda.bmp")).then(pandaBmp => {
    const topLeft = new Point({ x: 0, y: 0 });

    const pic = new EmbeddedPicture({
      data: new Uint8ClampedArray(pandaBmp.bitmap.data),
      topLeft,
      imageWidth: pandaBmp.bitmap.width,
      imageHeight: pandaBmp.bitmap.height,
      height: 500,
      width: 500
    });

    expect(pic.computeArea()).toEqual(500 * 500);
  });
});

test("Draw", () => {
  jimp.read(path.join(__dirname, "../../panda.bmp")).then(pandaBmp => {
    const pic = new EmbeddedPicture({
      data: new Uint8ClampedArray(pandaBmp.bitmap.data),
      topLeft: new Point({ x: 0, y: 0 }),
      imageWidth: pandaBmp.bitmap.width,
      imageHeight: pandaBmp.bitmap.height,
      height: 500,
      width: 500
    });

    const canvas = createCanvas(600, 600);
    const ctx = canvas.getContext("2d");

    try {
      pic.draw(ctx);
    } catch (err) {
      fail(`EmbeddedPicture.draw() threw an error: ${err}`);
    }
  });
});

test("StrongEncapsulation", () => {
  jimp.read(path.join(__dirname, "../../panda.bmp")).then(pandaBmp => {
    const topLeft = new Point({ x: 0, y: 0 });

    const pic = new EmbeddedPicture({
      data: new Uint8ClampedArray(pandaBmp.bitmap.data),
      topLeft,
      imageWidth: pandaBmp.bitmap.width,
      imageHeight: pandaBmp.bitmap.height,
      height: 500,
      width: 500
    });

    expect(topLeft).not.toBe(pic.getTopLeft());

    topLeft.move(10, 20);
    expect(pic.getTopLeft().getX()).toEqual(0);
    expect(pic.getTopLeft().getY()).toEqual(0);
  });
});
