const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopy = [...dogsJulia];
  dogsJuliaCopy.splice(0, 1);
  dogsJuliaCopy.splice(-2);

  const allDogs = dogsJuliaCopy.concat(dogsKate);
  console.log(allDogs);
  allDogs.forEach((dogAge, i) => {
    if (dogAge >= 3) {
      console.log(
        `Dog number ${i + 1} is an adult, and is ${dogAge} years old`
      );
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]); // 5,2,4,1,15,8,3
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]); // 16, 6, 10, 5, 6, 1, 4
