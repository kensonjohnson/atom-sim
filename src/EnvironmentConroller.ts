import { AtomGroup } from "./AtomModels";

export interface Rules {
  yellow: number;
  red: number;
  green: number;
  blue: number;
}

// CANVAS_WIDTH,
// CANVAS_HEIGHT,
// ATOM_EFFECT_RADIUS,
// VELOCITY_BRAKE,
// GRAVITY_WELL

export class EnvironmentConroller {
  private allAtomGroups: AtomGroup[];
  width: number;
  height: number;
  atomEffectRadius: number;
  velocityBrake: number;
  gravityForce: number;
  updatesPerSecond: number;
  intervalTimerReference: number | null;
  nextActionDelay: number;
  constructor(
    allAtomGroups: AtomGroup[],
    width: number,
    height: number,
    atomEffectRadius: number,
    velocityBrake: number,
    gravityForce: number,
    updatesPerSecond: number
  ) {
    console.log(width, height);
    this.allAtomGroups = allAtomGroups;
    this.width = width;
    this.height = height;
    this.atomEffectRadius = atomEffectRadius;
    this.velocityBrake = velocityBrake;
    this.gravityForce = gravityForce;
    this.updatesPerSecond = updatesPerSecond;
    this.intervalTimerReference = null;
    this.nextActionDelay = 1000 / updatesPerSecond;
  }

  start() {
    this.intervalTimerReference = setInterval(() => {
      this.updateAtomTargetPositions();
    }, this.nextActionDelay);
  }

  private updateAtomTargetPositions() {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    for (const baseGroup of this.allAtomGroups) {
      for (const oppositeGroup of this.allAtomGroups) {
        const attractionForce =
          baseGroup.rules[oppositeGroup.color as keyof Rules];
        for (const baseAtom of baseGroup.atoms) {
          let forceOfX = 0;
          let forceOfY = 0;
          let forceOfGravityX = 0;
          let forceOfGravityY = 0;
          for (const opposingAtom of oppositeGroup.atoms) {
            const deltaOfX = baseAtom.xPosition - opposingAtom.xPosition;
            const deltaOfY = baseAtom.yPosition - opposingAtom.yPosition;
            const deltaToCenterX = baseAtom.xPosition - centerX;
            const deltaToCenterY = baseAtom.yPosition - centerY;
            const distance = Math.sqrt(
              deltaOfX * deltaOfX + deltaOfY * deltaOfY
            );
            if (distance && distance < this.atomEffectRadius) {
              const force = attractionForce * (1 / distance);
              forceOfX -= force * deltaOfX;
              forceOfY -= force * deltaOfY;
            }
            // const gravityForce = gravityWell * (1 / distanceToCenter);
            forceOfGravityX -= this.gravityForce * deltaToCenterX;
            forceOfGravityY -= this.gravityForce * deltaToCenterY;
          }
          baseAtom.xVelocity =
            (baseAtom.xVelocity + forceOfX + forceOfGravityX) *
            this.velocityBrake;

          baseAtom.yVelocity =
            (baseAtom.yVelocity + forceOfY + forceOfGravityY) *
            this.velocityBrake;

          // This reverses an atom's direction when it hits a wall
          if (baseAtom.xPosition < 0 && baseAtom.xVelocity < 0) {
            baseAtom.xVelocity *= -1;
          }
          if (baseAtom.xPosition > this.width && baseAtom.xVelocity > 0) {
            baseAtom.xVelocity *= -1;
          }
          if (baseAtom.yPosition < 0 && baseAtom.xVelocity < 0) {
            baseAtom.yVelocity *= -1;
          }
          if (baseAtom.yPosition > this.height && baseAtom.yVelocity > 0) {
            baseAtom.yVelocity *= -1;
          }
          baseAtom.xPosition += baseAtom.xVelocity;
          baseAtom.yPosition += baseAtom.yVelocity;
        }
      }
    }
  }
}

// Generates a float value between -1.0 to 1.0
export function randomFloat() {
  return Math.random() * 2 - 1;
}
