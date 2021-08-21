const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log('Accelerating...', `New speed is ${this.speed}`);
};

Car.prototype.break = function () {
  this.speed -= 5;
  console.log('Breaking...', `New speed is ${this.speed}`);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car1.accelerate();
car1.break();

car2.break();
car2.break();
car2.accelerate();

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.#charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;

  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const electricCar = new EV('Tesla', 120, 23);
electricCar.accelerate();
electricCar.chargeBattery(90);
electricCar.accelerate();
