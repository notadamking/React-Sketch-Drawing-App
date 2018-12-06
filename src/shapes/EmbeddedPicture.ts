import resizeImageData from "resize-image-data";

import Rectangle from "./Rectangle";
import Point from "./Point";

interface IEmbeddedPictureConstructor {
  type: "EmbeddedPicture";
  topLeftX: number;
  topLeftY: number;
  imageHeight: number;
  imageWidth: number;
  height: number;
  width: number;
  dataBuffer: any;
}

export default class EmbeddedPicture extends Rectangle {
  public static create({
    dataBuffer,
    topLeftX,
    topLeftY,
    imageHeight,
    imageWidth,
    height,
    width
  }: IEmbeddedPictureConstructor) {
    const topLeft = new Point({ x: topLeftX, y: topLeftY });

    return new EmbeddedPicture({
      topLeft,
      imageHeight,
      imageWidth,
      height,
      width,
      data: new Uint8ClampedArray(Buffer.from(dataBuffer.data))
    });
  }

  private data: Uint8ClampedArray;
  private imageHeight: number;
  private imageWidth: number;

  constructor({
    topLeft,
    imageHeight,
    imageWidth,
    height,
    width,
    data
  }: {
    topLeft: Point;
    imageHeight: number;
    imageWidth: number;
    height: number;
    width: number;
    data: Uint8ClampedArray;
  }) {
    super({ topLeft, height, width });

    this.data = data;
    this.imageHeight = imageHeight;
    this.imageWidth = imageWidth;
  }

  public getData() {
    return this.data;
  }

  public getImageHeight() {
    return this.imageHeight;
  }

  public getImageWidth() {
    return this.imageWidth;
  }

  public setData(data: Uint8ClampedArray) {
    this.data = data;
  }

  public setImageHeight(imageHeight: number) {
    this.imageHeight = imageHeight;
  }

  public setImageWidth(imageWidth: number) {
    this.imageWidth = imageWidth;
  }

  public toJSON(): IEmbeddedPictureConstructor {
    return {
      type: "EmbeddedPicture",
      topLeftX: this.topLeft.getX(),
      topLeftY: this.topLeft.getY(),
      imageHeight: this.imageHeight,
      imageWidth: this.imageWidth,
      height: this.height,
      width: this.width,
      dataBuffer: this.data
    };
  }

  public draw(context: CanvasRenderingContext2D) {
    const imageData = context.createImageData(
      this.imageWidth,
      this.imageHeight
    );

    imageData.data.set(this.data);

    const { height, width, data } = resizeImageData(
      imageData,
      this.width,
      this.height,
      "biliniear-interpolation"
    );

    const newData = context.createImageData(width, height);

    newData.data.set(data);

    context.putImageData(newData, this.topLeft.getX(), this.topLeft.getY());
  }
}
