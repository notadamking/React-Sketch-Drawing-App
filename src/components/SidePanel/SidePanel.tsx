import * as React from "react";
import { Icon, Tooltip } from "antd";
import { inject, observer } from "mobx-react";
import cx from "classnames";

import { ToolPanel, HotKeyListener } from "../../components";
import DrawingState from "../../state/DrawingState";

import "./SidePanel.scss";

export interface Props {
  drawing?: DrawingState;
}

export interface State {
  activePanel: number;
}

@inject("drawing")
@observer
class SidePanel extends React.Component<Props, State> {
  public state = {
    activePanel: 0
  };

  public deleteCurrentDrawing = () => {
    const { drawing } = this.props;

    if (drawing!.shapes.getChildren().length > 0) {
      const shouldRemove = confirm(
        "Are you sure you would like to delete the current drawing?"
      );

      if (shouldRemove) {
        drawing!.removeAllShapes();
      }
    }
  };

  public uploadDrawing = () => {
    const { drawing } = this.props;

    if (drawing!.shapes.getChildren().length > 0) {
      const shouldRemove = confirm(
        "Are you sure you would like to delete the current drawing?"
      );

      if (shouldRemove) {
        drawing!.removeAllShapes();
      }
    }

    const input = document.getElementById("drawingFile");

    if (input) {
      input.click();
    }
  };

  public saveDrawing = () => {
    const { drawing } = this.props;

    if (drawing!.shapes.getChildren().length < 1) {
      return alert("There is no drawing to save.");
    }

    drawing!.saveToFile();
  };

  public exportDrawing = () => {
    const { drawing } = this.props;

    if (drawing!.shapes.getChildren().length < 1) {
      return alert("There is no drawing to save.");
    }

    drawing!.exportAsImage();
  };

  private subPanels = [
    {
      title: "Tools",
      icon: "tool",
      children: <ToolPanel />,
      hotKey: "t",
      onClick: () => this.handleClickPanel(0)
    },
    {
      title: "New drawing",
      icon: "file",
      children: null,
      hotKey: "n",
      onClick: this.deleteCurrentDrawing
    },
    {
      title: "Upload",
      icon: "upload",
      children: null,
      hotKey: "u",
      onClick: this.uploadDrawing
    },
    {
      title: "Save",
      icon: "save",
      children: null,
      hotKey: "s",
      onClick: this.saveDrawing
    },
    {
      title: "Export",
      icon: "export",
      children: null,
      hotKey: "e",
      onClick: this.exportDrawing
    }
  ];

  public handleClickPanel = (index: number) => () => {
    const { activePanel } = this.state;
    const { children, onClick } = this.subPanels[index];

    if (children) {
      this.setState({ activePanel: activePanel === index ? -1 : index });
    } else if (onClick) {
      onClick();
    }
  };

  public handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const { drawing } = this.props;

    if (files && files.length > 0) {
      drawing!.createFromFile(files[0]);
    }
  };

  public render() {
    const { activePanel } = this.state;

    const panel: React.ReactNode | null =
      activePanel > -1 ? this.subPanels[activePanel].children : null;

    const hotKeyListeners = this.subPanels.reduce(
      (listeners, { hotKey, onClick }) => ({ ...listeners, [hotKey]: onClick }),
      {}
    );

    return (
      <div className="SidePanel__container">
        <div className="SidePanel__panel">
          {this.subPanels.map(({ icon, title }, i) => (
            <Tooltip key={i} title={title} placement="right">
              <Icon
                className={cx("SidePanel__panel__icon", {
                  active: i === activePanel
                })}
                type={icon}
                theme="outlined"
                onClick={this.handleClickPanel(i)}
              />
            </Tooltip>
          ))}

          <HotKeyListener listeners={hotKeyListeners} />

          <input
            id="drawingFile"
            style={{ display: "none" }}
            type="file"
            name="drawingFile"
            onChange={this.handleFileChange}
          />
        </div>
        {panel}
      </div>
    );
  }
}

export default SidePanel;
