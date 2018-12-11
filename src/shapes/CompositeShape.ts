import { observable, action } from "mobx";

import InvalidShapeError from "./InvalidShapeError";
import ShapeFactory from "./ShapeFactory";
import Shape2D from "./Shape2D";
import Shape from "./Shape";
import Point from "./Point";

export interface ICompositeShapeConstructor {
  type?: "CompositeShape";
  children: string[];
  factory?: ShapeFactory;
}

class CompositeShape extends Shape {
  public static create({
    children,
    factory = new ShapeFactory()
  }: ICompositeShapeConstructor) {
    const shape = new CompositeShape();

    children.forEach((shapeScript: string) => {
      shape.addShape(factory.create(shapeScript));
    });

    shape.validate();

    return shape;
  }

  @observable
  private children: Shape[] = [];

  public toJSON(): ICompositeShapeConstructor {
    return {
      type: "CompositeShape",
      children: this.children.map(child => child.toJSON())
    };
  }

  public getChildren() {
    return this.children.slice();
  }

  @action
  public setChildren(children: Shape[]) {
    this.removeAllShapes();
    this.children = children.slice();
    this.validate();
  }

  public equals(shape: Shape) {
    return (shape as CompositeShape) === this;
  }

  public ensureNoDuplicates(children: Shape[]) {
    children.forEach(shape => {
      if (this.equals(shape)) {
        throw new InvalidShapeError("A CompositeShape cannot contain itself.");
      }

      if (shape instanceof CompositeShape) {
        this.ensureNoDuplicates(shape.getChildren());
      }
    });
  }

  @action
  public addShape(shape: Shape) {
    if (this.equals(shape)) {
      throw new InvalidShapeError("A CompositeShape cannot contain itself.");
    }

    if (shape instanceof CompositeShape) {
      this.ensureNoDuplicates(shape.getChildren());
    }

    shape.setParent(this);
    this.children.push(shape);
  }

  @action
  public removeShape(shapeToRemove: Shape) {
    this.children = this.children.filter(shape => {
      if (shape !== shapeToRemove) {
        shape.setParent(undefined);
        return true;
      }

      return false;
    });
  }

  @action
  public removeAllShapes() {
    this.children.forEach(shape => shape.setParent(undefined));
    this.children = [];
  }

  public validate() {
    this.ensureNoDuplicates(this.children);
    return this.children.forEach(child => child.validate());
  }

  public getPoints(): Point[] {
    return this.children.reduce(
      (points, shape) => {
        return [...points, ...shape.getPoints()];
      },
      [] as Point[]
    );
  }

  public contains(point: Point) {
    return this.children.reduce((contains, shape) => {
      return contains || shape.contains(point);
    }, false);
  }

  @action
  public move(deltaX: number, deltaY: number) {
    return this.children.forEach(child => child.move(deltaX, deltaY));
  }

  public computeArea(): number {
    return this.children.reduce((sum, child) => {
      if (child instanceof Shape2D) {
        return sum + child.computeArea();
      }
      return sum;
    }, 0);
  }

  public draw(context: CanvasRenderingContext2D): void {
    return this.children.forEach(child => child.draw(context));
  }
}

export default CompositeShape;
