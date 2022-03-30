import React from 'react';

let keyboard: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

export default function Keyboard(){

    
}

/*
get color from checked[]
key color = color
*/

/*export default function check(guess: string, ans: string): checked[] {
    ans = ans.toLowerCase();
    guess = guess.toLowerCase(); // Just to be safe. Should already be lowercase
    let j: number;
    return guess.split("").map((letter, i) => {
        if (letter === ans[i]) {
            // add class to letter
            return { letter, color: 'green' }
        } else if ((j = ans.indexOf(letter)) !== -1) {
            ans = ans.slice(0, j) + "*" + ans.slice(j+1); // Remove letter at index j of correct answer
            return { letter, color: 'goldenrod' }
        } else {
            return { letter, color: 'gray' }
        }
    });
} */