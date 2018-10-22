import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption'; 
import OptionModal from './OptionModal';

// Parent Component for whole app (replacing const jsx template):

class IndecisionApp extends React.Component {

    ////////////////////////// REFACTOR ///////////////
    // PLUGIN: babel-plugin-transform-class-properties
    ////////////////////////
    // Ads new, easier syntax for defining Statefull Class Components, without constructor()

    // NEW SYNTAX WITHOUT constructor():
    state = {
        // options: props.options // don't work with props.options...
        options: [],
        selectedOption: undefined // to show in React-Modal "pop-up". Passed down to <OptionModal />
    };
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
        // => ({ RETURN OBJECT }) (with brackets)
        // => { FUNCTION BODY }
    };
    handleDeleteOption = (option) => {
        console.log('delete:', option);
        this.setState((prevState) => ({
            options: prevState.options.filter(e => e !== option) //filter( ARROW FUNCTION without brackets )
            // "e" stands for "element of array", but you could use any other name
            //.filter() creates new array, won't change prevState object (never change it!!!)
        }));
    };
    handleMakeDecision = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        // 1. generate random number (between 0,000000000 - 1,00000000)
        // 2. multiply it by number of options (eg. for 3 options: 0,0021 * 3 = 0,0063)
        // 3. round it to integers (whole numbers) with Math.floor method
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }));
        //alert(option); //simple version, replaced with React-Modal
    };
    handlerHideSelectedOption = () => {
        this.setState(() => ({
            selectedOption: undefined
        }));
    }
    handleAddOption = (option) => {
        // we can't use "e" here, so we keep it as a method inside child component with a form and input
        //e.preventDefault(); // this is to prevent default submit function sending a form on button click
        //const option = e.target.elements.option.value.trim(); //trim() removes spaces from the end and beginning.

        //form validation:
        if (!option) {
            return 'Enter valid value to add option';
        } else if (this.state.options.indexOf(option) > -1) { //indexOf() search for value in an array and returns it position or -1 if not find.
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
    };

    // OLD SYNTAX with constructor():
/*     constructor(props) {
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

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
        // => ({ RETURN OBJECT }) (with brackets)
        // => { FUNCTION BODY }
    }

    handleDeleteOption(option) {
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
        if (!option) {
            return 'Enter valid value to add option';
        } else if (this.state.options.indexOf(option) > -1) { //indexOf() search for value in an array and returns it position or -1 if not find.
            return 'This option already exists';
        } //return will stop a script so we don't need another "else"

        //REFACTOR - SIMPLER VERSION (we can make 1 line version, or 3 lines for better view):
        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    }
 */
    // This new syntax don't work inside render() or Lifecycle Methods.
    // So we can use it only directly inside a Class, to remove constructor() and binding. 

    // LIFECYCLE HOOKS (METHODS):
    componentDidMount() {
        // typically used to fetch data, e.g. from DB, data storage
        // it could also set a timer and re-render component every x seconds, fetching new data.
        console.log('component did mount!');

        try { // try code block to succeed
            // FETCHING DATA FROM LOCAL STORAGE:
            const json = localStorage.getItem('options');
            if (json) { //check if there are some data from dataStorage
                const options = JSON.parse(json); //parse JSON string to an object
                this.setState(() => ({ options })); //update a state with data from storage on page refresh (we use shortcut in place of {options: options} === {options})
            }
        } catch (error) { //if try block does not succeed:
            console.error(error);
            //do nothing (there was some error)
        }

    }

    componentDidUpdate(prevProps, prevState) {
        // typically used to save data, eg. to DB
        console.log('component did update!');

        if (prevState.options.length !== this.state.options.length) { //save only on changes
            const json = JSON.stringify(this.state.options); //convert our state object to an JSON string
            localStorage.setItem('options', json); //save JSON string with a name 'options'
        }
    }

    render() {
        const app = {
            title: 'Indecision App :)',
            subtitle: 'Make decisions easier!'
            // options: ['sdad', 'dasda'] //we move it to the this.state (react component state)
        };

        // React Component Props - communication between components.
        // Sending data like in html attributes:
        return (
            <div>
                <Header title={app.title} subtitle={app.subtitle} /> {/* require Header React Component (name have to be Uppercase, to differ from HTML tags) */}
                {/* <Header /> */} {/* Components are reusable */}
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 1}
                        handleMakeDecision={this.handleMakeDecision}
                    /> {/* Action don't need options, only need to know if there is more then 1 option */}
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOption={this.handleDeleteOption}
                            handleDeleteOptions={this.handleDeleteOptions}
                        />
                        {/* <AddOption options={this.state.options} /> */} {/* props works only in one direction, we can't change/add/delete state object values by props */}
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        /> {/* We send referrals to methods to delete/add options inside IndecisionApp component */}
                        {/* We can also use <AddOption></AddOption> like in XHTML. Both are connected with XML */}
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handlerHideSelectedOption={this.handlerHideSelectedOption}
            />
            </div>
        );
    }
}

//DEFAULT PROPS VALUES for options:
IndecisionApp.defaultProps = {
    options: []
};

export default IndecisionApp;