const isAdult = (age) => age >= 18;
const canDrink = (age) => age >= 21;

// named export:
export {isAdult, canDrink};

// default export (without name):
export default (age) => age >= 65;