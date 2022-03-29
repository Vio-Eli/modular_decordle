import { useRef } from 'react';
import './Grid.scss';

export default function Grid() {

  //set react table element reference with null as default value
  const tableRef = useRef<HTMLTableElement>(null);

  const letterDivs = ["", "", "", "", ""]
    .map((_, i) => {
      return (
        <td key={i} />
      );
    })

    const tableRows = Array(6)
    .fill(undefined)
    .map((_, i) => {
      return (
        <tr key={i}>{letterDivs}</tr>
      );
    })

  return (
    <div className="gridWrapper">
      <table ref={tableRef}>
          <tbody>{tableRows}</tbody>
        </table>
    </div>
  )
}
