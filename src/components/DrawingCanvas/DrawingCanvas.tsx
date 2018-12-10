import * as React from "react";
import { observer, inject } from "mobx-react";

import DrawingState from "../../state/DrawingState";
import Shape from "../../shapes/Shape";

export interface Props {
  drawing?: DrawingState;
  height: number;
  width: number;
  isDragging: boolean;
  triggerRender: boolean;
  currentShape: Shape | null;
  temporaryShapes: Shape[];
  onClick: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

export interface State {
  context: CanvasRenderingContext2D | null;
}

@inject("drawing")
@observer
class DrawingCanvas extends React.Component<Props, State> {
  public state: State = {
    context: null
  };

  private canvas = React.createRef<HTMLCanvasElement>();

  public componentDidMount = () => {
    window.addEventListener("resize", () => this.forceUpdate(), true);

    this.setState({ context: this.canvas!.current!.getContext("2d")! });
  };

  public renderShapes = () => {
    const { context } = this.state;
    const { drawing } = this.props;

    if (drawing!.shapes) {
      const children = drawing!.shapes.getChildren();

      for (const child of children) {
        context!.fillStyle = child.getColor();

        if (drawing!.selectedShapes.indexOf(child) > -1) {
          child.draw(context!, { opacity: 0.5 });
        } else {
          child.draw(context!);
        }
      }
    }
  };

  public renderTemporaryShapes = () => {
    const { currentShape, temporaryShapes } = this.props;
    const { context } = this.state;

    if (currentShape) {
      currentShape.draw(context!, { opacity: 0.5 });
    }

    for (const shape of temporaryShapes) {
      shape.draw(context!, { opacity: 0.5 });
    }
  };

  public renderDrawing = (height: number, width: number) => {
    const { context } = this.state;

    if (context) {
      context.save();

      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);

      this.renderShapes();
      this.renderTemporaryShapes();

      context.restore();
    }
  };

  public render() {
    const {
      height,
      width,
      isDragging,
      onClick,
      onMouseMove,
      onMouseDown,
      onMouseUp
    } = this.props;

    this.renderDrawing(height, width);

    return (
      <canvas
        id="canvas"
        height={height}
        width={width}
        ref={this.canvas}
        style={isDragging ? { cursor: "move" } : {}}
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    );
  }
}

export default DrawingCanvas;
