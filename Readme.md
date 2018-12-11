# React-Sketch-Drawing-App

A sketch drawing application built in Typescript using React and a custom shapes library.

## Instructions

This assignment is written in TypeScript. You will first need to install the necessary dependencies with `npm install`, then run `npm test` to run the test suites.

```
npm install         # Install the project dependencies
npm run test        # This will run the Jest test suite. Press "q" to quit.
npm start           # Open a web browser and visit http://localhost:3000 to view the application
```

## Improvements

Modularity, Abstraction, Encapsulation:

- Reduce memory usage across app (for example by saving less state in each command)
  - Remove Template Pattern from DrawingCommand to reduce memory usage
    - Previously the entire state was saved and replaced using a template method within DrawingCommand.
      To prevent excessive memory usage, the template pattern was removed and each specialization of
      DrawingCommand now saves the minimum required data to undo/redo the command.
  - Cache images using flyweights to prevent excessive memory usage from multiple images
- Replace extraneous methods to change color during render with option to pass temporary opacity to Shape.draw method.
- Separate large DrawingCanvas component into multiple components: UI and Stateful
  - Create DrawingPanel component to manage state for DrawingCanvas UI component

Significant Features:

- Allow changing a shapes color through the ActionPanel
  - Add color to Shape specification to allow for displaying/saving colors
- Add single shape selection tool to ToolPanel (CursorTool)
  - Add `contains(point: Point)` method to Shape specification to allow for single shape selection

New Design Patterns:

- Implement Flyweight pattern to cache images to save memory when using the same image
  - Add `imageFlyweights` map to DrawingState to manage shared image data.
- Implement Command pattern on all actions within ActionPanel and all actions that should be undo-able.
  - Make Color action into a undoable command
