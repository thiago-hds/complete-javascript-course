const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => {
    if (age <= 2) return 2 * age;
    else return 16 + 4 * age;
  });

  const humanAgesAtLeast18 = humanAges.filter(age => age >= 18);

  const avgHumanAge =
    humanAgesAtLeast18.reduce((sum, age) => sum + age) /
    humanAgesAtLeast18.length;

  return avgHumanAge;
};

let res = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]); // (36+32+76+48+28)
console.log(res);
res = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(res);
