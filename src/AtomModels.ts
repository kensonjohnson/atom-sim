import { Rules } from "./EnvironmentConroller";

export type Atom = {
  xPosition: number;
  yPosition: number;
  xVelocity: number;
  yVelocity: number;
  color: string;
};

export type AtomGroup = {
  color: string;
  atoms: Atom[];
  rules: Rules;
};

function createAtom(color: string, width: number, height: number): Atom {
  return {
    xPosition: Math.random() * width,
    yPosition: Math.random() * height,
    xVelocity: 0,
    yVelocity: 0,
    color,
  };
}

export function createAtomGroup(
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
