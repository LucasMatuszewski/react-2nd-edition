console.log('App.js is running');

const app = {
    title: 'Counter App!!!',
    subtitle: 'Great app for counting',
    options: [
        'One',
        'Two'
    ]
};

/* EVENT in REACT
 * onClick is one of the events user can do and app can listen to.
 * */

 /* DATA BINDING
  * JSX don't have build in data binding.
  * When we change some value (count++), <h2>{count}</h2> will not change on a screen.
  * It's because we use ReactDOM.render on the and and we are rendering h2 with count==0.
  * So we have to re-render a site again on data changes.
  * */

let count = 0;
const someId = 'myId';
const addOne = () => {
    ++count;
    renderCounterApp(); // We call this function to re-render app to make data changes visible
};
const appRoot = document.getElementById('app');

/* To change data dynamically we have to re-render a website on data changes.
 * In future we will use components for this, but now we will use a simple function.
 * In this function we will add template and a ReactDOM.render.
 * We call this function every time we change a data */
const renderCounterApp = () => {
    const template = (
        <div>
            <h2>Count: {count}</h2>
            {/* Class == className in JSX (class return warning) */}
            {/* We can reference to function name in onClick or put function inside it like:
        onClick={() => console.log(count++)} */}
            <button id={someId} className="button" onClick={addOne}>+1</button>
            <button onClick={() => {
                --count;
                renderCounterApp();
            }}>-1</button>
            <button onClick={() => { count = 0; renderCounterApp(); }}>RESET</button>
            {/* List of React supported DOM Elements: https://reactjs.org/docs/dom-elements.html */}


            <h1>{app.title.toUpperCase()}</h1>
            {app.subtitle && <p>{app.subtitle}</p>} {/* if subtitle exist, show it in paragraph */}
            <p>User options: {(app.options && app.options.length > 0) ? app.options.toString() : 'No options'} </p>
            {/*
        array.length - returns (or sets) the number of elements in an array.
        array.toString() - return a string with elements separated with commas.
         */}

        </div>
    );

    ReactDOM.render(template, appRoot);
};

/* VIRTUAL DOM EFFICIENCY
 * Every time we call renderCounterApp() React is NOT rendering whole template.
 * It use virtual DOM, check witch elements have changed and re-render only changed element!
 * Thats why it's very efficient.
 *  */

renderCounterApp(); /* We call it to render initial state of App */