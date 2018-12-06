// import * as fs from "fs";
import jimp from "jimp";

import DrawingState from "../DrawingState";
import { DeleteCommand } from "../../commands";
import { RectangleTool } from "../../tools";
import { Point, Rectangle } from "../../shapes";

test("ValidConstructor", () => {
  const state = new DrawingState();

  expect(state.title).toBe("Untitled");
  expect(state.color).toBe("black");
  expect(state.imageData).toBe(null);
  expect(state.imageHeight).toBe(0);
  expect(state.imageWidth).toBe(0);
  expect(state.activeTool).toBe(null);
  expect(state.shapes.getChildren().length).toEqual(0);
  expect(state.selectedShapes.length).toEqual(0);
  expect(state.pasteBuffer.length).toEqual(0);
  expect(state.commandHistory.length).toEqual(0);
  expect(state.undoHistory.length).toEqual(0);
});

test("Setters", () => {
  const state = new DrawingState();
  const tool = new RectangleTool();
  const rect = new Rectangle({
    topLeft: new Point({ x: 50, y: 50 }),
    width: 50,
    height: 50
  });

  state.setTitle("title");
  state.setColor("white");
  state.setActiveTool(tool);
  state.setSelectedShapes([rect]);
  state.setPasteBuffer([rect]);

  expect(state.title).toBe("title");
  expect(state.color).toBe("white");
  expect(state.activeTool).toBe(tool);

  const selectedRect = state.selectedShapes[0] as Rectangle;
  const topLeft = selectedRect.getTopLeft();

  expect(topLeft.getX()).toEqual(50);
  expect(topLeft.getY()).toEqual(50);

  const pasteRect = state.selectedShapes[0] as Rectangle;
  const topLeft2 = pasteRect.getTopLeft();

  expect(topLeft2.getX()).toEqual(50);
  expect(topLeft2.getY()).toEqual(50);
});

test("Add and remove shapes", () => {
  const state = new DrawingState();
  const rect = new Rectangle({
    topLeft: new Point({ x: 50, y: 50 }),
    width: 50,
    height: 50
  });

  state.addShape(rect);

  const selectedRect = state.shapes.getChildren()[0] as Rectangle;
  const topLeft = selectedRect.getTopLeft();

  expect(topLeft.getX()).toEqual(50);
  expect(topLeft.getY()).toEqual(50);

  state.removeShape(rect);

  expect(state.shapes.getChildren().length).toEqual(0);

  state.addShape(rect);
  state.addShape(rect);

  expect(state.shapes.getChildren().length).toEqual(2);

  state.removeAllShapes();

  expect(state.shapes.getChildren().length).toEqual(0);
});

test("Select and deselect shapes", () => {
  const state = new DrawingState();
  const tool = new RectangleTool();
  const rect = new Rectangle({
    topLeft: new Point({ x: 55, y: 55 }),
    width: 57,
    height: 57
  });
  const points = [new Point({ x: 50, y: 50 }), new Point({ x: 60, y: 60 })];

  state.addShape(rect);
  state.selectShapes(points);

  expect(state.selectedShapes.length).toEqual(0);

  state.setActiveTool(tool);
  state.selectShapes(points);

  expect(state.selectedShapes.length).toEqual(1);

  const child = state.selectedShapes[0] as Rectangle;
  const topLeft = child.getTopLeft();

  expect(topLeft.getX()).toEqual(55);
  expect(topLeft.getY()).toEqual(55);

  state.deselectAllShapes();

  expect(state.selectedShapes.length).toEqual(0);
});

test("Set image from file", () => {
  const state = new DrawingState();

  jimp.read("./panda.bmp").then(bmp => {
    const file = new File([bmp.bitmap.data], "image.bmp", {
      type: "image/bmp"
    });

    state.setImageFromFile(file);

    expect(state.imageData!.buffer).toEqual([bmp.bitmap.data]);
    expect(state.imageHeight).toEqual(400);
    expect(state.imageWidth).toEqual(375);
  });
});

/* TODO:

Something in the following unit test is causing the entire
test suite to blow up. I imagine it has something to do
with the file system access.

*/

// test("Create from file", () => {
//   const state = new DrawingState();

//   fs.readFile("./sample.json", (err, data) => {
//     if (err) {
//       console.log(err);
//     }

//     const file = new File([data], "sample.json", {
//       type: "application/json"
//     });

//     state.createFromFile(file);

//     const children = state.shapes.getChildren();

//     expect(children.length).toBe(1);

//     const rect = children[0] as Rectangle;
//     const topLeft = rect.getTopLeft();

//     expect(topLeft.getX()).toEqual(50);
//     expect(topLeft.getY()).toEqual(50);
//   });
// });

test("Copy selected to paste buffer", () => {
  const state = new DrawingState();
  const tool = new RectangleTool();
  const rect = new Rectangle({
    topLeft: new Point({ x: 55, y: 55 }),
    width: 57,
    height: 57
  });
  const points = [new Point({ x: 50, y: 50 }), new Point({ x: 60, y: 60 })];

  state.addShape(rect);
  state.setActiveTool(tool);
  state.selectShapes(points);
  state.copySelectedToPasteBuffer();

  expect(state.pasteBuffer.length).toEqual(1);

  const shape = state.pasteBuffer[0] as Rectangle;
  const topLeft = shape.getTopLeft();

  expect(topLeft.getX()).toEqual(55);
  expect(topLeft.getY()).toEqual(55);
});

test("Execute, undo, and redo command", () => {
  const state = new DrawingState();
  const command = new DeleteCommand(state);

  expect(state.commandHistory.length).toEqual(0);
  expect(state.undoHistory.length).toEqual(0);

  state.executeCommand(command);

  expect(state.commandHistory.length).toEqual(1);
  expect(state.undoHistory.length).toEqual(0);

  state.undoCommand();

  expect(state.commandHistory.length).toEqual(0);
  expect(state.undoHistory.length).toEqual(1);

  state.redoCommand();

  expect(state.commandHistory.length).toEqual(1);
  expect(state.undoHistory.length).toEqual(0);
});
