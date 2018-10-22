/********************************
 *  ES6 Aside: const and let ***
 ******************************
 * 
 * declaring variables with var statement is problematic. 
 * We can accidentally reassign new value for var: */
var nameVar = 'X';
nameVar = 'Y';
console.log('nameVar:', nameVar);
/* or forget that app already use this var name, and define new variable with the same name */
var nameVar = 'Z';
console.log('var nameVar:', nameVar);
/* Vanilla JS let us define duplicate variables without error.
 * Its really problematic and hard to debug.
 * 
 * In ES6 we can define variables using let: */

let nameLet = 'X'; /* Define new variable */
nameLet = 'Y'; /* reassign new value for existing variable (it is OK) */
//let nameLet = 'Z'; /* TypeError: Babel will not LET us to use Duplicate declaration */

/******
 * LET - don't allow us to redeclare variation, but let us to reassign value.
 * 
 * CONST - don't allow us neither to redeclare or reassign value.
 ******/
const nameConst = 'X';
// nameConst = 'Y'; //Error from Babel ("nameConst" is read-only) and ESlint (is constant)
// const nameConst = 'Z'; //Error from Babel and ESlint
console.log('namConst:', nameConst);

// To see JSX errors in VSCode use ESlint linting tool - it supports JSX (JShint doesn't) and ES6.

/**********************************
 * GOOD PRACTICE:
 * 1. Use "const" by default
 * 2. Change "const" to "let" if you need to change value
 * 3. Never use "var"
 */

/**********************************
 * TIP:
 * Using 4 SPACES for indentation (wcięcia) is better then using tab:
 * https://stackoverflow.blog/2017/06/15/developers-use-spaces-make-money-use-tabs/
 * https://www.quora.com/Why-would-a-coder-use-spaces-over-tabs
 * Editors/IDE automatically converts tabs to spaces.
 * Most popular is using 4 spaces, Google and Ruby prefers 2 spaces.
 **********************************/

/**********************************
 * TIP 2:
 * Using 'SINGLE QUOTES' for strings is more popular in JS then "double quotes":
 * https://bytearcher.com/articles/single-or-double-quotes-strings-javascript/
 * 
 * But double quotes may be better in some situations:
 * 1. JSON standard use "double quotes" only
 * 2. It's easier to use "I'm going to..." then 'I\'m going to...'
 * 3. Double quotes are more common in other languages like PHP, Java, C, Ruby.
 * https://stackoverflow.com/questions/242813/when-to-use-double-or-single-quotes-in-javascript
 */


/***************************************
 * BLOCK SCOPE of Var / Let / Const ***
 ************************************/
// var is local/function scope, if defined inside a function, we can use it only inside this function. It's undefined in global scope (outside a function)

// Let and Const are also function/local scope, but they have also BLOCK SCOPE (var don't)
// Block scope = if defined inside code blocks (like FOR LOOP) we can't use it outside this block:
var fullName = 'Lukasz Matuszewski';
let upperCaseName; // definition of empty variable, with global scope.
if(fullName){
    var firstName = fullName.split(' ')[0]; // global scope
    console.log('var firstName inside a code block:',firstName);
    const lastName = fullName.split(' ')[1]; // block scope
    console.log('const lastName inside a code block:',lastName);
    upperCaseName = fullName.toUpperCase();
    console.log('global defined let upperCaseName inside a code block:',upperCaseName);
}

console.log('var firstName outside a code block:',firstName); // defined, works
//console.log('const lastName outside a code block:',lastName); // undefined, ERROR
console.log('global defined let upperCaseName outside a code block:',upperCaseName); // defined, works because we have defined is globally outside a code block.




/**********************************
 *  ES6 Aside: Arrow Functions ***
 *******************************/

//////////////////////////////////
// Traditional JS (ES5) function definition:
/////////////////////////////////
// 1) with function name
// function square(x) {
// OR:
// 2) with variable / const:
const square = function (x) {
    return x*x;
}

/////////////////////////////////
// Arrow Function definition (in traditional/regular way, without Expression syntax):
const squareArrow = (x) => {
    return x*x;
};

console.log('Traditional Function:', square(5));
console.log('Arrow Function:', squareArrow(6));

// For traditional functions we can use functions name, like: function NAME(ARG){} or assign it to a variable

// All Arrow Functions are anonymous (don't have a name), so we have to assign them to var/const if we want to use it later.


//////////////////////////////////////////
// Arrow Functions NEW EXPRESSION SYNTAX (ES6):
const squareArrowExp = (x) => x*x; //thats it, without 'return'.

console.log('Arrow Expression Syntax:', squareArrowExp(10));

//Example:
const getFirstName = (fullName) => fullName.split(' ')[0];

console.log('getFirstName from Lukasz Matuszewski:', getFirstName('Lukasz Matuszewski'));


