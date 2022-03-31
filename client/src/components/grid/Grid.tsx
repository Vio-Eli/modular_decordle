import { useRef, Ref, useState, useEffect } from 'react';
import React from 'react';
import './Grid.scss';
import { TypeOfTag } from 'typescript';
import check, { checked } from '../../utils/check';

interface GridProps {
  answer: string,
  gridChecker(gridNum: number, gridState: GridState): void,
  currentGuess: string,
  guessArr: string[],
  maxGuesses: number,
  wordLength: number,
  gridNum: number,
  gridStates: number[]
}

export enum GridState {
  Playing,
  Won,
  Lost
}

function letterDivs(wordRow: string, wordLength: number, checkedArr: checked[][], oldGuess: string[], arrState: number) {
  let i: number;
  if ((i = oldGuess.indexOf(wordRow)) !== -1 && wordRow.length > 0) {
    return checkedArr[i].map((tup, i) => {
      let color: string = tup.color!;
      return (
        <td key={i} style={{ backgroundColor: (color) }}> {tup.letter.toUpperCase()}</td>
      );
    });
  } else if (arrState === 0) {
    let word: string[] = wordRow.split("");
    return word
      .concat(Array(wordLength).fill(""))
      .slice(0, wordLength)
      .map((letter, i) => {
        return (
          <td key={i} >{letter.toUpperCase()}</td>
        );
      });
  } else {
    let word: string[] = Array(wordLength).fill("");
    return word
      .map((letter, i) => {
        return (
          <td key={i} >{letter}</td>
        );
      });
  }
}

export default function Grid(props: GridProps) {

  let currentGuess: string = props.currentGuess;

  let oldGuess: string[] = [];
  let checkedArr: checked[][] = [];

  let arrState: number = 0;

  props.guessArr.forEach((word, i) => {
    if (!oldGuess.includes(word) && arrState === 0) {
      checkedArr.push(check(word, props.answer));
      oldGuess.push(word);
    }
    if (word === props.answer) {
      props.gridChecker(props.gridNum, GridState.Won);
      arrState = 1;
    }
  });

  if (props.guessArr.length === props.maxGuesses) {
    props.gridChecker(props.gridNum, GridState.Lost);
  }

  if (![GridState.Playing, undefined].includes(props.gridStates[props.gridNum])) {
    currentGuess = "";
  }

  const tableRows = Array(props.maxGuesses)
    .fill(undefined)
    .map((_, i) => {
      const wordRow = [...props.guessArr, currentGuess][i] ?? "";
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