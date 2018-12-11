import Point from "../../shapes/Point";
import CursorTool from "../CursorTool";

it("Creates null shape", () => {
  const tool = new CursorTool();
  const points = [new Point({ x: 50, y: 50 })];

  const shape = tool.create(points);

  expect(shape).toBeNull();
});
