import { Atom } from "./AtomModels";

export interface Rules {
  yellow: number;
  red: number;
  green: number;
  blue: number;
}

export function applyRule(
  atomGroup1: Atom[],
  atomGroup2: Atom[],
  attractionForce: number,
  width: number,
  height: number,
  effectRadius: number,
  velocityBrake: number,
  gravityWell: number
) {
  const centerX = width / 2;
  const centerY = height / 2;
  for (const baseAtom of atomGroup1) {
    let forceOfX = 0;
    let forceOfY = 0;
    let forceOfGravityX = 0;
    let forceOfGravityY = 0;
    for (const opposingAtom of atomGroup2) {
      const deltaOfX = baseAtom.xPosition - opposingAtom.xPosition;
      const deltaOfY = baseAtom.yPosition - opposingAtom.yPosition;
      const deltaToCenterX = baseAtom.xPosition - centerX;
      const deltaToCenterY = baseAtom.yPosition - centerY;
      const distance = Math.sqrt(deltaOfX * deltaOfX + deltaOfY * deltaOfY);
      const distanceToCenter = Math.sqrt(
        deltaToCenterX * deltaToCenterX + deltaToCenterY * deltaToCenterY
      );
      if (distance && distance < effectRadius) {
        const force = attractionForce * (1 / distance);
        forceOfX -= force * deltaOfX;
        forceOfY -= force * deltaOfY;
      }
      const gravityForce = gravityWell * (1 / distanceToCenter);
      forceOfGravityX -= gravityForce * deltaToCenterX;
      forceOfGravityY -= gravityForce * deltaToCenterY;
    }
    baseAtom.xVelocity =
      (baseAtom.xVelocity + forceOfX + forceOfGravityX) * velocityBrake;
    baseAtom.xPosition += baseAtom.xVelocity;
    baseAtom.yVelocity =
      (baseAtom.yVelocity + forceOfY + forceOfGravityY) * velocityBrake;
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
