import React from 'react';
import Option from './Option'; //we change the path from './components/Option' because it is in the same folder

/* class Options extends React.Component {
    render() { */
const Options = (props) => {
    let key = 0;
    return (
        <div>
            <div className="widget-header">
                <h3 className="widget-header__title">{props.options.length > 0 ? 'Your options:' : 'Add your options below:'}</h3>
                <button
                    className="button button--link"
                    onClick={props.handleDeleteOptions}
                >
                    Remove all
                </button>
                {/* 'this' works in return() context, but if we refer to a method handleDeleteOptions it won't work inside this method by default.
                To make it work we have to bind(this) = send its context to a method */}
                {/* <button onClick={this.handleDeleteOptions.bind(this)}>Remove all</button> */}
                {/* We can bind(this) here, but its inefficient, React will have to bind it every time its rendering this component
                So it's better to bind it on the beginning of a Component, inside class constructor */}
            </div>
            {/* <ul> */}
            {props.options.map((option, index) => (
                <Option
                    // key={key++}
                    key={option}
                    option={option}
                    count={index + 1}
                    handleDeleteOption={props.handleDeleteOption}
                />
            ))}
            {/* </ul> */}
        </div>
    );
};

export default Options;