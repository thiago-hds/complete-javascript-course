/*
Coding Challenge #1
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall.
*/

// const [markMass, markHeight] = [78, 1.69];
// const [johnMass, johnHeight] = [92, 1.95];
const [markMass, markHeight] = [95, 1.88];
const [johnMass, johnHeight] = [85, 1.76];

const calcBMI = (mass, height) => mass / height ** 2;

const markHigherBMI = calcBMI(markMass, markHeight) > calcBMI(johnMass, johnHeight);

console.log("Is Mark's MBI higher than John's? ", markHigherBMI);