import "./style.css";
import { createAtomGroup, Atom } from "./AtomModels";
import { DisplayController } from "./DisplayController";
import { randomFloat, EnvironmentConroller } from "./EnvironmentConroller";

// ---------------- Globals ---------------- //
let CANVAS_WIDTH = window.innerWidth - 300;
let CANVAS_HEIGHT = window.innerHeight - 80;
let UPDATES_PER_SECOND = 25;
let FRAME_RATE = 30;
const NUMBER_OF_ATOMS = 600;
const ATOM_SIZE = 5;
const GRAVITY_WELL = 0.00002; // Determine each atom's attraction to the center point
const ATOM_EFFECT_RADIUS = 300; // the distance an atom can apply its rules to other atoms
const VELOCITY_BRAKE = 0.05; // Determines how quickly the atoms accelerate, smaller is slower

// ---------------- Rules ---------------- //

const YELLOW_RULES = {
  yellow: randomFloat(),
  red: randomFloat(),
  green: randomFloat(),
  blue: randomFloat(),
};
const RED_RULES = {
  yellow: randomFloat(),
  red: randomFloat(),
  green: randomFloat(),
  blue: randomFloat(),
};
const GREEN_RULES = {
  yellow: randomFloat(),
  red: randomFloat(),
  green: randomFloat(),
  blue: randomFloat(),
};
const BLUE_RULES = {
  yellow: randomFloat(),
  red: randomFloat(),
  green: randomFloat(),
  blue: randomFloat(),
};

// ---------------- Canvas ---------------- //
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
console.log(CANVAS_WIDTH, CANVAS_HEIGHT);
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

window.addEventListener("resize", () => {
  CANVAS_WIDTH = window.innerWidth - 300;
  CANVAS_HEIGHT = window.innerHeight - 80;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
});

// Fills the entire canvas with a specified color

// ---------------- Run Program ---------------- //

const yellowGroup = createAtomGroup(
  NUMBER_OF_ATOMS,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  "yellow",
  YELLOW_RULES
);
const redGroup = createAtomGroup(
  NUMBER_OF_ATOMS,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  "red",
  RED_RULES
);
const greenGroup = createAtomGroup(
  NUMBER_OF_ATOMS,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  "green",
  GREEN_RULES
);
const blueGroup = createAtomGroup(
  NUMBER_OF_ATOMS,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  "blue",
  BLUE_RULES
);
const atomGroups = [yellowGroup, redGroup, greenGroup, blueGroup];
const atoms: Atom[] = [
  ...yellowGroup.atoms,
  ...redGroup.atoms,
  ...greenGroup.atoms,
  ...blueGroup.atoms,
];

// let timer = setInterval(() => {
//   for (const baseGroup of atomGroups) {
//     for (const oppositeGroup of atomGroups) {
//       applyRule(
//         baseGroup.atoms,
//         oppositeGroup.atoms,
//         baseGroup.rules[oppositeGroup.color as keyof Rules],
//         CANVAS_WIDTH,
//         CANVAS_HEIGHT,
//         ATOM_EFFECT_RADIUS,
//         VELOCITY_BRAKE,
//         GRAVITY_WELL
//       );
//     }
//   }
// }, 1000 / UPDATES_PER_SECOND);

const environmentConroller = new EnvironmentConroller(
  atomGroups,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ATOM_EFFECT_RADIUS,
  VELOCITY_BRAKE,
  GRAVITY_WELL,
  UPDATES_PER_SECOND
);

const displayController = new DisplayController(
  FRAME_RATE,
  context,
  atoms,
  atomGroups,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ATOM_SIZE
);

environmentConroller.start();
displayController.start();

// updateScreen(
//   context,
//   atoms,
//   atomGroups,
//   CANVAS_WIDTH,
//   CANVAS_HEIGHT,
//   ATOM_SIZE,
//   UPDATES_PER_SECOND
// );
