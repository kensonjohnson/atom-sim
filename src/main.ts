import "./style.css";
import { createAtomGroup, Atom } from "./AtomModels";
import { updateScreen } from "./ViewController";
import { randomFloat } from "./EnvironmentConroller";

// ---------------- Globals ---------------- //
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;
const NUMBER_OF_ATOMS = 500;
const ATOM_SIZE = 4;
const GRAVITY_WELL = 0.0000005; // Determine each atom's attraction to the center point
const ATOM_EFFECT_RADIUS = 300; // the distance an atom can apply its rules to other atoms
const VELOCITY_BRAKE = 0.55; // Determines how quickly the atoms accelerate, smaller is slower

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
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

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

updateScreen(
  context,
  atoms,
  atomGroups,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ATOM_SIZE,
  ATOM_EFFECT_RADIUS,
  VELOCITY_BRAKE,
  GRAVITY_WELL
);
