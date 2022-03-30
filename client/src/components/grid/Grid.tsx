import { Ref, useState } from 'react';
import React from 'react';
import './Grid.scss';
import { TypeOfTag } from 'typescript';
import check, { checked } from '../../utils/check';

interface GridProps {
  answer: string,
  tableRef: Ref<HTMLTableElement>,
  currentGuess: string,
  guessArr: string[],
  maxGuesses: number,
  wordLength: number,
}

/*function letterDivs(wordRow: string, wordLength: number) {
  let word: string[] = wordRow.split("");
  return word
    .concat(Array(wordLength).fill(""))
    .slice(0, wordLength)
    .map((letter, i) => {
      return(
        <td key={i} aria-live={"assertive"}>{letter.toUpperCase()}</td>
      );
    });
}*/

function letterDivs(wordRow: string, wordLength: number) {
  let i: number;
  if ((i = oldGuess.indexOf(wordRow)) !== -1) {
    return checkedArr[i].map((tup, i) => {
      let color: string = tup.color!;
      return(
        <td key={i} aria-live={"off"} style={{backgroundColor: (color)}}> {tup.letter.toUpperCase()}</td>
      );
    });
  } else {
    let word: string[] = wordRow.split("");
    return word
    .concat(Array(wordLength).fill(""))
    .slice(0, wordLength)
    .map((letter, i) => {
      return(
        <td key={i} aria-live={"assertive"}>{letter.toUpperCase()}</td>
      );
    });
  }
}

// Array for previously checked words
let oldGuess: string[] = []//["hinge"];
let checkedArr: checked[][] = [];//[[{letter: 'h', color: 'green'}, {letter: 'i', color: 'goldenrod'}, {letter: 'n', color: '#b59f3b'}, {letter: 'g', color: 'grey'}, {letter: 'e', color: 'gray'}]];

export default function Grid(props: GridProps) {

  props.guessArr.forEach((word, i) => {
    if (!oldGuess.includes(word)) {
      checkedArr.push(check(word, props.answer));
      oldGuess.push(word);
      //console.log(checkedArr);
    }
  });

  const tableRows = Array(props.maxGuesses)
  .fill(undefined)
  .map((_, i) => {
    const wordRow = [...props.guessArr, props.currentGuess][i] ?? "";
    return (
      <tr key={i}>{letterDivs(wordRow, props.wordLength)}</tr>
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