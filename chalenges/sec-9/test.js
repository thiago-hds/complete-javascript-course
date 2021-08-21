const greet = greeting => {
  return name => {
    console.log(`${greeting} ${name}`);
  };
};
greet('Oi')('Mundo');

function addSpecificRate(rate) {
  return function addTax(value) {
    return value + value * rate;
  };
}
const addVat = addSpecificRate(0.23);
console.log(addVat(100));
