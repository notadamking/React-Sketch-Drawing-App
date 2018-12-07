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

- Reduce memory usage across app (for example by saving less state in each command) \*\*
- Make Color action into a undoable command \*\*
- Remove Template Pattern on DrawingCommand to reduce memory usage \*\*
- Add color to serialization of Shape \*\*
- Move temporary opacity to Shape.draw method, to avoid extraneous methods to change color \*\*
- Reduce the size of DrawingState and DrawingCanvas \*\*
- Create Canvas component and move render methods out of DrawingCanvas \*\*
- Implement caching of images to save memory on using the same image
