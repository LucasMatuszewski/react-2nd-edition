import React from 'react';

/* class Action extends React.Component {
    render() { */
const Action = (props) => (
    <div> {/* we refer to a method handlePick, but not calling it. So we don't use handlePick() */}
        <button
            className="big-button"
            disabled={!props.hasOptions}
            onClick={props.handleMakeDecision}
        >
            What should I do?
        </button>
    </div>
);


// OLD SYNTAX with return() - by default arrow function works as return when we don't use function body {}
// const Action = (props) => {
//     return (
//         <div> {/* we refer to a method handlePick, but not calling it. So we don't use handlePick() */}
//             <button
//                 disabled={!props.hasOptions}
//                 onClick={props.handleMakeDecision}
//             >
//                 What should I do?
//             </button>
//         </div>
//     );
// };

export default Action;