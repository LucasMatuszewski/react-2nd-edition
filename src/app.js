/******************************************
 * REACT and REACT-DOM - INSTALL & IMPORT *
 ******************************************
 * Previously we had React and React-dom added in HTML <script /> as CDN links.
 * Now we will instal, import and bundle it with Webpack:
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

// IMPORT COMPONENTS:
// it's a good convention to import everything on beginning of an file.

// Move Class & Functions Components to separate files and import it as default:
import IndecisionApp from './components/IndecisionApp'; //we don't need to use '.js' - webpack will know it (like in express)
// the rest of components are imported inside Component files

import 'normalize.css/normalize.css'; //RESTART CSS.
// When we import without './' on the path beginning, app looks in node_modules for module

// Import CSS file to let Webpack CSS-loader to add <styles> tag in html:
import './styles/styles.scss'; // We use './' to import files (without it we import modules)
// why it was not working in webpack? ERROR ON BUILD:
// Module not found: Error: Can't resolve
// POSSIBLE SOLUTION:
// 1) Path on my computer was too long, with spaces and explanation marks
// 2) Google Drive was syncing this folder.
// I moved to new folder with short path and without google drive:
// C:\Users\Samsung\Udemy\react-2nd-indecision
///////////////////////////////////////////////////

// we could also send some data as props to main component, e.g. options:
ReactDOM.render(<IndecisionApp options={['option 1', 'option 2']} />, document.getElementById('app'));


/***********************************************************************
 * SCSS - CSS extension language / PREPROCESSOR / CSS Processing Tool *
 * *******************************************************************
 * SASS / SCSS = CSS with superpowers. Most popular, mature, stable and powerful.
 * 
 * 
 * TUTORIAL / BASICS:
 * https://marksheet.io/sass-scss-less.html
 * 
 * Sass has 2 syntaxes available:
 *      1. Sass itself (Syntactically Awesome StyleSheets) in .sass files
 *      2. SCSS (Sassy CSS) in .scss files, which is something halfway between regular CSS and Sass
 * The difference between Sass and SCSS is quite subtle:
 * https://sass-lang.com/documentation/file.SASS_REFERENCE.html#syntax
 * 
 * Remember that:
 *      * Sass is the name of the preprocessor
 *      * SCSS syntax is very similar to CSS
 *      * SCSS is easier to learn (but it’s easy to go to Sass if you know SCSS)
 *      * all resources on the internet (like https://thesassway.com/) mention Sass, not SCSS
 *      * all features are available for both syntaxes
 *      * everything in SCSS is available in Sass
 * We’re actually going to write SCSS but still call it Sass.
 * 
 * BENEFITS Sass provides us:
 *      * variables: instead of repeating #fce473 throughout your CSS file, just set $yellow: #fce473 once
 *      * nesting: CSS rules can be nested within each other
 *      * mixins: custom functions that can accept parameters and will prevent useless repetitions
 *      * extensions: an easy way to inherit the same properties of another selector
 *      * operators: adding/substracting/multiplying/dividing values, like 960px / 4 or $space * 2
 * 
 * DRY principle (Don’t repeat yourself)
 * Everything about Sass is to provide tools to prevent repeating yourself in your code:
 *      * variables prevents repeating values
 *      * nesting prevents repeating selectors
 *      * mixins and extensions prevent repeating properties
 * 
 * 
 * ************************
 * SETTING UP WebPack:   *
 * **********************
 * 
 * 1. install loaders:
 * https://www.npmjs.com/package/css-loader
 * https://www.npmjs.com/package/style-loader (adds CSS to the DOM by injecting a <style> tag)
 * 
 * npm install css-loader style-loader sass-loader node-sass --save-dev
 * 
 * 2. sett Webpack to compile SCSS to CSS. In webpack.config.js:
 * module: {
 *      rules: [{
 *          test: /\.scss$/ //use to all .scss files
 *          test: /\.(s*)css$/ //use to all .scss and .css files (regExp = (s*) is optional)
 *          test: /\.s?css$/ //this form also works :)
 *          use: [ // chain of loaders (chained in reverse order)
 *              'style-loader', //converts the css into inline stylesheets tag <style>
 *              'css-loader', //loads up the css files
 *              'sass-loader' //converts scss files to css files
 *          ]
 *      }]
 * }
 * 
 * 3. In main app.js add: import './styles/styles.scss';
 * 4. in terminal: npm run dev-server to compile scss to css and to load it to bundle.js
 * 
 * 
 */



/*****************************************************
 * SPA + SEO = SSR (Server Side Rendering)
 * Tutorial: https://blog.digitalkwarts.com/server-side-rendering-with-reactjs-react-router-v4-react-helmet-and-css-modules/
 ******************************************************/


