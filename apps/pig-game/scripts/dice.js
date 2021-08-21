class Dice {
  constructor() {
    this.face = null;
  }

  roll() {
    this.face = Math.floor(Math.random() * 6) + 1;
  }
}

export { Dice };
