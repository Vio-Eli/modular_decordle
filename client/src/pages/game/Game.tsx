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
    // TODO: Make sure word can't be duplicated
    let word: string = pick(eligible);
    wordArr.push(word);
  }

  console.log(wordArr);
  return wordArr;
}

function Game() {

  const tableRef = useRef<HTMLTableElement>(null);

  const [guessArr, setGuessArr] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");

  const wordLength: number = 5;

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
        if (currentGuess.length !== wordLength) {
          console.log("Too Short")
          return;
        }
        if (!dict.includes(currentGuess)) {
          console.log("Invalid Word")
          return;
        }
        setGuessArr((guessArr) => guessArr.concat([currentGuess]));
        setCurrentGuess((currentGuess) => "");
      }
      console.log(currentGuess);
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
  }, [currentGuess]);

  return (
    <div className="gameWrapper">
      <div className="titleWrapper">
        <button onClick={newGame}>new</button>
        <h3>modular wordle</h3>
      </div>
      <div className="gridDiv">
        <Grid tableRef={tableRef} currentGuess={currentGuess} guessArr={guessArr} maxGuesses={6} wordLength={wordLength} />
      </div>
    </div>
  )
}

export default Game;