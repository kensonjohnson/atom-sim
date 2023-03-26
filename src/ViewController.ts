import { Atom, AtomGroup } from "./AtomModels";
import { applyRule, Rules } from "./EnvironmentConroller";

function renderRectangle(
  context: CanvasRenderingContext2D,
  color: string,
  width: number,
  height: number
) {
  context.fillStyle = color; // set the background color of the rectangle
  context.fillRect(0, 0, width, height); // position 0,0 and globally set width and height
}

function renderAtom(
  context: CanvasRenderingContext2D,
  xPosition: number,
  yPosition: number,
  color: string,
  size: number
) {
  context.beginPath();
  context.arc(xPosition, yPosition, size / 2, 0, 2 * Math.PI, false);
  context.fillStyle = color; // set the background color of the atom
  context.fill();
}

export function updateScreen(
  canvasContext: CanvasRenderingContext2D,
  atomsArray: Atom[],
  atomGroups: AtomGroup[],
  width: number,
  height: number,
  atomSize: number,
  atomEffectRadius: number,
  velocityBrake: number,
  gravityWell: number
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
        velocityBrake,
        gravityWell
      );
    }
  }
  canvasContext.clearRect(0, 0, width, height);
  renderRectangle(canvasContext, "black", width, height);
  for (const atom of atomsArray) {
    renderAtom(
      canvasContext,
      atom.xPosition,
      atom.yPosition,
      atom.color,
      atomSize
    );
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
      velocityBrake,
      gravityWell
    );
  });
}
