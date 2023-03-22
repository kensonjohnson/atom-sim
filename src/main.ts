import "./style.css";

// ---------------- Types ---------------- //
type Atom = {
  xPosition: number;
  yPosition: number;
  xVelocity: number;
  yVelocity: number;
  color: string;
};

type AtomGroup = {
  color: string;
  atoms: Atom[];
  rules: Rules;
};

interface Rules {
  yellow: number;
  red: number;
  green: number;
  blue: number;
}

// ---------------- Globals ---------------- //
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;
const NUMBER_OF_ATOMS = 700;
const ATOM_SIZE = 3;
const ATOM_EFFECT_RADIUS = 230; // the distance an atom can apply its rules to other atoms
const VELOCITY_BRAKE = 0.7; // Determines how quickly the atoms accelerate

// ---------------- Rules ---------------- //

const YELLOW_RULES = { yellow: 0.1, red: -0.1, green: 0.2, blue: -0.003 };
const RED_RULES = { yellow: 0.1, red: 0.05, green: 0.5, blue: -0.0015 };
const GREEN_RULES = { yellow: -0.2, red: 0.2, green: 0.35, blue: -0.0015 };
const BLUE_RULES = {
  yellow: 0.0005,
  red: 0.0005,
  green: 0.0005,
  blue: -0.001,
};

// ---------------- Canvas ---------------- //
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

// Fills the entire canvas with a specified color
function renderRectangle(color: string, width: number, height: number) {
  context.fillStyle = color; // set the background color of the rectangle
  context.fillRect(0, 0, width, height); // position 0,0 and globally set width and height
}

function renderAtom(
  xPosition: number,
  yPosition: number,
  color: string,
  size: number
) {
  context.fillStyle = color; // set the background color of the atom
  context.fillRect(xPosition, yPosition, size, size); // position 0,0 and globally set width and height
}

function createAtom(color: string, width: number, height: number): Atom {
  return {
    xPosition: Math.random() * width,
    yPosition: Math.random() * height,
    xVelocity: 0,
    yVelocity: 0,
    color,
  };
}

function createAtomGroup(
  number: number,
  width: number,
  height: number,
  color: string,
  rules: Rules
) {
  const atoms: Atom[] = [];
  for (let i = 0; i < number; i++) {
    const atom: Atom = createAtom(color, width, height);
    atoms.push(atom);
  }

  return { color, atoms, rules };
}

function updateScreen(
  canvasContext: CanvasRenderingContext2D,
  atomsArray: Atom[],
  atomGroups: AtomGroup[],
  width: number,
  height: number,
  atomSize: number,
  atomEffectRadius: number,
  velocityBrake: number
) {
  for (const baseGroup of atomGroups) {
    for (const oppositeGroup of atomGroups) {
      applyRule(
        baseGroup.atoms,
        oppositeGroup.atoms,
        baseGroup.rules[oppositeGroup.color as keyof Rules],
        width,
        height,
        atomEffectRadius,
        velocityBrake
      );
    }
  }
  canvasContext.clearRect(0, 0, width, height);
  renderRectangle("black", width, height);
  for (const atom of atomsArray) {
    renderAtom(atom.xPosition, atom.yPosition, atom.color, atomSize);
  }
  requestAnimationFrame(() => {
    updateScreen(
      canvasContext,
      atomsArray,
      atomGroups,
      width,
      height,
      atomSize,
      atomEffectRadius,
      velocityBrake
    );
  });
}

function applyRule(
  atomGroup1: Atom[],
  atomGroup2: Atom[],
  attractionConstant: number,
  width: number,
  height: number,
  effectRadius: number,
  velocityBrake: number
) {
  for (const baseAtom of atomGroup1) {
    let forceOfX = 0;
    let forceOfY = 0;
    for (const opposingAtom of atomGroup2) {
      const deltaOfX = baseAtom.xPosition - opposingAtom.xPosition;
      const deltaOfY = baseAtom.yPosition - opposingAtom.yPosition;
      const distance = Math.sqrt(deltaOfX * deltaOfX + deltaOfY * deltaOfY);
      if (distance && distance < effectRadius) {
        const force = attractionConstant * (1 / distance);
        forceOfX -= force * deltaOfX;
        forceOfY -= force * deltaOfY;
      }
    }
    baseAtom.xVelocity = (baseAtom.xVelocity + forceOfX) * velocityBrake;
    baseAtom.xPosition += baseAtom.xVelocity;
    baseAtom.yVelocity = (baseAtom.yVelocity + forceOfY) * velocityBrake;
    baseAtom.yPosition += baseAtom.yVelocity;

    // This reverses an atom's direction when it hits a wall
    if (baseAtom.xPosition < 0 || baseAtom.xPosition > width) {
      baseAtom.xVelocity *= -1;
    }
    if (baseAtom.yPosition < 0 || baseAtom.yPosition > height) {
      baseAtom.yVelocity *= -1;
    }
  }
}

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
  1200,
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
  VELOCITY_BRAKE
);
