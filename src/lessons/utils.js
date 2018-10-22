console.log('utils.js is running!!!');

const square = (x) => x * x;


// exports types:

// NAMED EXPORTS:

export { square }; //this is NOT an OBJECT definition! We dont use pairs name : "value"
// we export only a name of value/function/object etc we want to export.

// we can export directly without {}:
export const add = (a, b) => a + b;


// DEFAULT EXPORTS:

const subtract = (a, b) => a - b;

export { subtract as default };

// we can also use one export:
// export {square, add, subtract = default};

// important! We can import default exports with any name we want, it will always work as default.
// import subtractxxx from {./utils.js};
// console.log(subtractxxx(100,80));
//both would work no mater what name we use in app.js

// DEFAULT EXPORT COULD BE DONE WITHOUT A NAME, e.g.:
// export default (a, b) => a-b;