import * as React from "react";
import { observer, inject } from "mobx-react";
import { cloneDeep } from "lodash";

import { CreateCommand, MoveCommand } from "../../commands";
import DrawingState from "../../state/DrawingState";

import HeaderPanel from "../HeaderPanel";
import { Point, Shape, Line } from "../../shapes";

import "./DrawingCanvas.scss";

export interface Props {
  drawing?: DrawingState;
}

export interface State {
  context: CanvasRenderingContext2D | null;
  selectedPoints: Point[];
  temporaryShapes: Shape[];
  currentShape: Shape | null;
  startingPoint: Point | null;
  previousPoint: Point | null;
  isDragging: boolean;
}

@inject("drawing")
@observer
class DrawingCanvas extends React.Component<Props, State> {
  public state: State = {
    selectedPoints: [] as Point[],
    temporaryShapes: [] as Shape[],
    currentShape: null,
    context: null,
    startingPoint: null,
    previousPoint: null,
    isDragging: false
  };

  private container = React.createRef<HTMLDivElement>();
  private canvas = React.createRef<HTMLCanvasElement>();

  public componentDidMount = () => {
    window.addEventListener("resize", () => this.forceUpdate(), true);

    this.setState({ context: this.canvas!.current!.getContext("2d")! });
  };

  public activateCurrentTool = (dest: {
    x: number;
    y: number;
    currentTarget: EventTarget & HTMLCanvasElement;
  }) => {
    const { selectedPoints } = this.state;
    const { drawing } = this.props;

    const rect = dest.currentTarget.getBoundingClientRect();
    const point = new Point({
      x: dest.x - rect.left,
      y: dest.y - rect.top
    });

    if (!selectedPoints.find(selected => selected.isEqual(point))) {
      selectedPoints.push(point);
    }

    if (selectedPoints.length >= drawing!.activeTool!.numPoints) {
      if (drawing!.activeTool!.shouldRender) {
        drawing!.executeCommand(new CreateCommand(selectedPoints));
      } else {
        drawing!.selectShapes(selectedPoints);
      }

      this.setState({ selectedPoints: [] as Point[], currentShape: null });
    }
  };

  public updateCurrentShape = (point: Point) => {
    const { selectedPoints } = this.state;
    const { drawing } = this.props;

    let currentShape = null;

    try {
      if (selectedPoints.length >= drawing!.activeTool!.numPoints - 1) {
        currentShape = drawing!.activeTool!.create(
          [...selectedPoints, point],
          drawing!
        );
      } else if (selectedPoints.length === 1) {
        currentShape = new Line({
          pointA: selectedPoints[0],
          pointB: point
        });
      }
    } catch {} // tslint:disable-line

    this.setState({ currentShape });
  };

  public updateTemporaryShapes = () => {
    const { drawing } = this.props;

    const temporaryShapes = [] as Shape[];

    for (const shape of drawing!.selectedShapes) {
      temporaryShapes.push(cloneDeep(shape));
    }

    this.setState({ temporaryShapes });
  };

  public moveSelectedShapes = (point: Point) => {
    const { previousPoint, temporaryShapes } = this.state;

    if (previousPoint) {
      const deltaX = point.getX() - previousPoint.getX();
      const deltaY = point.getY() - previousPoint.getY();

      for (const shape of temporaryShapes) {
        shape.move(deltaX, deltaY);
      }
    }
  };

  public executeMove = (point: Point) => {
    const { startingPoint } = this.state;
    const { drawing } = this.props;

    const deltaX = point.getX() - startingPoint!.getX();
    const deltaY = point.getY() - startingPoint!.getY();

    if (deltaX || deltaY) {
      drawing!.executeCommand(new MoveCommand({ deltaX, deltaY }));
    } else {
      drawing!.setSelectedShapes([] as Shape[]);
    }
  };

  public handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY, currentTarget, screenX, screenY } = event;
    const { startingPoint } = this.state;
    const { drawing } = this.props;

    if (
      startingPoint !== null &&
      !startingPoint.isEqual(new Point({ x: screenX, y: screenY }))
    ) {
      this.setState({ startingPoint: null, previousPoint: null });
    } else if (drawing!.activeTool) {
      this.activateCurrentTool({ x: clientX, y: clientY, currentTarget });
    }
  };

  public handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY, currentTarget, screenX, screenY } = event;
    const { isDragging } = this.state;
    const { drawing } = this.props;

    if (drawing!.activeTool) {
      const rect = currentTarget.getBoundingClientRect();
      const point = new Point({
        x: clientX - rect.left,
        y: clientY - rect.top
      });

      this.updateCurrentShape(point);
    }

    if (isDragging) {
      const point = new Point({ x: screenX, y: screenY });

      this.moveSelectedShapes(point);

      this.setState({ previousPoint: point });
    }
  };

  public handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const point = new Point({ x: event.screenX, y: event.screenY });

    this.updateTemporaryShapes();

    this.setState({
      isDragging: true,
      previousPoint: point,
      startingPoint: point
    });
  };

  public handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const point = new Point({ x: event.screenX, y: event.screenY });

    this.executeMove(point);

    this.setState({
      isDragging: false,
      temporaryShapes: []
    });
  };

  public renderShapes = () => {
    const { context } = this.state;
    const { drawing } = this.props;

    if (drawing!.shapes) {
      const children = drawing!.shapes.getChildren();

      for (const child of children) {
        context!.save();

        context!.fillStyle = child.getColor();

        if (drawing!.selectedShapes.indexOf(child) > -1) {
          context!.globalAlpha = 0.5;
        }

        child.draw(context!);

        context!.restore();
      }
    }
  };

  public renderTemporaryShapes = () => {
    const { context, currentShape, temporaryShapes } = this.state;
    const { drawing } = this.props;

    context!.globalAlpha = 0.5;
    context!.fillStyle = drawing!.color;

    if (currentShape) {
      currentShape.draw(context!);
    }

    for (const shape of temporaryShapes) {
      shape.draw(context!);
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
    const { isDragging } = this.state;
    const { current } = this.container!;

    const height = current ? current.clientHeight - 50 : 0;
    const width = current ? current.clientWidth : 0;

    this.renderDrawing(height, width);

    return (
      <div ref={this.container} className="DrawingCanvas__container">
        <HeaderPanel />
        <canvas
          id="canvas"
          height={height}
          width={width}
          ref={this.canvas}
          style={isDragging ? { cursor: "move" } : {}}
          onClick={this.handleClick}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
      </div>
    );
  }
}

export default DrawingCanvas;
