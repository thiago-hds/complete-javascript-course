'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-08T14:11:59.604Z',
    '2021-07-01T17:01:17.194Z',
    '2021-07-02T23:36:17.929Z',
    '2021-07-03T10:51:36.790Z',
  ],
  currency: 'BRL',
  locale: 'pt-BR', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2020-11-01T13:15:33.035Z',
    '2020-11-30T09:48:16.867Z',
    '2020-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2021-04-10T14:43:26.374Z',
    '2021-06-25T18:49:59.371Z',
    '2021-07-02T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const now = new Date();
  const daysPassed = calcDaysPassed(date, now);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = function (value, locale, currency) {
  const options = {
    style: 'currency',
    currency,
  };
  return new Intl.NumberFormat(locale, options).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const movDate = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(movDate, acc.locale);

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const options = {
      style: 'currency',
      currency: acc.currency,
    };
    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>`;
    console.log(mov);

    containerMovements.insertAdjacentHTML('afterBegin', html);
  });
};
displayMovements(account1);

const createUsernames = function (accounts) {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name.charAt(0))
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (account) {
  // display movements
  displayMovements(account);

  // display balance
  calcDisplayBalance(account);

  // display summary
  calcDisplaySummary(account);
};

const startLogoutTimer = function () {
  // set time to 5 minutes
  let time = 60 * 5;

  const tick = function () {
    // in each call, print the remaining time to UI
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    labelTimer.textContent = `${min}:${sec}`;
    // when 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);

      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    time--;
  };
  // call timer to every second
  const timer = setInterval(tick, 1000);
  return timer;
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = formatCurrency(
    account.balance,
    account.locale,
    account.currency
  );
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(
    incomes,
    account.locale,
    account.currency
  );

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    account.locale,
    account.currency
  );

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    account.locale,
    account.currency
  );
};
let currentAccount = null,
  timer = null;

// FAKE ALWAYS LOGIN
// currentAccount = account1;
// containerApp.style.opacity = 100;
// updateUI(currentAccount);

// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric',
//   year: 'numeric',
//   // weekday: 'long',
// };
// // const locale = navigator.language;
// // console.log(locale);
// labelDate.textContent = Intl.DateTimeFormat(
//   currentAccount.locale,
//   options
// ).format(now);

// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);

// labelDate.textContent = `${day}/${month}/${year} ${hour}:${min}`;

// Event Handlers

containerApp.addEventListener('click', function (e) {
  if (currentAccount) {
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // create current date and time
    const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year} ${hour}:${min}`;
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    labelDate.textContent = Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount.username !== currentAccount.username
  ) {
    setTimeout(() => {
      const now = new Date();
      currentAccount.movements.push(-amount);
      currentAccount.movementsDates.push(now.toISOString());
      receiverAccount.movements.push(amount);
      receiverAccount.movementsDates.push(now.toISOString());

      updateUI(currentAccount);
    }, 2500);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(val => val >= 0.1 * amount)) {
    setTimeout(() => {
      const now = new Date();
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(now.toISOString());

      updateUI(currentAccount);
    }, 2500);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount?.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const accountIndex = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(accountIndex);

    // delete account
    accounts.splice(accountIndex, 1);

    // hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
  console.log(accounts);
});

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);
console.log(deposits, withdrawals);

const balance = movements.reduce((acc, cur) => acc + cur);
console.log(balance);

// maximum value
const max = movements.reduce(
  (currMax, curr) => (curr > currMax ? curr : currMax),
  movements[0]
);
console.log(max);

// calcular total de depositos em todo o banco
const total = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => mov + acc);
console.log(`total of deposit is ${total}`);

// contar depositos com pelo menos 1000 dolares
const amountGreater1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000).length;

const amountGreater1000_v2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((total, mov) => (mov > 1000 ? total + 1 : total), 0);

console.log(
  `amount greater than 1000: ${amountGreater1000}`,
  amountGreater1000_v2
);

// criar um objeto que possui a soma de depositos e de saques
const result = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (obj, mov) => {
      obj[mov > 0 ? 'deposits' : 'withdrawals'] += Math.abs(mov);
      return obj;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(result);

// criar função para converter string para title case
// ex: this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};
console.log(convertTitleCase('thIs is a nice TITLE'));
console.log(convertTitleCase('AND this is a nice TITLE'));
