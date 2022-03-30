import { Ref, useState } from 'react';
import React from 'react';
import './Grid.scss';
import { TypeOfTag } from 'typescript';
import check, { checked } from '../../utils/check';



interface GridProps {
  tableRef: Ref<HTMLTableElement>,
  currentGuess: string,
  guessArr: string[],
  maxGuesses: number,
  wordLength: number,
}

function letterDivs(wordRow: string, wordLength: number) {
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

// Array for previously checked words
let checkedArr: checked[] = [];

export default function Grid(props: GridProps) {

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