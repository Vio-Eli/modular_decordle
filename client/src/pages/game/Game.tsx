import React, { useState, useRef, useEffect } from 'react';
import Grid from '../../components/grid/Grid';
import dict from '../../utils/dict.json';
import pick from '../../utils/pick';
import './Game.scss';

enum GameState {
  NotPlaying,
  Playing,
  Won,
  Lost
}

const newGame = () => {
  window.location.reload();
}

function getWords(wordLength: number, numWords: number): string[] {

  const eligible = dict.filter((word) => word.length === wordLength);
  let wordArr: string[] = [];

  for (let i = 0; i < numWords; i++) {
    let word: string = pick(eligible);
    // Ensures no duplication of words (extra precaution)
    if (!wordArr.includes(word)) {
      wordArr.push(word);
    }
  }

  //console.log(wordArr);
  return wordArr;
}

function Game() {

  const tableRef = useRef<HTMLTableElement>(null);
  const [warning, setWarning] = useState('');
  const [guessArr, setGuessArr] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");

  const wordLength: number = 5;

  let answer: string = getWords(wordLength, 1)[0];
  console.log(answer);

  useEffect(() => {

    //create log on key press
    const onKey = (key: string) => {

      if (/^[a-z]$/i.test(key)) {
        setCurrentGuess((currentGuess) =>
          (currentGuess + key.toLocaleLowerCase()).slice(0, wordLength)
        );
        tableRef.current?.focus();

      } else if (key === "Backspace") {
        setCurrentGuess((currentGuess) => currentGuess.slice(0, -1));

      } else if (key === "Enter") {
        if (currentGuess.length === 0) {
          setWarning("Please enter a word");
          return;
        }
        if (currentGuess.length !== wordLength) {
          setWarning("Too Short!");
          return;
        }
        if (!dict.includes(currentGuess)) {
          setWarning("Invalid Word");
          return;
        }
        if (guessArr.includes(currentGuess)) {
          setWarning("Can't use the same word twice!");
          return;
        }
        
        setGuessArr((guessArr) => guessArr.concat([currentGuess]));
        setCurrentGuess((currentGuess) => "");
      }
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
  }, [currentGuess, guessArr]);


  return (
    <div className="gameWrapper">
      <div className="titleWrapper">
        <button onClick={newGame}>new</button>
        <h3>
          <span style={{ color: "#e07680" }}> modular </span>
          <span style={{ color: "#64da7c" }}> wordle </span>
        </h3>
      </div>
      <div className="gridDiv">
        <Grid answer={answer}
          tableRef={tableRef}
          currentGuess={currentGuess}
          guessArr={guessArr}
          maxGuesses={6}
          wordLength={wordLength} />
      </div>
      <div className="warning">
        <span>{warning}</span>
      </div>
    </div>
  )
}

export default Game;