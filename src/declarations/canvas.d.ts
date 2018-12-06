declare var Canvas: {
  prototype: Canvas;
  new (width: number, height: number): Canvas;
  constructor(width: number, height: number): Canvas;
};

interface Canvas {
  getContext(contextId: string): CanvasRenderingContext2D;
  toBuffer(): Buffer;
}

declare module "canvas" {
  export var createCanvas: (width: number, height: number) => Canvas;
}
