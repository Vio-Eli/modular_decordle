import { Ref } from 'react';
import React from 'react';
import './Grid.scss';
import { TypeOfTag } from 'typescript';

interface GridProps {
  tableRef: Ref<HTMLTableElement>,
  currentGuess: string,
  guessArr: string[],
  maxGuesses: number,
  wordLength: number
}

export default function Grid(props: GridProps) {

  //set react table element reference with null as default value

  const tableRows = Array(props.maxGuesses)
  .fill(undefined)
  .map((_, i) => {
    const wordRow = [...props.guessArr, props.currentGuess][i] ?? "";
    const word = wordRow.split("");
    const letterDivs = word
    .concat(Array(props.wordLength).fill(""))
    .slice(0, props.wordLength)
    .map((letter, i) => {
      return(
        <td key={i}>{letter}</td>
      );
    });
    return (
      <tr key={i} aria-live={"assertive"}>{letterDivs}</tr>
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