import { Player } from './player.js';
import { Dice } from './dice.js';
import { GameUI } from './game-ui.js';

class Game {
  constructor() {
    this.dice = new Dice();

    this.player1 = new Player();
    this.player2 = new Player();

    this.initGameUI();
    this.startGame();
  }

  initGameUI() {
    this.gameUI = new GameUI();

    this.gameUI.addNewGameActionHandler(this.startGame.bind(this));
    this.gameUI.addRollDiceActionHandler(this.rollDice.bind(this));
    this.gameUI.addHoldActionHandler(this.hold.bind(this));
  }

  startGame() {
    this.player1.resetScores();
    this.player2.resetScores();
    this.currentPlayer = this.player1;
    this.gameUI.showCurrentScorePlayer1(this.player1.currentScore);
    this.gameUI.showCurrentScorePlayer2(this.player2.currentScore);
    this.gameUI.showTotalScorePlayer1(this.player1.totalScore);
    this.gameUI.showTotalScorePlayer2(this.player2.totalScore);
    this.gameUI.activatePlayer1();
  }

  rollDice() {
    this.dice.roll();
    this.gameUI.showDiceFace(this.dice.face);
    if (this.dice.face === 1) {
      this.changeCurrentPlayer();
    } else {
      const points = this.dice.face;
      this.currentPlayer.addToCurrentScore(points);
      if (this.currentPlayer === this.player1) {
        this.gameUI.showCurrentScorePlayer1(this.currentPlayer.currentScore);
      } else {
        this.gameUI.showCurrentScorePlayer2(this.currentPlayer.currentScore);
      }
    }
  }

  changeCurrentPlayer() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
      this.gameUI.activatePlayer2();
    } else {
      this.currentPlayer = this.player1;
      this.gameUI.activatePlayer1();
    }
  }

  hold() {
    this.currentPlayer.addCurrentScoreToTotalScore();
    if (this.currentPlayer === this.player1) {
      this.gameUI.showCurrentScorePlayer1(this.currentPlayer.totalScore);
    } else {
      this.gameUI.showCurrentScorePlayer2(this.currentPlayer.totalScore);
    }
    if (this.currentPlayer.totalScore < 100) {
      this.changeCurrentPlayer();
    } else {
      alert('venceu');
    }
  }
}
export { Game };
