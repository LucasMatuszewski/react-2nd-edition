console.log('App is running');

const app = {
    title: 'Visibility Toggle',
    details: 'Here are some details'
};

// let visibility = 'hide';
// its easier to use false / true
let visibility = false;

const onToggleVisibility = () => {
    // 1) we can use turnery operator:
    // visibility ? visibility = false : visibility = true;
    // 2) we can use easier option, oppositions:
    visibility = !visibility;
    console.log(visibility);
    renderApp();
};

/* // We can do it easier, directly inside JSX template
    const toggleDetails = () => {
    if(visibility) {
        return <p>{app.details}</p>;
    }
}; */

/* // We can do it easier, directly inside a button
    const buttonText = () => {
    if (visibility == 'show') {
        return 'Hide details';
    } else {
        return 'Show details';
    }
}; */

// we can put it directly in ReactDOM.render()
// const appRoot = document.getElementById('app');

const renderApp = () => {
    const jsx = ( // the name could be 'template', 'jsx' ore whatever you want
        <div>
            <h1>{app.title}</h1>
            <button onClick={onToggleVisibility}>
                {/* buttonText() //we can do it directly inside a button: */}
                {visibility ? 'Hide details' : 'Show details'}
            </button>
            {/* toggleDetails() //its easier without any function: */}
            {visibility && (
                <p>{app.details}</p>
            )}
        </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
};

renderApp();