import React, { Ref, useState, useRef, useEffect, useCallback } from 'react';
import Grid, { GridState } from '../../components/grid/Grid';
import Keyboard from '../../components/keyboard/Keyboard';
import dict from '../../utils/dict.json';
//import dictlen4 from '../../utils/dictlen4.json';
//import dictlen5 from '../../utils/dictlen5.json';
//import dictlen6 from '../../utils/dictlen6.json';
//import dictlen7 from '../../utils/dictlen7.json';
//import dictlen8 from '../../utils/dictlen8.json';
//import dictlen9 from '../../utils/dictlen9.json';
//import dictlen10 from '../../utils/dictlen10.json';
//import dictlen11 from '../../utils/dictlen11.json';

import pick from '../../utils/pick';
import './Game.scss';

enum GameState { // Overall Game State
  Playing,
  Won,
  Lost
}

const newGame = () => { // To Create a new game
  window.location.reload();
}

/*function getDict(wordLength: number) {
  if (wordLength === 4) {
    return dictlen4;
  } else if (wordLength === 5) {
    return dictlen5;
  } else if (wordLength === 6) {
    return dictlen6;
  } else if (wordLength === 7) {
    return dictlen7;
  } else if (wordLength === 8) {
    return dictlen8;
  } else if (wordLength === 9) {
    return dictlen9;
  } else if (wordLength === 10) {
    return dictlen10;
  } else if (wordLength === 11) {
    return dictlen11;
  } else {
    return dict;
  }
}*/

// Get an array of words for the answers
function getWords(wordLength: number, numWords: number): string[] {

  // Filtering all the eligible words
  let eligible = dict.filter((word) => word.length === wordLength);
  let wordArr: string[] = []; // Create the (soon to be) answer array

  for (let i = 0; i < numWords; i++) {
    let word: string = pick(eligible);
    // Ensures no duplication of words (extra precaution)
    while (wordArr.includes(word)) { 
      word = pick(eligible); // If word is already being used, pick another one
    }
    wordArr.push(word); // Push the word to the answer array
  }

  eligible = []; // Unload dictionary

  return wordArr; // Return our answer array
}

// Recursively Generate Grids
function generateGrids(
  answer: string[], // Array of answers
  currentGuess: string, // Current guess
  guessArr: string[], // Array of past guesses
  numGuesses: number, // Max number of guesses
  wordLength: number, // Length of word
  numGrids: number, // Number of grids to make
  gridChecker: (gridNum: number, gridState: GridState) => void, // Callback to set the state of each grid independently
  stateArr: number[] // Array of grid states
): JSX.Element[] {

  let grid: JSX.Element[] = []; // Creating our grid array

  for (let i: number = 0; i < numGrids; i++) { // Recursively generating the grids
    grid.push(
      <Grid
        key={ i }
        answer={ answer[i] }
        gridChecker={ gridChecker }
        currentGuess={ currentGuess }
        guessArr={ guessArr }
        maxGuesses={ numGuesses }
        wordLength={ wordLength }
        gridNum={ i }
        gridStates={ stateArr } />
    )
  }
  return grid;
}

let stateArr: number[] = [0]; // Array of grid states

