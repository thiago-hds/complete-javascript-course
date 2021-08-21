class Player {
  constructor() {
    this.resetScores();
  }

  addToCurrentScore(score) {
    this.currentScore += score;
  }

  addCurrentScoreToTotalScore() {
    this.totalScore += this.currentScore;
  }

  resetScores() {
    this.currentScore = 0;
    this.totalScore = 0;
  }
}

export { Player };
