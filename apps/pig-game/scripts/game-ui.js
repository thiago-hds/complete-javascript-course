class GameUI {
  constructor() {
    this.selectUIElements();
  }

  selectUIElements() {
    this.btnNewGame = document.querySelector('.btn--new');
    this.btnRollDice = document.querySelector('.btn--roll');
    this.btnHold = document.querySelector('.btn--hold');

    this.secPlayer1 = document.querySelector('.player--0');
    this.secPlayer2 = document.querySelector('.player--1');

    this.lblTotalScorePlayer1 = document.querySelector('#score--0');
    this.lblTotalScorePlayer2 = document.querySelector('#score--1');
    this.lblCurrentScorePlayer1 = document.querySelector('#current--0');
    this.lblCurrentScorePlayer2 = document.querySelector('#current--1');

    this.imgDice = document.querySelector('.dice');
  }

  activatePlayer1() {
    this.secPlayer1.classList.add('player--active');
    this.secPlayer2.classList.remove('player--active');
  }
  activatePlayer2() {
    this.secPlayer1.classList.remove('player--active');
    this.secPlayer2.classList.add('player--active');
  }

  showDiceFace(face) {
    if (parseInt(face) < 1 || parseInt(face) > 6) {
      throw new Error('Invalid dice face!');
    }

    this.imgDice.src = `dice-${face}.png`;
  }

  addNewGameActionHandler(handler) {
    // TODO remover validação duplicada
    if (typeof handler !== 'function')
      throw new Error('Invalid type: expected a function');

    this.btnNewGame.addEventListener('click', handler);
  }
  addRollDiceActionHandler(handler) {
    if (typeof handler !== 'function')
      throw new Error('Invalid type: expected a function');

    this.btnRollDice.addEventListener('click', handler);
  }
  addHoldActionHandler(handler) {
    if (typeof handler !== 'function')
      throw new Error('Invalid type: expected a function');

    this.btnHold.addEventListener('click', handler);
  }

  showTotalScorePlayer1(score) {
    this.lblTotalScorePlayer1.textContent = score;
  }
  showTotalScorePlayer2(score) {
    this.lblTotalScorePlayer2.textContent = score;
  }
  showCurrentScorePlayer1(score) {
    this.lblCurrentScorePlayer1.textContent = score;
  }
  showCurrentScorePlayer2(score) {
    this.lblCurrentScorePlayer2.textContent = score;
  }
}

export { GameUI };
