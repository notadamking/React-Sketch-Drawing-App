import * as React from "react";
import { observer, inject } from "mobx-react";
import { cloneDeep } from "lodash";

import { CreateCommand, MoveCommand } from "../../commands";
import DrawingState from "../../state/DrawingState";

import { ActionPanel, DrawingCanvas } from "..";
import { Point, Shape, Line } from "../../shapes";

import "./DrawingPanel.scss";

export interface Props {
  drawing?: DrawingState;
}

export interface State {
  selectedPoints: Point[];
  temporaryShapes: Shape[];
  currentShape: Shape | null;
  startingPoint: Point | null;
  previousPoint: Point | null;
  height: number;
  width: number;
  isDragging: boolean;
  shouldRender: boolean;
}

@inject("drawing")
@observer
class DrawingPanel extends React.Component<Props, State> {
  public state: State = {
    selectedPoints: [] as Point[],
    temporaryShapes: [] as Shape[],
    currentShape: null,
    startingPoint: null,
    previousPoint: null,
    height: 0,
    width: 0,
    isDragging: false,
    shouldRender: false
  };

  private container = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    const { current } = this.container!;

    const height = current ? current.clientHeight - 50 : 0;
    const width = current ? current.clientWidth : 0;

    this.setState({ height, width });
  }

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
        const command = new CreateCommand(drawing!, selectedPoints);
        drawing!.executeCommand(command);
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
        currentShape.setColor(drawing!.color);
      } else if (selectedPoints.length === 1) {
        currentShape = new Line({
          pointA: selectedPoints[0],
          pointB: point
        });
        currentShape.setColor(drawing!.color);
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
      const command = new MoveCommand(drawing!, { deltaX, deltaY });
      drawing!.executeCommand(command);
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

  public triggerRender = () => {
    this.setState({ shouldRender: !this.state.shouldRender });
  };

  public render() {
    const {
      isDragging,
      currentShape,
      temporaryShapes,
      height,
      width
    } = this.state;

    return (
      <div ref={this.container} className="DrawingPanel__container">
        <ActionPanel triggerRender={this.triggerRender} />
        <DrawingCanvas
          height={height}
          width={width}
          isDragging={isDragging}
          currentShape={currentShape}
          temporaryShapes={temporaryShapes}
          onClick={this.handleClick}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
      </div>
    );
  }
}

export default DrawingPanel;
