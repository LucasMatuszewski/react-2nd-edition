const path = require('path');
// const WorkboxPlugin = require('workbox-webpack-plugin'); //Progressive Web Application

module.exports = {
    entry: './src/app.js',
    /*  plugins: [
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast 
            // and not allow any straggling "old" SWs to hang around
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [{
                urlPattern: new RegExp('http://localhost:8080/'),
                handler: 'staleWhileRevalidate'
            }]
        })
    ], */
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};

// we can run this file in console to get path:
// console.log(path.resolve(__dirname, 'public'));
// > node webpack.config.js

//////////////
// LOADER ///
////////////
// e.g. to convert from ES6/JSX to ES5 (with BABEL) or from SCSS to CSS.
// we configure it as rules in object module: {} for module.export = {}
// we set test: to use babel only on .js files with regular expression:
// test: /\.js$/
// we exclude babel to not compile /node_modules/ folder.

// Webpack will not use BABEL with script from package.json (like it is for BABEL-CLI).
// We have to create a new file: .babelrc in root directory, and fill it with basic configuration:
// { "presets": ["env", "react"] }

////////////////////////////
// DEV-TOOLS: SOURCE MAP //
//////////////////////////
// https://webpack.js.org/configuration/devtool/#devtool
// we will use: cheap-module-eval-source-map
// In Chrome DevTools Console source-map shows us links to src/ files not public/ files
// (on the right from errors / messages)
// Without source-map links leads to bundle.js (its very hard to read and debug)


/////////////////////////
// WEBPACK-DEV-SERVER //
///////////////////////
// https://webpack.js.org/configuration/dev-server/
// Works quite similar to live-server but have many extra options useful for webpack.
// 1. npm i webpack-dev-server@2.5.1
// 2. in webpack.config.js add in module.exports = {
//         devServer: { contentBase: path.resolve(__dirname, 'public') }
// }
// 3. in package.json add in scripts: { "dev-server": "webpack-dev-server" }
// 4. in terminal type: npm run dev-server
//
// IMPORTANT:
// Dev-server is watching a files in /srs folder and build them when changed.
// so we don't need to use 2 processes in 2 terminals. Only one Dev-server for all.
//
// Webpack-Dev-Server is serving bundle.js from memory, don't save a physical file in /public/
// It make it faster. If we need physical file use: npm run build

// ERROR:
// Webpack-Dev-Server don't work for me inside this project...
// I'v reinstalled all node_modules, checked typos etc. Didn't helped. I don't know why...
//
// I get following error after typing in console: npm run dev-server
//
// ERROR in multi(webpack) - dev - server / client ? http ://localhost:8080 ./src/app.js
// Module not found: Error: Can't resolve 'Web Development - Courses\Udemy - React 2nd edition\indecision - app\node_modules\webpack - dev - server\client\index.js ? http ://localhost:8080' in 'C:\Users\Samsung\Documents\!Web Development - Courses\Udemy - React 2nd edition\indecision-app'
// @multi(webpack) -dev - server / client ? http ://localhost:8080 ./src/app.js
// webpack: Failed to compile.