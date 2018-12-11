import * as React from "react";
import { Tooltip, Icon } from "antd";
import { CustomIconComponentProps } from "antd/lib/icon";
import { inject, observer } from "mobx-react";
import cx from "classnames";

import {
  LineTool,
  SquareTool,
  RectangleTool,
  TriangleTool,
  CircleTool,
  EllipseTool,
  EmbeddedPictureTool,
  SelectorTool,
  CursorTool
} from "../../tools";
import DrawingState from "../../state/DrawingState";

import CursorSVG from "./cursor.svg";
import SelectSVG from "./select.svg";
import LineSVG from "./line.svg";
import SquareSVG from "./square.svg";
import RectangleSVG from "./rectangle.svg";
import TriangleSVG from "./triangle.svg";
import CircleSVG from "./circle.svg";
import EllipseSVG from "./ellipse.svg";
import ImageSVG from "./picture.svg";

import "./ToolPanel.scss";

export interface Props {
  drawing?: DrawingState;
}

export interface State {
  fileData: Uint8ClampedArray;
}

@inject("drawing")
@observer
class ToolPanel extends React.Component<Props, State> {
  public tools = [
    {
      title: "Cursor",
      image: CursorSVG,
      tool: new CursorTool(),
      cursor: "default"
    },
    {
      title: "Select",
      image: SelectSVG,
      tool: new SelectorTool(),
      cursor: "crosshair"
    },
    {
      title: "Line",
      image: LineSVG,
      tool: new LineTool(),
      cursor: "crosshair"
    },
    {
      title: "Square",
      image: SquareSVG,
      tool: new SquareTool(),
      cursor: "crosshair"
    },
    {
      title: "Rectangle",
      image: RectangleSVG,
      tool: new RectangleTool(),
      cursor: "crosshair"
    },
    {
      title: "Triangle",
      image: TriangleSVG,
      tool: new TriangleTool(),
      cursor: "crosshair"
    },
    {
      title: "Circle",
      image: CircleSVG,
      tool: new CircleTool(),
      cursor: "crosshair"
    },
    {
      title: "Ellipse",
      image: EllipseSVG,
      tool: new EllipseTool(),
      cursor: "crosshair"
    },
    {
      title: "Image",
      image: ImageSVG,
      tool: new EmbeddedPictureTool(),
      cursor: "crosshair",
      onClick: () => {
        const input = document.getElementById("imageFile");

        if (input) {
          input.click();
        }
      }
    }
  ];

  public componentDidMount = () => {
    if (!this.props.drawing!.activeTool) {
      this.props.drawing!.setActiveTool(this.tools[0].tool);
    }
  };

  public setActiveTool = (index: number) => () => {
    const canvas = document.getElementById("canvas");

    if (canvas) {
      canvas.style.cursor = this.tools[index].cursor;
    }

    if (this.tools[index].onClick) {
      this.tools[index].onClick!();
    }

    this.props.drawing!.setActiveTool(this.tools[index].tool);
  };

  public handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const { drawing } = this.props;

    if (files && files.length > 0) {
      drawing!.setImageFromFile(files[0]);
    }
  };

  private renderIcon = (
    image: string
  ): React.FunctionComponent<CustomIconComponentProps> => () => (
    <img height={24} width={24} src={image} alt="svg" />
  );

  public render() {
    const { drawing } = this.props;
    const { activeTool } = drawing!;

    return (
      <div className="ToolPanel__panel">
        {this.tools.map(({ image, title, tool }, i) => (
          <Tooltip key={i} title={title} placement="right">
            <Icon
              className={cx("ToolPanel__panel__icon", {
                active:
                  activeTool !== null &&
                  activeTool.constructor.name === tool.constructor.name
              })}
              component={this.renderIcon(image)}
              onClick={this.setActiveTool(i)}
            />
          </Tooltip>
        ))}

        <input
          id="imageFile"
          style={{ display: "none" }}
          type="file"
          name="imageFile"
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export default ToolPanel;
