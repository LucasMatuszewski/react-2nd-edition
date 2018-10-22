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



// we could also send some data as props to main component, e.g. options:
ReactDOM.render(<IndecisionApp options={['option 1', 'option 2']} />, document.getElementById('app'));



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
