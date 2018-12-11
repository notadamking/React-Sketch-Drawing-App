import Color from "color";

import Point from "./Point";

export default abstract class Shape {
  protected parent?: Shape;
  protected color: string = "black";

  public hasParent() {
    return this.parent !== undefined;
  }

  public getParent() {
    return this.parent;
  }

  public setParent(parent?: Shape) {
    this.parent = parent;
  }

  public getColor() {
    return this.color;
  }

  public setColor(color: string) {
    this.color = color;
  }

  public getColorWithOpacity(opacity?: number) {
    const color = Color(this.color);

    if (opacity) {
      return color.fade(opacity).string();
    }

    return color.string();
  }

  public saveToStream(out: NodeJS.WritableStream) {
    const json = JSON.stringify(this.toJSON());

    out.write(json);
    out.end();
  }

  public abstract getPoints(): Point[];
  public abstract contains(point: Point): boolean;

  public abstract toJSON(): any;
  public abstract draw(
    context: CanvasRenderingContext2D,
    ...options: any
  ): void;
  public abstract move(deltaX: number, deltaY: number): void;
  public abstract validate(): void;
}