/******************************************
 * POPULARITY OF FRONT-END TECHNOLOGIES: *
 * **************************************
 * Google Trends averages 2017/2018: SASS = 65%, SCSS = 51%, LESS = 35%
 * 
 * Ashley Nolan - Front-End Tooling Survey 2018vs2017vs2015 (5254 developers in a pool!!!):
 * CSS Preprocessors: Sass/SCSS 65% (use it, +1,8% vs2017), PostCSS 8,8% (+1%), Less 6,4% (-4%), Stylus 2% (-1%)... 14% = NO Preprocesor => 86% Devs use some preprocessors
 * CSS Frameworks: Bootstrap (35% use it), none (33%), Custom Framework (15%), Foundation (4%), Materialize (2,6%), Bulma (2,6%), Semantic UI (2%), PureCSS (0,6%), other (5%)
 * CSS NAMING SCHEMES (49% know it, +4%), CSS Linting (50% use it, +4%), JS transpiling ES6>ES5 (77% do it, +16%)
 * CSS Tools: Autoprefixer (49% know it, +2%), Modernizr (28%, -4%), Stylelint (18%, +8% !!!), Susy (nd, 5,5% in 2016)
 * CSS Methodologies: BEM namespacing (39% know it, +6%), CSS-in-JS (20%, +9% !!! in 2016: CSS Modules), Atomic Design (12%, +2%), Object Oriented CSS (9%, -3%), SMACSS (8%, -2%), ITCSS (5,4%, +1%), SUIT CSS (2,3%, -0,2%)
 * CSS Features: Flexbox (68% use it), CSS Custom Properties (19%), CSS Grid (18%)
 * JS Libraries (know): jQuery (80% know it, -7% vs2016), Lodash (38%, +1%), Underscore (29%, -8%)
 * JS Libraries (frequently use): jQuery (50% use it, -20%), Lodash (34%, +2), Underscore (7,8%, -7)
 * JS Frameworks (know): React (41%, +13% vs2016), Angular 1 (22%, -6), Angular 2+ (13%, +7), Vue.js (17%, +12%), Backbone (8,8%, -5%), Ember (7%, +1), Preact (4,6%), Knockout (3,8%, -2), MeteorJS (2%, -0,7), Aurelia (1%, -2), Polymer (1,7%, -0,3)
 * JS Frameworks (frequently use): React (48%, +11%), Vue.js (23%, 14% !!!), Angular 2+ (14%, +5%), Angular 1 (10%, -15%), Ember (6%, +0,2), Backbone (2,4%, -4%), ..., Meteor (1,4%, -1%)
 * Essential to majority of projects: React (29%, +11%), none (21%), jQuery (19%, -13), Vue.js (10%, +7%), Angular 2+ (5,9%, +3)
 * JS TASK RUNNERS: NPM Scripts (48%, +22%2016, +23%2015 new & EASY!), GULP (30% know it, -14% vs2016), Grunt (6%, -6%2016, -16%2015), GUI App (1%, e.g. Codekit), Don't use any (11%)
 * JS Module Bundlers: Webpack (66%, +24%2016, +31%2015), none (20%, -12%), Browserify (3,7%, -7%2016, -6%2015), RequireJS (2,41%, -5%2016, -6%2015)
 * JS Linters: ESLint (61% use it, +20%), none (15%, -8), TSLint (10%), JSLint (7%, -12%), JSHint (4%, -10%), StandardJS (1,6%)
 * JS TESTING: none (43%, -4%), Jest (22%, +19%2016, +3%2015), Mocha (14%, -8%2016, +7%2015), Jasmine (10%, -6%, +0,5), QUnit (4,3%, +0,4), Enzyme (1,9%), Ava (1,2%), Tape (1%)
 * JS Extensions: TypeScript (22%, +9%),  Flow (5%), Elm (1%), ClojureScript (0,4%)
 * JS Package Manager (primary use): NPM (63%), Yarn (31%), none (6%)
 * Other Tools (know): NPM (85%, +5%), Yarn (46%, +33%), Bower (28%, -14%), Babel (45%, +7%), Prettier (24%), Yeoman (9%, -4%)
 * https://ashleynolan.co.uk/blog/frontend-tooling-survey-2018-results
 * https://ashleynolan.co.uk/blog/frontend-tooling-survey-2016-results
 */




/*******************
 * CHILDREN PROPS *
 ******************
 * How to pass JSX or CHILDREN to component and use it inside component:
 * 
 * 1. First Method - JSX saved in value, and passed to props:
 * const footer = (
 *      <div>
 *          <p>Footer text</p>
 *      </div>
 * );
 * const Layout = (props) => {
        return(
            <div>
                <p>text</p>
                {props.footer}
            </div>
        );
    };
 * -----
 * <Layout footer={footer} />
 * 
 * 
 * 2. Second Method - pass JSX inside open and closing tag of Component (like in HTML).
 * It is a CHILDREN PROP.
 * const Layout = (props) => {
        return(
            <div>
                <p>text</p>
                {props.children} //DEFAULT NAME
            </div>
        );
    };
 * ------
 * <Layout>
 *      <div>
 *          <p>Footer text</p>
 *      </div>
 * </Layout>
 * 
 * We can use children prompt also inside ReactDOM:
 * ReactDOM.render((
 *   <Layout>
 *      <div>
 *          <p>Footer text</p>
 *      </div>
 *   </Layout>
 * ), document.getElementById('app'));
 * 
 */

