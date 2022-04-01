import React from 'react';
import './Keyboard.scss';

let keyboard: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

interface KeyboardProps {
    onkey(key: string): void
}

function Keyboard(props: KeyboardProps) {

    function keyMap(row: string[]) {
        return row.map((key, i) => {
            let id: string = "";
            if (key === 'ENTER') {
                id = 'enter';
            } else if (key === '⌫') {
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


    return (
        <div className="keyboardWrapper">
            <div className="buttonDiv">{ keyMap(keyboard[0]) }</div>
            <div className="buttonDiv">{ keyMap(keyboard[1]) }</div>
            <div className="buttonDiv">{ keyMap(keyboard[2]) }</div>
        </div>
    )
}


export default Keyboard;