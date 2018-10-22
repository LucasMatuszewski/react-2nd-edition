
// React Components - 2 types:
// 1. ES6 Classes with states
// 2. Stateless Functional Components (for simple components without state, like <Header /> in this app)

// Parent Component for whole app (replacing const jsx template):
class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleMakeDecision = this.handleMakeDecision.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            // options: [] // instead of setting empty array, we can use here props.options and:
            // 1. set default value as empty string (after a component)
            // 2. send some values from parent component
            options: props.options
        };
    }

    /***********************************************************************************
     * PROPS             vs                     STATE
     * -an object                               -an object
     * -can be used when rendering              -can be used when rendering
     * -changes (from above) cause re-renders   -changes cause re-renders
     * -comes from above                        -defined in component itself
     * -can't be changed by component itself    -can be changed be component itself
     * 
     ***********************************************************************************/


    // We are defining a new Methods for the Class:
    // handleDeleteOptions(){
    //     this.setState(() => {
    //         return {
    //             options: []
    //         };
    //     });
    // }
    // REFACTOR - simpler version:
    handleDeleteOptions(){
        this.setState(() => ({ options: [] }));
        // => ({ RETURN OBJECT }) (with brackets)
        // => { FUNCTION BODY }
    }

    handleDeleteOption(option){
        console.log('delete:', option);
        this.setState((prevState) => ({
            options: prevState.options.filter(e => e !== option) //filter( ARROW FUNCTION without brackets )
            // "e" stands for "element of array", but you could use any other name
            //.filter() creates new array, won't change prevState object (never change it!!!)
        }));
    }

    handleMakeDecision() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        // 1. generate random number (between 0,000000000 - 1,00000000)
        // 2. multiply it by number of options (eg. for 3 options: 0,0021 * 3 = 0,0063)
        // 3. round it to integers (whole numbers) with Math.floor method
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOption(option) {
        // we can't use "e" here, so we keep it as a method inside child component with a form and input
        //e.preventDefault(); // this is to prevent default submit function sending a form on button click
        //const option = e.target.elements.option.value.trim(); //trim() removes spaces from the end and beginning.
        
        //form validation:
        if(!option) {
            return 'Enter valid value to add option';
        } else if(this.state.options.indexOf(option) > -1) { //indexOf() search for value in an array and returns it position or -1 if not find.
            return 'This option already exists';
        } //return will stop a script so we don't need another "else"
        
        /* this.setState((prevState) => {
            //prevState.options.push(option); //first method. It works, but we should NOT change prevState !!! (push() will change it)
            // concat() does not change the existing arrays, but instead returns a new array:
            return {
                options: prevState.options.concat(option)
            };
        }); */
        //REFACTOR - SIMPLER VERSION (we can make 1 line version, or 3 lines for better view):
        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    }
    render() {
        const app = {
            title: 'Indecision App',
            subtitle: 'Make decisions easier!'
            // options: ['sdad', 'dasda'] //we move it to the this.state (react component state)
        };

        // React Component Props - communication between components.
        // Sending data like in html attributes:
        return (
            <div>
                <Header title={app.title} subtitle={app.subtitle} /> {/* require Header React Component (name have to be Uppercase, to differ from HTML tags) */}
                {/* <Header /> */} {/* Components are reusable */}
                <Action
                    hasOptions={this.state.options.length >1 }
                    handleMakeDecision={this.handleMakeDecision}
                /> {/* Action don't need options, only need to know if there is more then 1 option */}
                <Options
                    options={this.state.options}
                    handleDeleteOption={this.handleDeleteOption}
                />
                {/* <AddOption options={this.state.options} /> */} {/* props works only in one direction, we can't change/add/delete state object values by props */}
                <AddOption
                    handleAddOption={this.handleAddOption}
                    handleDeleteOptions={this.handleDeleteOptions}
                /> {/* We send referrals to methods to delete/add options inside IndecisionApp component */}
                {/* We can also use <AddOption></AddOption> like in XHTML. Both are connected with XML */}
            </div>
        );
    }
}

//DEFAULT PROPS VALUES for options:
IndecisionApp.defaultProps = {
    options: []
};

// FOR THIS SIMPLE COMPONENTS WE DON'T NEED STATES.
// SO WE CAN USE STATELESS FUNCTIONAL COMPONENTS:
/* class Header extends React.Component { //take feathers from parent class 'Component' of global class 'React'
    render() { // React Components requires special method 'render()'
        // in nested components we can access to data by 'this.props' object:
        // console.log(this.props)
        return (
            <div>
                <h1>{this.props.title}</h1> //STATELESS FUNCTIONAL COMPONENTS CAN'T USE "THIS" KEYWORD 
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
} */