// Game Element
function Game() {

  const [wordLength, setWordLength] = useState<number>(5); // Length of words. Defaults to 5
  const [numGrids, setNumGrids] = useState<number>(1); // Number of grids. Defaults to 1

  const numGuesses: number = numGrids + 5; // Max number of guesses

  const [warning, setWarning] = useState(''); // Help Message under Grids (ex: Word too short!)
  const [warningColor, setWarningColor] = useState<string>('red'); // Color of Message ^

  const [guessArr, setGuessArr] = useState<string[]>([]); // Array of past guesses
  const [currentGuess, setCurrentGuess] = useState<string>(""); // Current Guess
  const [answer, setAnswer] = useState<string[]>(getWords(wordLength, 1)); // Array of Answer(s) (1 per grid)
  const [gridArr, setGridArr] = useState<JSX.Element[]>() // Array of Grids

  const [gameState, setGameState] = useState<GameState>(GameState.Playing); // Main game State
  const [inputDisabled, setInputDisabled] = useState<boolean>(false); // Whether Slider Input is Disabled

  // Callback for each grid to set if won or lost
  let GridChecker = useCallback(
    (gridNum: number, gridState: GridState) => {
      stateArr[gridNum] = gridState;
    }, [],
  );

  // Create log on key press
  const onKey = (key: string) => {
    key = key.toLowerCase();

    // If key is a letter, add it to the current guess
    if (/^[a-z]$/i.test(key)) {
      setCurrentGuess((currentGuess) =>
        (currentGuess + key.toLocaleLowerCase()).slice(0, wordLength)
      );

    } else if (key === "backspace" || key === "⌫") {
      setCurrentGuess((currentGuess) => currentGuess.slice(0, -1)); // Delete last letter in current guess

    } else if (key === "enter") { // Submitting the current guess for check
      // If guess is empty
      if (currentGuess.length === 0) {
        setWarning("Please enter a word");
        setWarningColor("yellow");
        return;
      }
      // If guess is too short
      if (currentGuess.length !== wordLength) {
        setWarning("Too Short!");
        setWarningColor("yellow");
        return;
      }
      // If guess isnt a word
      if (!dict.includes(currentGuess)) {
        setWarning("Invalid Word");
        setWarningColor("yellow");
        return;
      }
      // If guess has already been used
      if (guessArr.includes(currentGuess)) {
        setWarning("Can't use the same word twice!");
        setWarningColor("yellow");
        return;
      }

      setGuessArr((guessArr) => guessArr.concat([currentGuess])); // Push the guess to past guesses
      setCurrentGuess((currentGuess) => ""); // Set current guess to empty string
    }
  };

  useEffect(() => {

    // Disabled slider bars if user has typed or entered a word
    if(currentGuess.length > 0 || guessArr.length > 0) {
      setInputDisabled(true);
    } else if (currentGuess.length === 0) {
      setInputDisabled(false);
    }

    // Check Callback GridState --> See if player won or not\
    // If every grid has the Won state (1), player has won
    // Check if State Array is the correct length (the number of grids)
    if (stateArr.every(x => x === 1) && stateArr.length === numGrids) {
      setGameState(gameState => GameState.Won);
      setWarning("You've Won!");
      setWarningColor("green");
    } else if (stateArr.some(x => x === 2)) { // If one of the grids reports lost, then the player has lost
      setGameState(gameState => GameState.Lost); 
      setWarning(`You've lost. Correct word(s) were ${answer.join(', ')}`); // Nicely printing out the array of answers
      setWarningColor("red");
    }

    // When key is pressed, call OnKey
    const onKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) {
        onKey(e.key)
      }
      if (e.key === "Backspace") {
        e.preventDefault()
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };

  }, [currentGuess, guessArr, stateArr, inputDisabled]); // UseEffects depends on these


  return (
    <div className="gameWrapper">
      <div className="titleWrapper">
        <button onClick={ newGame }>new</button>
        <h3>
          <span style={ { color: "#e07680" } }> modular </span>
          <span style={ { color: "#64da7c" } }> decordle </span>
        </h3>

      </div>
      <table id='sliders'>
        <tbody>
          <tr>
            <td><span>Length: { wordLength }</span></td>
            <td id='lengthSlider'><input type='range' min='4' max='11'
              value={ wordLength }
              disabled={ inputDisabled }
              onChange={ (e) => {
                const inputLength = +e.target.value;
                setGameState(GameState.Playing);
                setCurrentGuess(""); // Empties the current guess
                setWarning(""); // Empties any warnings put
                setWordLength(inputLength); // Sets the word length to the slider
                setAnswer(getWords(inputLength, numGrids)); // Creates new word to solve
                setGuessArr([]); //  Resets the Guess Array
              } }
            /></td>
          </tr>
          <tr>
            <td><span>Grid Amount: { numGrids }</span></td>
            <td><input type='range' min='1' max='10'
              value={ numGrids }
              disabled={ inputDisabled }
              onChange={ (e) => {
                const gridCount = +e.target.value;
                setGameState(GameState.Playing);
                setCurrentGuess(""); // Empties the current guess
                setWarning(""); // Empties any warnings put
                setNumGrids(gridCount);
                setAnswer(getWords(wordLength, gridCount)); // Creates new words to solve
                setGuessArr([]); //  Resets the Guess Array
              } }
            /></td>
          </tr>
        </tbody>
      </table>
      <div className="gridDiv">
        { generateGrids( // Our Grids. See function for more comments
          answer,
          currentGuess,
          guessArr,
          numGuesses,
          wordLength,
          numGrids,
          GridChecker,
          stateArr
        ) }
      </div>
      <div className="warning">
        <span style={ { color: (warningColor) } }>{ warning }</span>
      </div>
      <Keyboard onkey={ onKey } />
    </div>
  )
}

export default Game;
