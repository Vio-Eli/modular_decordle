import React from 'react';
import './Keyboard.scss';

// Array of QWERTY Keyboard
let keyboard: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '⌫'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER']
];

// Keyboard Props
interface KeyboardProps {
    onkey(key: string): void // Function used for button Onclick event
}

function Keyboard(props: KeyboardProps) {
    // Mapping our Keyboard to a button array
    function keyMap(row: string[]) {
        return row.map((key, i) => {
            // Normally the id doesnt matter, as each key is styled the same
            // EXCEPTIONS are ENTER and DELETE (⌫)
            let id: string = "";
            if (key === 'ENTER') {
                id = 'enter';
            } else if (key === '⌫') { // Check for the emoji key
                id = 'delete'
            }
            return (
                <button key={ i } id={ id } onClick={ (e) => {
                    props.onkey(key);
                    e.currentTarget.blur();
                } }>{ key }</button>
            );
        })
    }


    return ( // Return each row in Div
        <div className="keyboardWrapper">
            <div className="buttonDiv">{ keyMap(keyboard[0]) }</div>
            <div className="buttonDiv">{ keyMap(keyboard[1]) }</div>
            <div className="buttonDiv">{ keyMap(keyboard[2]) }</div>
        </div>
    )
}


export default Keyboard;