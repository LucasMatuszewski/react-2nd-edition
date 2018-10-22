//We have to import React in every file we use it (like in Express and Mongoose)
import React from 'react';

// For Components its usually the best to export them as default
// (usually we have only one class in component file, and it should be default):
export default class AddOption extends React.Component {

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

    ////////////////////////// REFACTOR ///////////////
    // PLUGIN: babel-plugin-transform-class-properties
    ////////////////////////
    // Ads new, easier syntax for defining Statefull Class Components, without constructor()
    
    // NEW SYNTAX WITHOUT constructor():
    state = {
        error: undefined
    };
    handleAddOption = (e) => { //we keep this method here, because we can't use "e" inside parent component
        e.preventDefault(); // this is to prevent default submit function sending a form on button click
        const option = e.target.elements.option.value.trim(); //trim() removes spaces from the end and beginning.
        const error = this.props.handleAddOption(option); //we send option from a form to a method from parent constructor

        this.setState(() => ({ error }));

        if (!error) {
            e.target.elements.option.value = '';
        }
    };

    // OLD SYNTAX with constructor():
/*     constructor(props) {
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
        //  this.setState(() => {
        //     return {
        //         // error: error //if names are identical we can use shortcut with only one name:
        //         error
        //     };
        // }); 
        // REFACTOR - SIMPLER VERSION:
        this.setState(() => ({ error }));

        if (!error) {
            e.target.elements.option.value = '';
        }
    }
*/
// This new syntax don't work inside render() or Lifecycle Methods.
// So we can use it only directly inside a Class, to remove constructor() and binding.

    render() {
        return (
            <div>
                {this.state.error && (<p className="add-option-error">{this.state.error}</p>)}
                <form onSubmit={this.handleAddOption} className="add-option">
                    <input className="add-option__input" type="text" name="option" />
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}
