import { useRef, Ref, useState, useEffect } from 'react';
import React from 'react';
import './Grid.scss';
import { TypeOfTag } from 'typescript';
import check, { checked } from '../../utils/check';

// Props for Grid
interface GridProps {
  answer: string, // The answer for the grid (independently)
  gridChecker(gridNum: number, gridState: GridState): void, // Callback for grid to set its state in Game()
  currentGuess: string, // Current Guess
  guessArr: string[], // Array of past guesses
  maxGuesses: number, // Max number of guesses
  wordLength: number, // Word Length
  gridNum: number, // Number of the Grid (for id purposes)
  gridStates: number[] // Array of every grid state
}

// Independent (from Game) Grid State
export enum GridState {
  Playing,
  Won,
  Lost
}

// Generate Table Divs of Letters from Guess
function letterDivs(wordRow: string, wordLength: number, checkedArr: checked[][], oldGuess: string[], arrState: number) {

  let i: number; // Iterator

  // If guess has already been checked (i.e. its an old guess)
  if ((i = oldGuess.indexOf(wordRow)) !== -1 && wordRow.length > 0) {
    // return array of td's for the word
    return checkedArr[i].map((tup, i) => {
      let color: string = tup.color!; // Color of the letter cell background
      return (
        <td key={i} style={{ backgroundColor: (color) }}> {tup.letter.toUpperCase()}</td>
      );
    });
    
    // Else if the game is still going (i.e. Grid State isn't Won(1)... get it?)
  } else if (arrState === 0) {
    let word: string[] = wordRow.split(""); // Splitting the word into an array
    return word // Return the current guess (the updating component)
      .concat(Array(wordLength).fill("")) // Fill the array with empty chars
      .slice(0, wordLength) // Resize it to the word length
      .map((letter, i) => {
        return (
          <td key={i} >{letter.toUpperCase()}</td> // Return the uppercase letters
        );
      });

  } else { // If the Grid State is 1, the array should't update
    let word: string[] = Array(wordLength).fill("");
    return word // Returning an array of empty chars
      .map((letter, i) => {
        return (
          <td key={i} >{letter}</td>
        );
      });
  }
}

export default function Grid(props: GridProps) {

  let currentGuess: string = props.currentGuess; // Set the current guess as a local var

  // Local Storage of Past Guesses and their letter color data
  let oldGuess: string[] = []; // Local var of Past Guesses
  let checkedArr: checked[][] = []; // Array of checked Past Guesses

  let arrState: number = 0; // The current array state. Resets to 0 upon each render

  props.guessArr.forEach((word, i) => { // Looping through the past guesses, passed down as prop
    // If Word hasn't been checked and We haven't hit the answer word yet
    if (!oldGuess.includes(word) && arrState === 0) {
      checkedArr.push(check(word, props.answer));
      oldGuess.push(word);
    }
    // If we hit the answer word
    if (word === props.answer) {
      props.gridChecker(props.gridNum, GridState.Won); // Make sure the Global Grid State of this Grid is Won
      arrState = 1; // Change the grid state to 1 (So we don't check any more words)
    }
  });

  // If we hit the max number of guesses, set grid state to lost
  if (props.guessArr.length === props.maxGuesses && arrState === 0) {
    props.gridChecker(props.gridNum, GridState.Lost); // Set the Global Grid State to lost
  }

  // If the Global Grid State isn't Playing, then the current guess will always be nothing
  if (![GridState.Playing, undefined].includes(props.gridStates[props.gridNum])) {
    currentGuess = "";
  }

  // The tr's of Grid
  const tableRows = Array(props.maxGuesses) // Create an array that is the max guesses
    .fill(undefined) // Fill it with nothingness
    .map((_, i) => {
      const wordRow = [...props.guessArr, currentGuess][i] ?? ""; // For each row, take the corresponding guess
      return (
        <tr key={i}>{letterDivs(wordRow, props.wordLength, checkedArr, oldGuess, arrState)}</tr>
      );
    })

  return (
    <div className="gridWrapper">
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  )
}