import React from 'react';
import './Keyboard.scss';

let keyboard: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

function Keyboard() {
    return (
        <div className="keyboardWrapper">
            {keyboard.map((row, index) => {
                <tr key={index}>
                    {row.map((letter, jdex) => {
                        <td key={jdex}>
                            {letter}
                        </td>
                    })}
                </tr>
            })}
        </div>
    )
}


export default Keyboard;