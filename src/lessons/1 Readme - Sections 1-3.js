console.log("App.js is running");

// JSX - JavaScript XML - extension of JS to work with XML templates (templating language like EJS)
var template = <div><h1 class="new">This is JSX from app.js - Change12 <span>2</span></h1><p>Some text</p></div>;
// we will use ES6 to replace "var" but now we use "var" for quick demo.
// in JSX we don't use "" to make a string "<p>...</p>"
// BUT... we get error. Chrome don't understand JSX! We have to use Babel to transform it from ES6/ES7 to "normal" JS format (ES5).
// http://babeljs.io/repl

// ES6/7 is for better development, but we still have to convert it to ES5 for browsers to understand it (like with SCSS, webpack convert it to CSS)
// Babel convert var template to:
//  var template = React.createElement(
//       "h1",
//       null,
//       "This is JSX from app.js"
//  );

    // OR if <p> have a class <p class="new">
    // var template = React.createElement(
    //     "h1",
    //     { "class": "new" },
    //     "This is JSX from app.js"
    // );

// to install Babel global: npm i -g babel-cli@6.24.1 (to have the same version like in course) <-- Yarn don't works for me...
// Next install babel presets with dependancies for React and Env (but NOT global, only for this project):
// npm i babel-preset-react@6.24.1 babel-preset-env@1.5.2

// FOLDERS:
// /src --> for JSX / ES6 files for development
// /public/scripts --> for JS files compiled by Babel from ES6 to ES5.

// To use Babel to convert ES6/7 to ES5 we use in terminal:
// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
// babel SourceFileURL --out-file=TargetFileURL --presets=choose witch you want to use --watch=convert automaticaly on saving changes
// we have to open it in one console window and live it operating. In second console window open "live-server public" and live it.
// Now, every time we save changes to "src/app.js" it is automaticaly converted to "public/scripts/app.js" and browser is refreshed.


// If we want to use few seperate tags we have to wrapp it in an enclosing tag e.g. <div><h1></h1><p></p></div>. This is a wrapper div, root element of a component.
// This: <h1></h1><p></p> won't work.

// WE can use variables:
var userName = 'Lukasz';
var userAge = 34;
// We can use objects:
var user = {
    name: 'Lukasz',
    age: 35,
    location: 'Lodz'
};

// We can use brakelines/enters to make html more readable. To make it more clear we use brackets () wich are not nessesery, but helps to undersand the code:
var templateTwo = (
    <div> {/* We can't use HTML comments like <!-- --> but we can use JS comments in braceles (they wont be visable in rendered HTML) */}
        <h1>{userName.toUpperCase() + '!'}</h1> {/* <-- We can use methods/functions like toUpperCase() on our variables iside a template */}
        <p>{userAge} lat</p> {/* <-- To use variables we write brancelets with var name {varName} */}
        <p>{user.location}</p> {/* <-- We can use objects */}
        <ul>
            <li>List 1</li>
            <li>List 2</li>
        </ul>
    </div>
);

var appRoot = document.getElementById('app'); //element form index.html file witch is our component

// ReactDOM.render(template, appRoot);
ReactDOM.render(templateTwo, appRoot);