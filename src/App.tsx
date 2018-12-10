import * as React from "react";
import { Provider } from "mobx-react";

import DrawingState from "./state/DrawingState";

import { SidePanel, DrawingPanel } from "./components";

import "./App.scss";

class App extends React.Component {
  public drawing = new DrawingState();

  public render() {
    return (
      <Provider drawing={this.drawing}>
        <div className="App__page">
          <SidePanel />
          <DrawingPanel />
        </div>
      </Provider>
    );
  }
}

export default App;
