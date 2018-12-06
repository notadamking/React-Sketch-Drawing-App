import * as React from "react";
import { Button, Icon, Input, Tooltip } from "antd";
import { observer, inject } from "mobx-react";
import { SketchPicker, ColorResult } from "react-color";
import cx from "classnames";

import { DeleteCommand, PasteCommand } from "../../commands";
import { HotKeyListener } from "../../components";
import DrawingState from "../../state/DrawingState";

import "./HeaderPanel.scss";

export interface Props {
  drawing?: DrawingState;
}

export interface State {
  isEditing: boolean;
  isPickerVisible: boolean;
}

@inject("drawing")
@observer
class HeaderPanel extends React.Component<Props, State> {
  public state: State = {
    isEditing: false,
    isPickerVisible: false
  };

  public actions = [
    {
      title: "Undo",
      icon: "undo",
      hotKey: "z",
      onClick: this.props.drawing!.undoCommand
    },
    {
      title: "Redo",
      icon: "redo",
      hotKey: "y",
      onClick: this.props.drawing!.redoCommand
    },
    {
      title: "Copy",
      icon: "copy",
      hotKey: "d",
      onClick: this.props.drawing!.copySelectedToPasteBuffer
    },
    {
      title: "Paste",
      icon: "audit",
      hotKey: "f",
      onClick: () => this.props.drawing!.executeCommand(new PasteCommand())
    },
    {
      title: "Delete",
      icon: "delete",
      hotKey: "x",
      onClick: () => this.props.drawing!.executeCommand(new DeleteCommand())
    },
    {
      title: "Color",
      icon: "appstore",
      hotKey: "r",
      onClick: () =>
        this.setState({ isPickerVisible: !this.state.isPickerVisible })
    }
  ];

  public clearTitle = () => {
    this.setState({ isEditing: true });
    this.props.drawing!.setTitle("");
  };

  public toggleEditing = () => {
    const { isEditing } = this.state;
    const { drawing } = this.props;

    this.setState({ isEditing: !isEditing });
    drawing!.setTitle(
      isEditing && drawing!.title === "" ? "Untitled" : drawing!.title
    );
  };

  public handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      this.setState({ isEditing: false });
    }
  };

  public handleColorChange = (color: ColorResult) => {
    this.props.drawing!.setColor(color.hex);

    for (const shape of this.props.drawing!.selectedShapes) {
      shape.setColor(color.hex);
    }

    this.setState({ isPickerVisible: false });
  };

  public handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.drawing!.setTitle(event.target.value);
  };

  public render() {
    const { isEditing, isPickerVisible } = this.state;
    const { drawing } = this.props;

    const hotKeyListeners = this.actions.reduce(
      (listeners, { hotKey, onClick }) => ({ ...listeners, [hotKey]: onClick }),
      {}
    );

    return (
      <div className="HeaderPanel__panel">
        {isEditing ? (
          <Input
            className="HeaderPanel__panel__input"
            value={drawing!.title}
            placeholder="Enter a title..."
            onKeyUp={this.handleKeyUp}
            onChange={this.handleTitleChange}
          />
        ) : (
          <h2 onClick={this.toggleEditing}>{drawing!.title}</h2>
        )}
        <Tooltip title="Clear title">
          <Icon
            className="HeaderPanel__panel__delete"
            type="close-circle"
            onClick={this.clearTitle}
          />
        </Tooltip>
        {isEditing && (
          <Button
            className="HeaderPanel__panel__save"
            type="primary"
            onClick={this.toggleEditing}
          >
            Save
          </Button>
        )}

        <div className="HeaderPanel__panel__actions">
          {this.actions.map((action, i) => (
            <Tooltip key={i} title={action.title} placement="bottom">
              <Icon
                className={cx("HeaderPanel__panel__actions__icon")}
                type={action.icon}
                onClick={action.onClick}
              />
            </Tooltip>
          ))}

          <HotKeyListener listeners={hotKeyListeners} />

          {isPickerVisible && (
            <div className="HeaderPanel__panel__color_picker">
              <SketchPicker
                color={drawing!.color}
                onChangeComplete={this.handleColorChange}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HeaderPanel;