/***************************************
 * THIRD-PARTY Components / Libraries *
 *************************************
 * DON'T REPEAT OTHERS !!!
 * Before writhing own functionality, search if somebody created similar yet. You can use it for free!
 * 
 * 1. Installing React-modal - Accessible modal dialog component (something like pop-up)
 * > npm install react-modal
 * 
 * 2. create new file for new Component with Modal code: OptionModal.js
 * 
 * 3. in file OptionModal import React-Modal:
 * import Modal from 'react-modal';
 * 
 * 4. Thats it. More instructions how to use a third-party components are usually on their NPM website
 * 
 */




//////////////////////////
// PLUGIN: babel-plugin-transform-class-properties
////////////////////////
// Ads new, easier syntax for defining Statefull Class Components, without constructor()
// 1. npm install babel-plugin-transform-class-properties -D
// 2. add to .babelrc new array "plugins": [ "transform-class-properties" ]

// OLD SYNTAX FOR CLASS
class OldSyntax {
    constructor() {
        this.name = 'Mike';
        this.getGreeting = this.getGreeting.bind(this); // we have to .bind(this)
    }
    getGreeting() {
        return `Hi. My name is ${this.name}.`; //  ` != '
    }
}
const oldSyntax = new OldSyntax();
const getGreeting = oldSyntax.getGreeting;
console.log(oldSyntax);
console.log(getGreeting()); //error, name undefined, unless we .bind(this) in constructor

// NEW SYNTAX FOR CLASS

class NewSyntax {
    name = 'Jen'; //without constructor() function
    getGreeting = () => { // without .bind(this) and with arrow function.
        return `Hi. My name is ${this.name}.`; //  ` != '
    }
}
const newSyntax = new NewSyntax();
const newGetGreeting = newSyntax.getGreeting;
console.log(newSyntax);
console.log(newGetGreeting()); // Works the same :)

// This new syntax don't work inside render() or Lifecycle Methods.
// So we can use it only directly inside a Class, to remove constructor() and binding.





/**
 * PROGRESSIVE WEB APPLICATION: Service Workers
 * Google promotes PWA apps, which works similar to native mobile apps.
 * With webpack we can easily add Workbox (google project) to our app.
 * Our app will use Service Workers to keep functioning while offline (like native mobile apps)!!!
 * https://webpack.js.org/guides/progressive-web-application/
 * https://developers.google.com/web/tools/workbox/guides/service-worker-checklist
 * https://developers.google.com/web/tools/workbox/guides/codelabs/webpack
 * 
 * https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-3-offline-support-and-network-resilience-c84db889162c
 * 
 * WEBPAGE OPTIMIZATION for GOOGLE SEO with PWA:
 * https://scotch.io/tutorials/how-to-make-your-existing-react-app-progressive-in-10-minutes
 * 
 * Normally when we stop a server (or lost Internet) application is no longer available.
 * 
 * ****** ADD WORKBOX ******
 * 1. npm install workbox-webpack-plugin --save-dev
 * 
 * 2. in webpack.config.js add:
 * > const WorkboxPlugin = require('workbox-webpack-plugin');
 * OR ES6 version:
 * > import WorkboxPlugin from 'workbox-webpack-plugin';
 * 
 * 3. in webpack.config.js on plugins: [] add:
 * new WorkboxPlugin.GenerateSW({
 *      // these options encourage the ServiceWorkers to get in there fast
 *      // and not allow any straggling "old" SWs to hang around
 *      clientsClaim: true,
 *      skipWaiting: true
 * })
 * 
 * 4. npm run build
 * Will generate 2 extra files: sw.js and precache-manifest.xxxxxx.js
 * 
 * 5. Register our service worker inside app.js:
 * if ('serviceWorker' in navigator) {
 *   window.addEventListener('load', () => {
 *     navigator.serviceWorker.register('/sw.js').then(registration => {
 *       console.log('SW registered: ', registration);
 *     }).catch(registrationError => {
 *       console.log('SW registration failed: ', registrationError);
 *     });
 *   });
 * }
 * 
 * 6. npm run build
 * 
 * 7. npm run serve (to start a server) - refresh app
 * 
 * 8. stop a server -> app will keep working served by Service Worker :)
 */


/* if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
} 
*/


//Changed from: /sw.js to: ./service-worker.js
//Error stopped, in console: SW Registered.
//on localhost:8080 in console: 
// workbox Welcome to Workbox!
// workbox Precaching is responding to: /bundle.js

//BUT... After stopped a server, website is unavailable...
// I tried Live-server and other servers - the same problem.
