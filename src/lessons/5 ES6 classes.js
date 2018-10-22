// CLASSES in ES6
// Classes are like a blueprints, to make new objects of the same class
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

// class ClassName
// Use Uppercase to name a Class (for opposite to function or var names)
class  Person {
    // constructor function, is called when we create a new object of a class:
    // constructor: function () {} // this is invalid inside classes definition.
    // we have to use ES6 meta definition syntax, like in Arrow Function:
    constructor(name='user', age=0) { //first argument correspond to first value we pass adding new Person('LM'=name)
        console.log(name);
        //this.name = name || 'user'; //OLD way to set a default value.
        // In ES6 we can pass default value in constructor(argument=default))
        this.name = name;
        this.age = age;
    } // we don't use coma, like in objects
    getGreeting() {
        // return 'Hi. I am ' + this.name + '!'; //ES5 way to make a string with values
        // we can create template string, using backticks/backquotes ``
        return `Hi. I am ${this.name}, ${this.age} old!`; //it's more readable
    }
    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`;
    }
}

//subclasses - have all feathers as main class + extended feathers, specific for this subclass
class Student extends Person { // student is a person, but have some other characteristics
    constructor(name, age, major = ''){ //we don't have to set default values used in parent class
        super(name, age); //take values from parent Class (super = parent class object)
        this.major = major;
    }
    hasMajor(){
        // '' empty value is falsy, string is truthy, undefined is falsy
        // !'' converts falsy value to its opposite = true
        // !!'' converts to true and to false again = false
        // !true = false, !'some string' = false
        return !!this.major;
    }
    getDescription(){ // we can just overwrite method from the parent class
        let description = super.getDescription(); // call method from parent class and save result in let variable
        if(this.major){
            // description = description + ' He is studying ' + this.major + '.';
            description += ` He is studying ${this.major}.`;
        }
        return description;
    }
}

class Traveler extends Person {
    constructor(name, age, homeLocation){
        super(name, age);
        this.homeLocation = homeLocation;
    }
    getGreeting(){
        let greeting = super.getGreeting();
        if(this.homeLocation){ // if() is called "control structure" (like for(), else(), while() :)
            greeting += ` I'm visiting from ${this.homeLocation}.`;
        }
        return greeting;
    }
}

// To make a new object of a class and save it in const me
const me = new Person('Lukasz Matuszewski', 35);
console.log(me.getGreeting());
console.log(me.getDescription());

const baloch = new Student('Michał Baloch', 23, 'Computer Science');
console.log(baloch.getGreeting());
console.log(baloch.getDescription());
console.log(baloch.hasMajor());

const american = new Traveler('Barrack Obama', 51, 'US');
console.log(american.getGreeting());
console.log(american.getDescription());

const other = new Student();
console.log(other.getGreeting());
console.log(other.getDescription());
console.log(other.hasMajor());



/*
You first need to declare your class and then access it, otherwise code like the following will throw a ReferenceError:

const p = new Rectangle(); // ReferenceError

class Rectangle { }
*/