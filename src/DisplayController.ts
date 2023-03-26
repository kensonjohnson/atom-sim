import { Atom, AtomGroup } from "./AtomModels";

export class DisplayController {
  fps: number;
  updatesPerSecond: number;
  isPlaying: boolean;
  time: number | null;
  lastFrame: number;
  frame: number;
  delay: number;
  tref: number | null;
  canvasContext: CanvasRenderingContext2D;
  width: number;
  height: number;
  atomsArray: Atom[];
  atomGroups: AtomGroup[];
  atomSize: number;

  constructor(
    fps: number = 5,
    updatesPerSecond: number,
    canvasContext: CanvasRenderingContext2D,
    atomsArray: Atom[],
    atomGroups: AtomGroup[],
    width: number,
    height: number,
    atomSize: number
  ) {
    this.fps = fps;
    this.updatesPerSecond = updatesPerSecond;
    this.isPlaying = false;
    this.time = null;
    this.lastFrame = -1;
    this.frame = 0;
    this.delay = 1000 / fps;
    this.tref = null;
    this.canvasContext = canvasContext;
    this.width = width;
    this.height = height;
    this.atomsArray = atomsArray;
    this.atomGroups = atomGroups;
    this.atomSize = atomSize;
  }

  changeFrameRate(newFrameRate: number) {
    this.fps = newFrameRate;
    this.delay = 1000 / newFrameRate;
    this.lastFrame = -1;
    this.time = null;
  }

  start() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.tref = requestAnimationFrame((timestamp) => {
        this.updateScreen(timestamp);
      });
    }
  }
  pause() {
    if (this.isPlaying) {
      cancelAnimationFrame(this.tref as number);
      this.isPlaying = false;
      this.time = null;
      this.lastFrame = -1;
    }
  }

  private renderAtom(atom: Atom) {
    this.canvasContext.beginPath();
    this.canvasContext.arc(
      atom.visualXPosition,
      atom.visualYPosition,
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
    this.frame = Math.floor((timestamp - this.time) / this.delay);
    if (this.frame > this.lastFrame) {
      this.lastFrame = this.frame;
      this.canvasContext.clearRect(0, 0, this.width, this.height);
      for (const atom of this.atomsArray) {
        this.renderAtom(atom);
      }
    }
    this.tref = requestAnimationFrame((timestamp) => {
      this.updateScreen(timestamp);
    });
  }
}

// function renderRectangle(
//   context: CanvasRenderingContext2D,
//   color: string,
//   width: number,
//   height: number
// ) {
//   context.fillStyle = color; // set the background color of the rectangle
//   context.fillRect(0, 0, width, height); // position 0,0 and globally set width and height
// }
