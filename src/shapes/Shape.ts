import Point from "./Point";

export default abstract class Shape {
  private parent?: Shape;
  private color: string = "black";

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

  public saveToStream(out: NodeJS.WritableStream) {
    const json = JSON.stringify(this.toJSON());

    out.write(json);
    out.end();
  }

  public abstract getPoints(): Point[];

  public abstract toJSON(): any;
  public abstract draw(
    context: CanvasRenderingContext2D,
    ...options: any
  ): void;
  public abstract move(deltaX: number, deltaY: number): void;
  public abstract validate(): void;
}