// SIMPLE STATELESS FUNCTIONAL COMPONENT (they are faster & easier to test):
const Header = (props) => { //they don't have access to "this" keyword, so we have to pass props as an argument
    return (
        <div>
            <h1>{props.title}</h1> {/* props works only one direction. We cant change props and send it back */}
            {props.subtitle && (<h2>{props.subtitle}</h2>)} {/* If we don't have default for subtitle we can conditionally render it */}
        </div>
    );
};

//DEFAULT PROPS for header:
Header.defaultProps = {
    title: 'Default title' //we can set default value for title, and not for subtitle
};

/* class Action extends React.Component {
    render() { */
const Action = (props) => {
    return(
        <div> {/* we refer to a method handlePick, but not calling it. So we don't use handlePick() */}
            <button
                disabled={!props.hasOptions}
                onClick={props.handleMakeDecision}
            >
                What should I do?
            </button>
        </div>
    );

};

/* class Options extends React.Component {
    render() { */
const Options = (props) => {
    let key = 0;
    return(
        <div>
            <p>{props.options.length > 0 ? 'Your options:' : 'Add your options below:' }</p>
            <ul>
                {props.options.map((option) => (
                    <Option
                        key={key++}
                        option={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))}
            </ul>
        </div>
    );
};

/* class Option extends React.Component {
    render() { */
const Option = (props) => {
    return(
        <li>
            {props.option}
            <button
                //onClick={props.handleDeleteOption(props.option)} //fire function immediately on rendering
                onClick={(e) => props.handleDeleteOption(props.option)} //fire on onClick event (because of this callback arrow function)
            >
                delete
            </button>
        </li>
    );
};

class AddOption extends React.Component {

/* //NOW WE USE METHODS FROM PARENT COMPONENT, so we don't need this:
    constructor(props){
        super(props); //take object 'props' from parent class React.Component
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this); //every time we use this.handleDeleteOptions inside this Class, bind it with 'this' from local context.
    }
    // We are defining a new Methods for the Class:
    handleDeleteOptions(){
        alert('options: ' + this.props.options); //wont work by default - we have to bind(this) to use it inside render()
        //this.props.options = []; //don't work. this.props.options is read only. We can't change it.
        
        //render() //in Components we don't have to re-render on data changes.
        //We use ***COMPONENT STATE***, and it takes care of re-rendering on data changes.
        // 1. We set a default state object with default values for this component
        // 2. Component rendered first time using this default state values
        // 3. Event changes a default state values
        // 4. Components re-rendered automatically using new state values
    }    
    */
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e) { //we keep this method here, because we can't use "e" inside parent component
        e.preventDefault(); // this is to prevent default submit function sending a form on button click
        const option = e.target.elements.option.value.trim(); //trim() removes spaces from the end and beginning.
        const error = this.props.handleAddOption(option); //we send option from a form to a method from parent constructor
        //handleAddOption method will return Error message from form validation. We handle with it with local component state
        /* this.setState(() => {
            return {
                // error: error //if names are identical we can use shortcut with only one name:
                error
            };
        }); */
        // REFACTOR - SIMPLER VERSION:
        this.setState(() => ({ error }));

        if(!error){
            e.target.elements.option.value = '';
        }
    }

    render() {
        return(
            <div>
                {this.state.error && (<p>{this.state.error}</p>)}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
                <button onClick={this.props.handleDeleteOptions}>Remove all</button>
                {/* 'this' works in return() context, but if we refer to a method handleDeleteOptions it won't work inside this method by default.
                To make it work we have to bind(this) = send its context to a method */}
                {/* <button onClick={this.handleDeleteOptions.bind(this)}>Remove all</button> */}
                {/* We can bind(this) here, but its inefficient, React will have to bind it every time its rendering this component
                So it's better to bind it on the beginning of a Component, inside class constructor */}
            </div>
        );
    }
}

// If we use parent Component for a template we don't need a const jsx at all
/* const jsx = (
    <div>
        <Header />
        <Action />
        <Options />
        <AddOption />
    </div>
); */

// ReactDOM.render(jsx, document.getElementById('app'));

// we use Parent component in place of const jsx template:
// ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

// we could also send some data as props to main component, e.g. options:
ReactDOM.render(<IndecisionApp options={['option 1', 'option 2']} />, document.getElementById('app'));