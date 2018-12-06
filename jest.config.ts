import "jest-canvas-mock";

if (typeof window.URL.createObjectURL === "undefined") {
  Object.defineProperty(window.URL, "createObjectURL", {
    value: () => {
      /* */
    }
  });
}
