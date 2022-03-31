export interface checked {
    letter: string,
    color?: string
}

export default function check(guess: string, ans: string): Array<checked> {
    ans = ans.toLowerCase();
    guess = guess.toLowerCase(); // Just to be safe. Should already be lowercase
    let guessArr: string[] = guess.split("");
    let checkArr: checked[] = [];
    let j: number;
    
    guessArr.forEach((letter, i) => {
        if (letter === ans[i]) {
            ans = ans.slice(0, i) + "*" + ans.slice(i+1);
            checkArr[i] = { letter, color: 'green' };
        }
    })

    guessArr.forEach((letter, i) => {
        j = ans.indexOf(letter);
        if (j !== -1 && j !== i) {
            ans = ans.slice(0, j) + "*" + ans.slice(j+1);
            checkArr[i] = { letter, color: 'goldenrod' };
        } else if (checkArr[i] === undefined) {
            checkArr[i] = { letter, color: 'gray' };
        }
    })

    return checkArr;
}