const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
for (const [key, player] of game.scored.entries()) {
  console.log(`Goal ${key + 1}: ${player}`);
}

// 2
let avgOdd = 0;
const odds = Object.values(game.odds);
for (const odd of Object.values(odds)) {
  avgOdd += odd;
}
avgOdd /= odds.length;
console.log(`Average Odd: ${avgOdd}`);

// 3
for (const [oddName, oddValue] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${game[oddName] ? 'victory ' + game[oddName] : 'draw'}: ${oddValue}`
  );
}

// 4
const scorers = {};
for (const player of game.scored) {
  scorers[player] = scorers[player] ? scorers[player] + 1 : 1;
}
console.log(scorers);
