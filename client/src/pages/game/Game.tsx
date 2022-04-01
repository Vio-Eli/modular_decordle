import React, { Ref, useState, useRef, useEffect, useCallback } from 'react';
import Grid, { GridState } from '../../components/grid/Grid';
import Keyboard from '../../components/keyboard/Keyboard';
import dict from '../../utils/dict.json';
import dictlen4 from '../../utils/dictlen4.json';
import dictlen5 from '../../utils/dictlen5.json';
import dictlen6 from '../../utils/dictlen6.json';
import dictlen7 from '../../utils/dictlen7.json';
import dictlen8 from '../../utils/dictlen8.json';
import dictlen9 from '../../utils/dictlen9.json';
import dictlen10 from '../../utils/dictlen10.json';
import dictlen11 from '../../utils/dictlen11.json';

import pick from '../../utils/pick';
import './Game.scss';

enum GameState {
  Playing,
  Won,
  Lost
}

const newGame = () => {
  window.location.reload();
}

function getDict(wordLength: number) {
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
}

function getWords(wordLength: number, numWords: number): string[] {

  let eligible = getDict(wordLength).filter((word) => word.length === wordLength);
  let wordArr: string[] = [];

  for (let i = 0; i < numWords; i++) {
    let word: string = pick(eligible);
    // Ensures no duplication of words (extra precaution)
    if (!wordArr.includes(word)) {
      wordArr.push(word);
    }
  }


  eligible = [];

  //console.log(wordArr);
  return wordArr;
}

function generateGrids(
  answer: string[],
  currentGuess: string,
  guessArr: string[],
  numGuesses: number,
  wordLength: number,
  numGrids: number,
  gridChecker: (gridNum: number, gridState: GridState) => void,
  stateArr: number[]
): JSX.Element[] {

  let grid: JSX.Element[] = [];

  for (let i: number = 0; i < numGrids; i++) {
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

let stateArr: number[] = [0];

function Game() {

  const [wordLength, setWordLength] = useState<number>(5);
  const [numGrids, setNumGrids] = useState<number>(1);

  const numGuesses: number = numGrids + 5;

  const [warning, setWarning] = useState('');
  const [warningColor, setWarningColor] = useState<string>('red');
  const [guessArr, setGuessArr] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [answer, setAnswer] = useState<string[]>(getWords(wordLength, 1));

  const [gameState, setGameState] = useState<GameState>(GameState.Playing);
  const [gridArr, setGridArr] = useState<JSX.Element[]>()

  const [inputDisabled, setInputDisabled] = useState<boolean>(false);

  // Callback for each grid to set if won or lost
  let GridChecker = useCallback(
    (gridNum: number, gridState: GridState) => {
      stateArr[gridNum] = gridState;
    }, [],
  );

  //create log on key press
  const onKey = (key: string) => {
    key = key.toLowerCase();

    if (/^[a-z]$/i.test(key)) {
      setCurrentGuess((currentGuess) =>
        (currentGuess + key.toLocaleLowerCase()).slice(0, wordLength)
      );

    } else if (key === "backspace" || key === "⌫") {
      setCurrentGuess((currentGuess) => currentGuess.slice(0, -1));
    } else if (key === "enter") {
      if (currentGuess.length === 0) {
        setWarning("Please enter a word");
        setWarningColor("yellow");
        return;
      }
      if (currentGuess.length !== wordLength) {
        setWarning("Too Short!");
        setWarningColor("yellow");
        return;
      }
      if (!getDict(wordLength).includes(currentGuess)) {
        setWarning("Invalid Word");
        setWarningColor("yellow");
        return;
      }
      if (guessArr.includes(currentGuess)) {
        setWarning("Can't use the same word twice!");
        setWarningColor("yellow");
        return;
      }

      setGuessArr((guessArr) => guessArr.concat([currentGuess]));
      setCurrentGuess((currentGuess) => "");
    }
  };

  useEffect(() => {

    // Disabled slider bars if user has typed or entered a word
    if(currentGuess.length > 0 || guessArr.length > 0) {
      setInputDisabled(true);
    } else if (currentGuess.length === 0) {
      setInputDisabled(false);
    }

    // Check Callback GridState --> See if player won or not
    if (stateArr.every(x => x === 1)) {
      setGameState(gameState => GameState.Won);
      setWarning("You've Won!");
      setWarningColor("green");
    } else if (stateArr.some(x => x === 2)) {
      setGameState(gameState => GameState.Lost);
      setWarning(`You've lost. The word was ${answer[0]}`);
      setWarningColor("red");
    };

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

  }, [currentGuess, guessArr, stateArr, inputDisabled]);


  return (
    <div className="gameWrapper">
      <div className="titleWrapper">
        <button onClick={ newGame }>new</button>
        <h3>
          <span style={ { color: "#e07680" } }> modular </span>
          <span style={ { color: "#64da7c" } }> wordle </span>
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
        { generateGrids(
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