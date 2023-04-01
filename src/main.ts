import "./style.css";
import { DisplayController } from "./DisplayController";
import { EnvironmentConroller } from "./EnvironmentConroller";

// ---------------- Globals ---------------- //
let CANVAS_WIDTH = window.innerWidth - 300;
let CANVAS_HEIGHT = window.innerHeight - 80;

// ---------------- Canvas ---------------- //
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

window.addEventListener("resize", () => {
  CANVAS_WIDTH = window.innerWidth - 300;
  CANVAS_HEIGHT = window.innerHeight - 80;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  displayController.width = CANVAS_WIDTH;
  displayController.height = CANVAS_HEIGHT;
  environmentConroller.width = CANVAS_WIDTH;
  environmentConroller.height = CANVAS_HEIGHT;
});

// Fills the entire canvas with a specified color

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

environmentConroller.start();
displayController.start();
