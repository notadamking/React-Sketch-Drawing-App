import * as React from "react";

export interface Props {
  listeners: { [hotKey: string]: () => void };
}

class HotKeyListener extends React.Component<Props> {
  public componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  public componentWillUnmount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  public handleKeyDown = (event: KeyboardEvent) => {
    const { listeners } = this.props;
    const keyPressed = String.fromCharCode(event.which).toLowerCase();

    const hotKey = listeners[keyPressed];

    if ((event.ctrlKey || event.metaKey) && hotKey) {
      event.preventDefault();
      event.stopPropagation();

      hotKey();
    }
  };

  public render() {
    return null;
  }
}

export default HotKeyListener;
