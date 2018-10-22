import React from 'react';

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
const Header = (props) => ( //they don't have access to "this" keyword, so we have to pass props as an argument
    // JSX STARTS HERE
    // This funny tag syntax is neither a string nor HTML.
    // Instead of artificially separating technologies by putting markup and logic in separate files,
    // React separates concerns with loosely coupled units called “components” that contain both.
    // React doesn’t require using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code.
    // It also allows React to show more useful error and warning messages.
    <div className="header">
        <div className="container">
            <h1 className="header__title">{props.title}</h1> {/* props works only one direction. We cant change props and send it back */}
            {props.subtitle && (<h2 className="header__subtitle">{props.subtitle}</h2>)} {/* If we don't have default for subtitle we can conditionally render it */}
        </div>
    </div>
    // JSX ENDS HERE
);


// OLD SYNTAX with return() - by default arrow function works as return when we don't use function body {}
// const Header = (props) => {
//     return (
//         <div>
//             <h1>{props.title}</h1> 
//             {props.subtitle && (<h2>{props.subtitle}</h2>)} 
//         </div>
//     );
// };

// Alternative syntax for Stateless Functional Component, without arrow function:
// function Header(props) {}

//DEFAULT PROPS for Header:
Header.defaultProps = {
    title: 'Default title' //we can set default value for title, and not for subtitle
};

export default Header;