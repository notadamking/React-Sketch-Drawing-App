import DrawingState from "src/state/DrawingState";

abstract class DrawingCommand {
  public abstract execute: (state: DrawingState) => void;
  public abstract undo: (state: DrawingState) => void;
}

export default DrawingCommand;
