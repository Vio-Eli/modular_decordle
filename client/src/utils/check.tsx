// Interface for Checked
export interface checked {
    letter: string, // Letter Character
    color?: string // The color for the cell background
}

export default function check(guess: string, ans: string): Array<checked> {
    ans = ans.toLowerCase(); // Just to be safe. Should already be lowercase
    guess = guess.toLowerCase(); // Just to be safe. Should already be lowercase
    let guessArr: string[] = guess.split(""); // Splitting our guess into an array of letters
    let checkArr: checked[] = []; // Array of checked for word
    let j: number; // Index-er
    
    // Looping through our guess for the 1st time
    // Checking to see if any letters are a perfect match (letter and index) [green]
    guessArr.forEach((letter, i) => {
        if (letter === ans[i]) {
            // Getting rid of that letter in ans. Replacing it with * to preserve index
            ans = ans.slice(0, i) + "*" + ans.slice(i+1);
            checkArr[i] = { letter, color: 'green' }; // Pushing the letter as green
        }
    })

    // Looping through our guess for the 2nd time
    // Checking for regular matches (just letter) [yellow]
    guessArr.forEach((letter, i) => {
        j = ans.indexOf(letter); // Grabbing the index of the letter in answer
        // So as to not overwrite the previous loop
        if (checkArr[i] === undefined) {
            // If the letter is in the answer (j !== -1)
            // If the letter isnt the same index in answer (just to be sure)
            if (j !== -1 && j !== i) {
                // Getting rid of that letter in ans. Replacing it with * to preserve index
                ans = ans.slice(0, j) + "*" + ans.slice(j+1);
                checkArr[i] = { letter, color: 'goldenrod' }; // Pushing the letter as yellow
            // Else if the letter isnt in the array
            } else {
                checkArr[i] = { letter, color: 'gray' }; // Set letter color to gray
            }
        }
    })

    return checkArr;
}