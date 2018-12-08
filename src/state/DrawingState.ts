import { observable, action } from "mobx";
import { cloneDeep } from "lodash";
import { Bitmap } from "bitmap-ts";

import { Point, Rectangle, Shape, CompositeShape } from "../shapes";
import { ICompositeShapeConstructor } from "../shapes/CompositeShape";
import DrawingCommand from "../commands/DrawingCommand";
import DrawingTool from "../tools/DrawingTool";

class DrawingState {
  private imageFlyweights: { [key: string]: Uint8ClampedArray } = {};

  private commandHistory: DrawingCommand[] = [] as DrawingCommand[];

  private undoHistory: DrawingCommand[] = [] as DrawingCommand[];

  @observable
  public title: string = "Untitled";

  @observable
  public color: string = "black";

  @observable
  public imageData: Uint8ClampedArray | null = null;

  @observable
  public imageHeight: number = 0;

  @observable
  public imageWidth: number = 0;

  @observable
  public activeTool: DrawingTool | null = null;

  @observable
  public shapes: CompositeShape = new CompositeShape();

  @observable
  public selectedShapes: Shape[] = [] as Shape[];

  @observable
  public pasteBuffer: Shape[] = [] as Shape[];

  public getCommandHistory = () => {
    return this.commandHistory.slice();
  };

  public getUndoHistory = () => {
    return this.undoHistory.slice();
  };

  @action
  public setTitle = (title: string) => {
    this.title = title;
  };

  @action
  public setColor = (color: string) => {
    this.color = color;
  };

  @action
  public addShape = (shape: Shape) => {
    this.shapes.addShape(shape);
  };

  @action
  public removeShape = (shape: Shape) => {
    this.shapes.removeShape(shape);
  };

  @action
  public removeAllShapes = () => {
    this.shapes.removeAllShapes();
  };

  @action
  public selectShapes = (points: Point[]) => {
    if (this.activeTool) {
      const newShape = this.activeTool.create(points) as Rectangle;

      const selectedShapes = this.shapes.getChildren().reduce(
        (selected, child) => {
          const isSelected = child
            .getPoints()
            .reduce((hasBeenSelected, childPoint) => {
              return hasBeenSelected || newShape.contains(childPoint);
            }, false);

          if (isSelected) {
            return [...selected, child];
          }

          return selected;
        },
        [] as Shape[]
      );

      this.setSelectedShapes(selectedShapes);
    }
  };

  @action
  public setImageFromFile(file: File) {
    const bmp = new Bitmap(file);
    const key = `${file.name}:${file.lastModified}:${file.size}`;

    if (!this.imageFlyweights[key]) {
      bmp.read((response: Bitmap) => {
        const data = response.currentData();
        this.imageData = this.imageFlyweights[key] = data;
      });
    } else {
      this.imageData = this.imageFlyweights[key];
    }

    const image = new Image();

    image.onload = () => {
      this.imageHeight = image.height;
      this.imageWidth = image.width;
    };

    image.src = URL.createObjectURL(file);
  }

  @action
  public createFromFile(file: File) {
    const newState = new DrawingState();

    Object.assign(this, newState);

    const reader = new FileReader();

    reader.onload = () => {
      const script = JSON.parse(
        reader.result as string
      ) as ICompositeShapeConstructor;

      this.shapes = CompositeShape.create(script);
    };

    reader.readAsText(file);
  }

  @action
  public saveToFile() {
    const script = this.shapes.toJSON();

    const data =
      "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(script));

    const link = document.createElement("a");

    link.href = `data:${data}`;
    link.download = `${this.title}.json`;
    link.style.display = "none";

    document.body.appendChild(link);

    link.click();
  }

  @action
  public exportAsImage() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const link = document.createElement("a");

    link.href = canvas.toDataURL("image/png");
    link.download = `${this.title}.png`;
    link.style.display = "none";

    document.body.appendChild(link);

    link.click();
  }

  @action
  public setActiveTool = (tool: DrawingTool | null) => {
    this.activeTool = tool;
  };

  @action
  public setSelectedShapes = (shapes: Shape[]) => {
    this.selectedShapes = shapes;
  };

  @action
  public deselectAllShapes = () => {
    this.selectedShapes = [];
  };

  @action
  public setPasteBuffer = (buffer: Shape[]) => {
    this.pasteBuffer = buffer;
  };

  @action
  public copySelectedToPasteBuffer = () => {
    this.pasteBuffer = this.selectedShapes.map(shape => cloneDeep(shape));
  };

  @action
  public executeCommand = (command: DrawingCommand) => {
    this.undoHistory = [] as DrawingCommand[];

    this.commandHistory.unshift(command);

    command.execute(this);
  };

  @action
  public undoCommand = () => {
    if (this.commandHistory.length) {
      const command = this.commandHistory.shift()!;

      this.undoHistory.unshift(command);

      command.undo(this);
    }
  };

  @action
  public redoCommand = () => {
    if (this.undoHistory.length) {
      const command = this.undoHistory.shift()!;

      this.commandHistory.unshift(command);

      command.execute(this);
    }
  };
}

export default DrawingState;
