import React from 'react';

/* class Option extends React.Component {
    render() { */

// we can't "export default const ..." == error (it works only for class)
// export default const Option = (props) => {

// but we can export default without a name, and name it when importing:
// export default (props) => {
// but... in React DevTools we will see the name of this component as <Unknown /> - its hard to read.
//
// Thats why it's better to export as default on the end of a file (especially for Stateless Components)
const Option = (props) => (
    <div className="option">
        <p className="option__text">
            {/* {props.count + '. ' + props.option} */}
            {props.count}. {props.option}
        </p>
        <button
            className="button button--link"
            //onClick={props.handleDeleteOption(props.option)} //fire function immediately on rendering
            onClick={(e) => props.handleDeleteOption(props.option)} //fire on onClick event (because of this callback arrow function)
        >
            delete
        </button>
    </div>
);

// OLD SYNTAX with return() - by default arrow function works as return when we don't use function body {}
// const Option = (props) => {
//     return (
//         <li>
//             {props.option}
//             <button
//                 //onClick={props.handleDeleteOption(props.option)} //fire function immediately on rendering
//                 onClick={(e) => props.handleDeleteOption(props.option)} //fire on onClick event (because of this callback arrow function)
//             >
//                 delete
//             </button>
//         </li>
//     );
// };

export default Option;