////////////////////////////////////////////
// ARGUMENT OBJECT
// no longer available in arrow functions

// ES5 anonymous function:
const add = function(a, b){ // 'a' and 'b' are arguments of our function
    console.log('arguments of ES5 function:', arguments); //we can use 'arguments' object inside a function
    return a+b;
};
console.log(add(55, 1, 1000)); // '1000' is not defined as a function argument, but...
// we have access to '1000' inside 'arguments' object, as 'arguments[2]'

// ES6 arrow function:
const addArrow = (a, b) => {
    // console.log('arguments of ES5 function:', arguments); //Error: 'arguments' object is not defined
    return a + b;
};
console.log(addArrow(55, 1, 1000));


////////////////////////////////////////////
// 'THIS' keyword
// no longer bound with arrow functions + new syntax for objects methods

// object with ES5 function using 'this' keyword:
const person = {
    name: 'Lukasz',
    cities: ['Lodz', 'Poznan', 'Warszawa'],
    printPlacesLived: function(){ //method
        console.log(this.name);
        console.log(this.cities);
        const that = this; //workaround of 'this' local scope to use it inside next function:
        this.cities.forEach(function(city) {
            // we can't use 'this' in this function, because 'this' scope is local:
            // console.log(this.name + ' has lived in ' + city); // Error: 'this' is undefined
            
            // but we can make a var/const equal to 'this' value, and use it as:
            console.log(that.name + ' has lived in ' + city);
        });
    }
};
person.printPlacesLived();


// new scope of 'this' keyword and new ES6 syntax for methods:
const person2 = {
    name: 'Beata',
    cities: ['Lowicz', 'Lodz', 'Dublin'],
    printPlacesLived2() { // <-- NEW SYNTAX FOR METHODS
        console.log(this.name); // 'this' is still available in local scope (like in ES5)
        console.log(this.cities);
        this.cities.forEach((city) => { // arrow function
            console.log(this.name + ' has lived in ' + city); // 'this' is now available here too!!!
        });
    }
};
person2.printPlacesLived2();

// NEW 'MAP' METHOD for arrays!
const person3 = {
    name: 'Hania',
    cities: ['Lodz', 'Marsaskala'],
    printPlacesLived3() {
        // 1) 'arrayName.map(function)' could be used in place of forEach():
        this.cities.map((city) => console.log(this.name + ' has lived in ' + city));
        // we used new expression syntax for above arrow function :)

        // 2) array.map() could be also used to transform array to a new array:
        const cities2array = this.cities.map((city) => this.name + ' likes ' + city);
        console.log('new array:',cities2array);
    }
};
person3.printPlacesLived3();


// Challenge with new method syntax and array.map() method:

const multiplier = {
    // numbers - array of numbers to multiply
    numbers: [1, 2, 3],
    // multiplyBy - single number to multiply numbers by
    multiplyBy: 2,
    // multiply - method, return a new array where the number have been multiplied
    multiply() {
        return this.numbers.map((number) => number * this.multiplyBy);
    }
};

console.log(multiplier.multiply());



// CHALLENGE: change all var to const bellow:
console.log('App.js is running');

const app = {
    title: 'Indecision App',
    subtitle: 'Great app for making decisions easier',
    options: [
        'One',
        'Two'
    ]
};
const user = {
    name: 'Lukasz',
    age: 35,
    location: 'Lodz'
};

// We can use if statements inside templates, but its better to use function to make template more clear (logic is outside a template)
function getLocation(location) {
    if(location) {
        return location;
    } else {
        return 'Unknown';
    }
}

// we can also show/hide whole paragraph if value is defined/undefined:
function getAge(age){
    if(age){
        return <p>Age: {age}</p>; //we don't need "quotation marks" here
    }
}

// or we can use TERNARY OPERATOR inside template (ternary = potrójny)

const template = (
    <div>
        <div>
            <h2>User: {user.name ? user.name : 'Anonymous'}</h2> {/* TERNARY OPERATOR */}

            <p>Location: {getLocation(user.location)}</p>
            {getAge(user.age)} {/* Show whole paragraph or display nothing at all if undefined */}
            
            {/* LOGICAL AND OPERATOR - check if user age is defined and if is equal minimum 18 */}
            { (user.age && user.age >= 18) && <p>This user is mature</p> } 
        </div>
        
        <h1>{app.title.toUpperCase()}</h1>
        {app.subtitle && <p>{app.subtitle}</p>} {/* if subtitle exist, show it in paragraph */}
        <p>User options: {(app.options && app.options.length >0) ? app.options.toString() : 'No options' } </p>
        {/*
        array.length - returns (or sets) the number of elements in an array.
        array.toString() - return a string with elements separated with commas.
         */}
    </div>
);

const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);