export interface checked {
    letter: string,
    color?: string
}

export default function check(guess: string, ans: string): Array<checked> {
    ans = ans.toLowerCase();
    guess = guess.toLowerCase(); // Just to be safe. Should already be lowercase
    let j: number;
    return guess.split("").map((letter, i) => {
        if (letter === ans[i]) {
            // add class to letter
            ans = ans.slice(0, i) + "*" + ans.slice(i+1)// Remove letter at index i of correct answer
            return { letter, color: 'green' }
        } else if ((j = ans.indexOf(letter)) !== -1) {
            ans = ans.slice(0, j) + "*" + ans.slice(j+1); // Remove letter at index j of correct answer
            return { letter, color: 'goldenrod' }
        } else {
            return { letter, color: 'gray' }
        }
    });
}