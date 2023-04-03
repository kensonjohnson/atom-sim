import { Atom } from "./AtomModels";

export class DisplayController {
  targetFrameRate: number;
  totalFramesRendered: number;
  averageFrameRate: number;
  isPlaying: boolean;
  time: number | null;
  lastFrame: number;
  frame: number;
  delay: number;
  timerReference: number | null;
  canvasContext: CanvasRenderingContext2D;
  width: number;
  height: number;
  atomsArray: Atom[];
  atomSize: number;

  constructor(
    canvasContext: CanvasRenderingContext2D,
    atomsArray: Atom[],
    width: number,
    height: number,
    fps: number = 24,
    atomSize: number = 5
  ) {
    this.targetFrameRate = fps;
    this.totalFramesRendered = 0;
    this.averageFrameRate = 0;
    this.isPlaying = false;
    this.time = null;
    this.lastFrame = -1;
    this.frame = 0;
    this.delay = 1000 / fps;
    this.timerReference = null;
    this.canvasContext = canvasContext;
    this.width = width;
    this.height = height;
    this.atomsArray = atomsArray;
    this.atomSize = atomSize;
  }

  changeFrameRate(newTargetFrameRate: number) {
    this.targetFrameRate = newTargetFrameRate;
    this.delay = 1000 / newTargetFrameRate;
    this.lastFrame = -1;
    this.frame = 0;
    this.totalFramesRendered = 0;
    this.averageFrameRate = 0;
    this.time = null;
  }

  updateDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  start() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.timerReference = requestAnimationFrame((timestamp) => {
        this.updateScreen(timestamp);
      });
    }
  }

  stop() {
    if (this.isPlaying) {
      cancelAnimationFrame(this.timerReference as number);
      this.isPlaying = false;
      this.lastFrame = -1;
      this.frame = 0;
      this.totalFramesRendered = 0;
      this.averageFrameRate = 0;
      this.time = null;
    }
  }

  reset() {}

  private renderAtom(atom: Atom) {
    this.canvasContext.beginPath();
    this.canvasContext.arc(
      atom.xPosition,
      atom.yPosition,
      this.atomSize / 2,
      0,
      2 * Math.PI,
      false
    );
    this.canvasContext.fillStyle = atom.color; // set the background color of the atom
    this.canvasContext.fill();
  }

  private updateScreen(timestamp: number) {
    if (!this.time) {
      this.time = timestamp;
    }
    const timeDelta = timestamp - this.time;
    this.frame = Math.floor(timeDelta / this.delay);
    if (this.frame > this.lastFrame) {
      this.totalFramesRendered++;
      this.averageFrameRate = this.totalFramesRendered / (timeDelta / 1000);
      this.lastFrame = this.frame;
      this.canvasContext.clearRect(0, 0, this.width, this.height);
      for (const atom of this.atomsArray) {
        this.renderAtom(atom);
      }
    }
    this.timerReference = requestAnimationFrame((timestamp) => {
      this.updateScreen(timestamp);
    });
  }
}
