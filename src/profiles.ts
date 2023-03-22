export const gravity = {
  CANVAS_WIDTH: 1000,
  CANVAS_HEIGHT: 1000,
  NUMBER_OF_ATOMS: 700,
  ATOM_SIZE: 8,
  ATOM_EFFECT_RADIUS: 200,
  VELOCITY_BRAKE: 0.8,
  YELLOW_RULES: { yellow: 0.1, red: 0.0001, green: 0.2, blue: -0.0002 },
  RED_RULES: { yellow: 0.0001, red: 0.1, green: 0.34, blue: -0.0002 },
  GREEN_RULES: { yellow: -0.34, red: 0.17, green: 0.32, blue: -0.0002 },
  BLUE_RULES: {
    yellow: 0.0005,
    red: 0.0002,
    green: 0.0002,
    blue: -0.001,
  },
};

export const redPlanet = {
  CANVAS_WIDTH: 1000,
  CANVAS_HEIGHT: 1000,
  NUMBER_OF_ATOMS: 700,
  ATOM_SIZE: 3,
  ATOM_EFFECT_RADIUS: 230,
  VELOCITY_BRAKE: 0.7,
  YELLOW_RULES: { yellow: 0.1, red: -0.1, green: 0.2, blue: -0.003 },
  RED_RULES: { yellow: 0.1, red: 0.05, green: 0.5, blue: -0.0015 },
  GREEN_RULES: { yellow: -0.2, red: 0.2, green: 0.35, blue: -0.0015 },
  BLUE_RULES: {
    yellow: 0.0005,
    red: 0.0005,
    green: 0.0005,
    blue: -0.001,
  },
};
