console.log('App.js is running');

const app = {
    title: 'Indecision App',
    subtitle: 'Great app for making decisions easier! :)',
    options: []
};

/* EVENT in REACT (event handler = obsługa zdarzeń / "treser" zdarzeń. Handle = obsługiwać, operować)
 * onClick is listening "clicks", one type of the events user can do.
 * List of SyntheticEvents in React: https://reactjs.org/docs/events.html
 * How to handle events with React elements: https://reactjs.org/docs/handling-events.html
 * */

 /* DATA BINDING
  * JSX don't have build in data binding.
  * When we change some value (count++), <h2>{count}</h2> will not change on a screen.
  * It's because we use ReactDOM.render on the and and we are rendering h2 with count==0.
  * So we have to re-render a site again when same data changes.
  * */

const onFormSubmit = (e) => { // "e" contains "event object" with whole data about an event
    e.preventDefault(); // this is to prevent default submit function sending a form on button click
    const option = e.target.elements.option.value; // save a value from element <input name="option">
    
    if(option) { //if option is empty it will be false
        app.options.push(option); //add a new option to array Options from app object.
        e.target.elements.option.value = ''; //to clear input in a form
        renderApp(); // re-render only if input is not empty!!! (it's more efficient!!!)
    }
};

const onRemoveOptions = () => {
    app.options = [];
    renderApp();
};

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    // 1. generate random number (between 0,000000000 - 1,00000000)
    // 2. multiply it by number of options (eg. for 3 options: 0,0021 * 3 = 0,0063)
    // 3. round it to integers (whole numbers) with Math.floor method
    const option = app.options[randomNum]
    alert(option);
};

const appRoot = document.getElementById('app');

let key = 0; //key for list of options

/* To change data dynamically we have to re-render a website on data changes.
 * In future we will use components for this, but now we will use a simple function.
 * In this function we will add template and a ReactDOM.render.
 * We call this function every time we change a data and want to re-render*/
const renderApp = () => {
    const template = (
        <div>
            <h1>{app.title.toUpperCase()}</h1>
            {app.subtitle && <p>{app.subtitle}</p>} {/* if subtitle exist, show it in paragraph */}
            <p>{(app.options && app.options.length > 0) ? 'Your options:' : 'Add your options below:'} </p>
            
            {/* JSX doesn't support objects
                JSX ignores: booleans, null, undefined
                JSX supports: arrays, strings, numbers */
                // [99, 98, 97, 'mike smith', null, undefined, true]

                // JS treat numbers and string in an array as separate values:
                // {99}{98}{97}{'mike smith'} //and ignore the rest
                // result in HTML is: 999897mike smith
            }

            {/* React wants us to use keys for rendering elements, to let it know how to address this elements: */
                // [<p>a</p>, <p>b</p>, <p>c</p>]
            /* Warning: Each child in an array or iterator should have a unique "key" prop. */
                // [<p key="1">a</p>, <p key="2">b</p>, <p key="3">c</p>] // this is correct
                // keys would not be displayed in HTML, but react see it on virtual DOM.
            }

            <ol>
                {
                    app.options.map((option) =>  <li key={key++}> {option}</li>)
                }
            </ol>

            <form onSubmit={onFormSubmit}> {/* we refer to a function name, not call the function with {onFormSubmit()} */}
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
            <button onClick={onRemoveOptions}>Remove all</button>
            {/* in JSX we can conditionally use HTML attributes like disabled={true/false} */}
            <button disabled={app.options.length < 2} onClick={onMakeDecision}>Make decision</button>
        </div>
    );

    ReactDOM.render(template, appRoot);
};

/* VIRTUAL DOM EFFICIENCY
 * Every time we call renderCounterApp() React is NOT rendering whole template.
 * It use virtual DOM, check witch elements have changed and re-render only changed element!
 * Thats why it's very efficient.
 *  */

renderApp(); /* We call it to render initial state of App */