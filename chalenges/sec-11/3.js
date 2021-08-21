const calcAverageHumanAge = ages => {
  const avgHumanAge = ages
    .map(age => (age <= 2 ? 2 * age : 16 + 4 * age))
    .filter(age => age >= 18)
    .reduce((sum, age, i, arr) => sum + age / arr.length, 0);

  return avgHumanAge;
};

let res = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]); // (36+32+76+48+28)
console.log(res);
res = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(res);
