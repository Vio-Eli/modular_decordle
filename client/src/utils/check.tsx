export interface checked {
    letter: string
    color?: string
}

export default function check(guess: string, ans: string): checked[] {
    ans = ans.toLowerCase();
    guess = guess.toLowerCase(); // Just to be safe. Should already be lowercase
    return guess.split("").map((letter, i) => {
        if (letter === ans[i]) {
            return { letter, color: 'green' }
        } else if (ans.includes(letter)) {
            ans = ans.slice(0, i) + ans.slice(i+1); // Remove letter at index i of correct answer
            return { letter, color: 'yellow' }
        } else {
            return { letter, color: 'gray' }
        }
    });
}