import React from 'react';
import { useEffect } from 'react';
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

function getWords(wordLength: number, numWords: number): string[] {

  const eligible = dict.filter((word) => word.length === wordLength);
  let wordArr: string[] = [];

  for (let i=0; i<numWords; i++) {
    let word: string = pick(eligible)
    wordArr.push(word);
  }

  console.log(wordArr);
  return wordArr;
}


function Game() {

  let guess = [""];

  getWords(5, 2);

  //create log on key press
  const onKey = (key: string) => {

    if (/^[a-z]$/i.test(key)) {
      console.log(`${key} dp`)

    } else if (key === "Enter") {
      //if 
    }
  };

  useEffect(() => {
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
  });

  return (
    <div className="gameWrapper">
      <div className="titleWrapper">
        <h3>modular wordle</h3>
      </div>
      <div className="gridDiv">
        <Grid />
      </div>
    </div>
  )
}

export default Game;