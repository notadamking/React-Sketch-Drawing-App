import Shape from "./Shape";

export default abstract class Shape2D extends Shape {
  public abstract computeArea(): number;
}
