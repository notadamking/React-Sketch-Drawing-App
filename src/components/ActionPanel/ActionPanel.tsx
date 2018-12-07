import * as React from "react";
import Color from "color";
import { Button, Icon, Input, Tooltip } from "antd";
import { observer, inject } from "mobx-react";
import { SketchPicker, ColorResult } from "react-color";
import cx from "classnames";

import { ColorCommand, DeleteCommand, PasteCommand } from "../../commands";
import { HotKeyListener } from "..";
import DrawingState from "../../state/DrawingState";

import "./ActionPanel.scss";

export interface Props {
  drawing?: DrawingState;
  triggerRender: () => void;
}

export interface State {
  isEditing: boolean;
  isPickerVisible: boolean;
}

@inject("drawing")
@observer
class ActionPanel extends React.Component<Props, State> {
  public state: State = {
    isEditing: false,
    isPickerVisible: false
  };

  public toggleColorPicker = () => {
    this.setState({ isPickerVisible: !this.state.isPickerVisible });
  };

  public executeCommand = (Command: any) => () => {
    const command = new Command(this.props.drawing!);
    this.props.drawing!.executeCommand(command);
    this.props.triggerRender();
  };

  public execute = (fn: () => void) => () => {
    fn();
    this.props.triggerRender();
  };

  public actions = [
    {
      title: "Undo",
      icon: "undo",
      hotKey: "z",
      onClick: this.execute(this.props.drawing!.undoCommand)
    },
    {
      title: "Redo",
      icon: "redo",
      hotKey: "y",
      onClick: this.execute(this.props.drawing!.redoCommand)
    },
    {
      title: "Copy",
      icon: "copy",
      hotKey: "d",
      onClick: this.execute(this.props.drawing!.copySelectedToPasteBuffer)
    },
    {
      title: "Paste",
      icon: "audit",
      hotKey: "f",
      onClick: this.executeCommand(PasteCommand)
    },
    {
      title: "Delete",
      icon: "delete",
      hotKey: "x",
      onClick: this.executeCommand(DeleteCommand)
    },
    {
      title: "Color",
      icon: "appstore",
      hotKey: "r",
      onClick: this.execute(this.toggleColorPicker)
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

  public handleColorChange = (result: ColorResult) => {
    const command = new ColorCommand(this.props.drawing!);
    const color = Color(result.hex).alpha(result.rgb.a || 1);

    this.props.drawing!.setColor(color.string());
    this.props.drawing!.executeCommand(command);
    this.props.triggerRender();
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
      <div className="ActionPanel__panel">
        {isEditing ? (
          <Input
            className="ActionPanel__panel__input"
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
            className="ActionPanel__panel__delete"
            type="close-circle"
            onClick={this.clearTitle}
          />
        </Tooltip>
        {isEditing && (
          <Button
            className="ActionPanel__panel__save"
            type="primary"
            onClick={this.toggleEditing}
          >
            Save
          </Button>
        )}

        <div className="ActionPanel__panel__actions">
          {this.actions.map((action, i) => (
            <Tooltip key={i} title={action.title} placement="bottom">
              <Icon
                className={cx("ActionPanel__panel__actions__icon")}
                type={action.icon}
                onClick={action.onClick}
              />
            </Tooltip>
          ))}

          <HotKeyListener listeners={hotKeyListeners} />

          {isPickerVisible && (
            <div className="ActionPanel__panel__color_picker">
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

export default ActionPanel;
