////////////////////////////////
// ES6 importing / exporting
//////////////////////////////

// import './utils.js'; //simple import, without getting exported values/functions etc.

// to use some functions etc from imported file we have to import it with this functions:
import { square, add } from './utils.js'; //we can import only one thing, even if this file exports many
// order is not important.

/////////////////////////////
// SERVER-SIDE / ES5 usage:
// var square = require('square')
//////////////////////////


console.log('app.js is running and is watched by webpack!!!');

// use function form utils.js:
console.log('square:', square(4)); //won't work without exporting this function from utils.js
//by default functions/values etc. have local scope only inside this file. We have to export them to other files.

console.log('add:', add(4, 4));

//NAMED EXPORT/IMPORT:
import { isAdult, canDrink } from './person.js';

const age = 20;
console.log('isAdult:', isAdult(age));
console.log('canDrink:', canDrink(age));

//DEFAULT EXPORT/IMPORT:
import subtract from './utils.js';

//We can also use one import for all:
// import subtract, {square, add} from './utils.js';

console.log('subtract:', subtract(100, 10));

// important! We can import default exports with any name we want, it will always work as default.
// import subtractxxx from {./utils.js};
// console.log(subtractxxx(100,80));
// both would work no mater what name we use in app.js

// DEFAULT EXPORT COULD BE DONE WITHOUT A NAME, e.g.:
// export default (a, b) => a-b;

import isSenior from './person.js';
console.log('isSenior:', isSenior(65));



//////////////////////////
// IMPORT NPM MODULES:
////////////////////////

// 1. npm install <moduleName> (locally)
// eg. npm install validator

// 2. import in ES6:
import validator from 'validator'; // without './' = module

// Server-side / ES5 usage:
// var validator = require('validator');

// if we don't use './' on a beginning of name, webpack will assume it is a module.
// Webpack search for modules inside 'node_modules/' folder by default.

console.log('isEmail:', validator.isEmail('foo@bar.pl'));

// Webpack will automatically bundle whole code of "validator" module to a bundle.js file
// it was 6,12kb without it, and is 101kb with validator.
// But its less then manually usage ot this module. And we will minify it in a future :)

// if we would comment // import validator form 'validator'
// webpack will automatically remove whole code of validator form bundle.js !!! :)


/******************************************
 * REACT and REACT-DOM - INSTALL & IMPORT *
 ******************************************
 * Previously we had React and React-dom added in HTML <script /> TAG as CDN links.
 * React and ReactDOM ware available as global variables. But we deleted Script Tag from index.html
 * Now we have to instal, import and bundle it with Webpack:
 * 1. install it locally by typing in a console: 
 * > npm i react@16.0.0 react-dom@16.0.0
 * 
 * 2. import it with ES6:
 * > import React from 'react'
 * > import ReactDOM from 'react-dom'
 * 
 * with ES5 (e.g. on server-side) it would be:
 * var React = require('react');
 * var ReactDOM = require('react-dom');
 * 
 * After bundling the bundle.js file have 933kB... because it install Development Tools by default (env = development).
 * We have to set env = production, and minify / uglify this file (uglify will remove all React Dev Tools )
 */

import React from 'react';
import ReactDOM from 'react-dom';

// const template = <p>Hello React</p>; // JSX
// it will trow an ERROR by default - we didn't compile this JSX / ES6 code to ES5 with BABEL !!!
// ES6 is supported by most of nowadays browsers, but JSX is NOT!

//for now we can use ES5 code for React:
//var template = React.createElement('p', {}, 'Hello React');


/////////////////////////
// WEBPACK with BABEL //
///////////////////////

// We have to configure Webpack to bundle using LOADER (e.g. Babel).
// 1. npm install babel-core babel-loader -D
//      babel-core is for tools like Webpack
//      babel-cli is for command line usage
//      babel-loader is a plugin, will tell webpack how to use babel
// 2. in webpack.config.js we have to configure a LOADER.

// LOADER, e.g. to convert from ES6/JSX to ES5 (with BABEL) or from SCSS to CSS.
// we configure it inside webpack.config.js as rules in object module: {} for module.export = {}
// we set test: to use babel only on .js files with regular expression:
// test: /\.js$/
// we exclude babel to not compile /node_modules/ folder.

// Webpack will not use BABEL with script from package.json (like it is for BABEL-CLI).
// We have to create a new file: .babelrc in root directory, and fill it with basic configuration:
// { "presets": ["env", "react"] }

// from now when we use in terminal our script from package.json:
// > npm run build
// it will start: webpack --watch and automatically use Babel to compile files.

// With Babel configured for Webpack we can use JSX again:
const template = <p>Hello React. This is JSX from Webpack compiled by Babel</p>; // JSX

ReactDOM.render(template, document.getElementById('app'));

