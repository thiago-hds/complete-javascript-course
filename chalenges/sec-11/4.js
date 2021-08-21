const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1: calculate recommended food portion for each dog
dogs.forEach(dog => {
  dog.recFoodPortion = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

// 2: check whether sarah's dog is eating too much or too little

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

if (dogSarah.curFood > dogSarah.recFoodPortion) {
  console.log("Sarah's dog is eating too much");
} else {
  console.log("Sarah's dog is eating too little");
}

// 3 : create array with owners of dogs who eat too much and eat too little
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFoodPortion)
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFoodPortion)
  .flatMap(dog => dog.owners);

console.log('ownersEatTooMuch:', ownersEatTooMuch);
console.log('ownersEatTooLittle:', ownersEatTooLittle);

// 4:
const strOwnersEatTooMuch = ownersEatTooMuch.join(' and ');
const strOwnersEatTooLittle = ownersEatTooLittle.join(' and ');
console.log(`${strOwnersEatTooMuch}'s dogs eat too much!`);
console.log(`${strOwnersEatTooLittle}'s dogs eat too little!`);

// 5
const hasDogEatingExactRecAmount = dogs.some(
  dog => dog.curFood === dog.recFoodPortion
);
console.log('hasDogEatingExactRecAmount', hasDogEatingExactRecAmount);

// 6
const isDogEatingOkayAmount = dog =>
  dog.curFood > 0.9 * dog.recFoodPortion &&
  dog.curFood < 1.1 * dog.recFoodPortion;

const hasDogEatingOkayAmount = dogs.some(isDogEatingOkayAmount);
console.log('hasDogEatingOkayAmount', hasDogEatingOkayAmount);

// 7
const dogsEatingOkayAmount = dogs.filter(isDogEatingOkayAmount);
console.log('dogsEatingOkayAmount', dogsEatingOkayAmount);

// 8
const dogsSortedByRecFoodPortion = dogs
  .slice()
  .sort((d1, d2) => d1.recFoodPortion - d2.recFoodPortion);
console.log('dogsSortedByRecFoodPortion', dogsSortedByRecFoodPortion);
