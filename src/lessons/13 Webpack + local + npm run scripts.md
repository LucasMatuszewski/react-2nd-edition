# WEBPACK

Webpack is a "module bundler", an CLI tool, to automate work:
1. making bundles from many our files/modules, and putting them to one fille
2. minify/uglify our files to make it lower
3. take control over dependencies and communication between our modules and packages
4. run Babel (convert ES6 / React JSX to JS) for us
5. have build in Dev-Server instead of live-server (even better)
6. preprocess TypeScript to JS, images to Base64 etc.
7. have many plugins to do even more!

It is far more popular and have much more to offer then GULP and GRUNT (it works with GULP if needed)
(NPM weekly downloads: Webpack 2,3 mln. Gulp 0,5 mln. Grunt 0,3 mln)


## Installing global vs local dependencies

It's better to install dependencies locally, because:
1. Other developers will see witch tools we used for development in package.json devDependencies
2. We can use different versions of tools (like Babel) for different projects, to keep code compatible for other developers on this specific project
3. Project is more portable, don't depend on a local environment you are working in.
4. We can use short commands on a terminal (shortcuts defined locally, with local paths) instead of using entire command when tool is used globally:
    babel "src/app.js" --out-file=public/scripts/app.js --presets=env,react --watch

> npm i -g package-name = globally
> npm i package-name = locally (default)
> npm i package-name -D = as devDependencies (are not installed on production environment)


## NPM RUN - scripts

To use Babel locally we have to add scripts to package.json to define how we want to use it:
>   "scripts": {
>     "serve": "live-server public/",
>     "build-babel": "babel src/app.js --out-file=public/scripts/app.js --pressets=env,react --watch"
>   },

We won't use "babel" or "live-script" in command line any more. We have shortcuts :)
To use script we type in command:
> npm run <scriptName>
> npm run serve
> npm run build

More about Babel-CLI: https://babeljs.io/docs/en/babel-cli/


## Installing & configuring Webpack
https://webpack.js.org/guides/installation/
https://webpack.js.org/guides/getting-started

We install it also locally for a project, in devDep, the same version as on a Udemy course:
> npm i webpack@3.1.0 -D

we have to add script:
> "build": "webpack --config webpack.config.js --watch",
(we can skip "--config webpack.config.js" because it is default - but sometimes we need many configurations in a project)
--watch = like in Babel - it will run automatically on file changes 

By default webpack do nothing. We have to tell what we want inside a file: webpack.config.js
It is a node.js file, we can make own scripts here. Critical information (2 must have):
1. Entry folder - where to start, mine file
2. output folder - path and filename

we put it inside an object module.exports:
> const path = require('path');
> module.exports = {
>    entry: './src/app.js',
>    output: {
>        filename: 'bundle.js',
>        path: path.resolve(__dirname, 'public')
>    }
> };

**__dirname** - provide us a path to current location of a file.
We can use this on different computers, and it will use a path dynamically from a machine.

**path.resolve** - Node method for path manipulation. We can use also path.join()
https://nodejs.org/docs/latest/api/path.html

result should be an absolute path to our "public" folder:
C:\Users\Samsung\Documents\!Web Development - Courses\Udemy - React 2nd edition\indecision-app\public

to **run webpack** we need to start a script from package.json by typing in console:
> npm run build

and we get a result:
> Hash: 69352f971617da97892d
> Version: webpack 3.1.0
> Time: 234ms
>     Asset     Size  Chunks             Chunk Names
> bundle.js  2.51 kB       0  [emitted]  main
>    [0] ./src/app.js 37 bytes {0} [built]

we get new file:
> public/bundle.js

Now we don't need files from Babel any more, so we can delete:
- /scripts folder
- /scripts/app.js
- /scripts/app.js.map

We should also change index.html file:
1. delete 'React' and 'React-DOM' links do CDNs with this scripts (now Webpack see this dependencies in package.json and will automatically bundle it in bundle.js file)
2. change link to an app script from "scripts/app.js" (babel file) to "/bundle.js" (webpack file)

### importing other files in app.js
to make Webpack bundle and --watch other files we have to import them in main file app.js:
> import './fileName.js';
now webpack watch changes in imported file too.

But app.js can't use e.g. functions from imported file by default. We have to export them.
They have local scope inside a file.

in fileName.js
> export { name };

in app.js we have to use more complex import method:
> import { name } from './fileName.js';



## PROGRESSIVE WEB APPLICATION: Service Workers
Google promotes PWA apps, which works similar to native mobile apps.
With webpack we can easily add Workbox (google project) to our app.
Our app will use Service Workers to keep functioning while offline (like native mobile apps)!!!
https://webpack.js.org/guides/progressive-web-application/

Normally when we stop a server (or lost Internet) application is no longer available.

**ADD WORKBOX**
1. npm install workbox-webpack-plugin --save-dev

2. in webpack.config.js add:
> const WorkboxPlugin = require('workbox-webpack-plugin');
OR ES6 version:
> import WorkboxPlugin from 'workbox-webpack-plugin';

3. in webpack.config.js on plugins: [] add:
new WorkboxPlugin.GenerateSW({
     // these options encourage the ServiceWorkers to get in there fast
     // and not allow any straggling "old" SWs to hang around
     clientsClaim: true,
     skipWaiting: true
})

4. npm run build
Will generate 2 extra files: sw.js and precache-manifest.xxxxxx.js

5. Register our service worker inside app.js:
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

6. npm run build

7. npm run serve (to start a server) - refresh app

8. stop a server -> app will keep working served by Service Worker :)
