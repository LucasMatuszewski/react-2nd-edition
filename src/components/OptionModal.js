import React from 'react';
import Modal from 'react-modal';

//OLD SYNTAX:
// const OptionModal = () => {
//     return(
//         <div>
//             some text
//         </div>
//     );
// };

//SHORTER SYNTAX, without return()
//(arrow functions works like return if we don't use function body () => {f.body}
const OptionModal = (props) => (
    <Modal //third-party component. We pass a children props to it inside <Modal>...</Modal> tags
        // two obligatory settings:
        isOpen={!!props.selectedOption} //false = closed on page render || true = opened on page render
        // !! = converts truthy / falsy value to boolean (e.g. undefined == false, 'some string' == true)
        contentLabel="Selected Option" // ARIA accessability description for screen readers etc
        // non obligatory settings:
        onRequestClose={props.handlerHideSelectedOption} // To close with "Esc" button or clicking the background
        closeTimeoutMS={200} // set how long we want to wait before modal is gone, in ms.
                             // for closing time it gives us special class to style (e.g. transition)
        className="modal" //gives us control over how this Modal looks like (delete all default Modal styles)
    > {/* children props: */}
        <h3 className="modal__title">Selected option:</h3>
        {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
        <button className="button" onClick={props.handlerHideSelectedOption}>OK, let's do it!</button>
    </Modal>
);

export default OptionModal;
// imported in indecisionApp.js