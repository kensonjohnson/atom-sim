import "./style.css";
import { DisplayController } from "./DisplayController";
import { EnvironmentConroller } from "./EnvironmentConroller";

// ---------------- Globals ---------------- //
let CANVAS_WIDTH = window.innerWidth - 300;
let CANVAS_HEIGHT = window.innerHeight - 80;

// ---------------- HTML Elements ---------------- //
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
const startButton = document.querySelector(
  "[data-start-button]"
) as HTMLButtonElement;
const stopButton = document.querySelector(
  "[data-stop-button]"
) as HTMLButtonElement;

// ---------------- Page Event Listeners ---------------- //

// on resize
window.addEventListener("resize", () => {
  CANVAS_WIDTH = window.innerWidth - 300;
  CANVAS_HEIGHT = window.innerHeight - 80;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  environmentConroller.updateDimensions(CANVAS_WIDTH, CANVAS_HEIGHT);
  displayController.updateDimensions(CANVAS_WIDTH, CANVAS_HEIGHT);
});

// start button pressed
startButton.onclick = () => {
  if (!displayController.isPlaying) {
    environmentConroller.start();
    displayController.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  }
};

// stop button pressed

stopButton.onclick = () => {
  if (displayController.isPlaying) {
    environmentConroller.stop();
    displayController.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
  }
};

// ---------------- Run Program ---------------- //

const environmentConroller = new EnvironmentConroller(
  CANVAS_WIDTH,
  CANVAS_HEIGHT
);

const displayController = new DisplayController(
  context,
  environmentConroller.getAtoms(),
  CANVAS_WIDTH,
  CANVAS_HEIGHT
);
