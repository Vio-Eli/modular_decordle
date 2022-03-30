import { Ref, useState } from 'react';
import React from 'react';
import './Grid.scss';
import { TypeOfTag } from 'typescript';
import check, { checked } from '../../utils/check';

interface GridProps {
  answer: string,
  tableRef: Ref<HTMLTableElement>,
  gridChecker(gridNum: number, gridState: GridState): void,
  currentGuess: string,
  guessArr: string[],
  maxGuesses: number,
  wordLength: number,
}

export enum GridState {
  Playing,
  Won,
  Lost
}

function letterDivs(wordRow: string, wordLength: number, gridState: GridState) {
  let i: number;
  if ((i = oldGuess.indexOf(wordRow)) !== -1) {
    return checkedArr[i].map((tup, i) => {
      let color: string = tup.color!;
      return(
        <td key={i} style={{backgroundColor: (color)}}> {tup.letter.toUpperCase()}</td>
      );
    });
  } else {
    let word: string[] = wordRow.split("");
    return word
    .concat(Array(wordLength).fill(""))
    .slice(0, wordLength)
    .map((letter, i) => {
      return(
        <td key={i} >{letter.toUpperCase()}</td>
      );
    });
  }
}

// Array for previously checked words
let oldGuess: string[] = [];
let checkedArr: checked[][] = [];
let State: GridState = GridState.Playing;

export default function Grid(props: GridProps) {

  let currentGuess: string = props.currentGuess;

  props.guessArr.forEach((word, i) => {
    if (!oldGuess.includes(word)) {
      checkedArr.push(check(word, props.answer));
      oldGuess.push(word);

      if (word === props.answer) {
        State = GridState.Won;
        props.gridChecker(0, State);
      }
    }
  });

  if (props.guessArr.length === props.maxGuesses) {
    State = GridState.Lost;
    props.gridChecker(0, State);
  }

  if (State !== GridState.Playing) {
    currentGuess = "";
  }

  const tableRows = Array(props.maxGuesses)
  .fill(undefined)
  .map((_, i) => {
    const wordRow = [...props.guessArr, currentGuess][i] ?? "";
    return (
      <tr key={i}>{letterDivs(wordRow, props.wordLength, State)}</tr>
    );
  })

  return (
    <div className="gridWrapper">
      <table ref={props.tableRef}>
          <tbody>{tableRows}</tbody>
        </table>
    </div>
  )
}