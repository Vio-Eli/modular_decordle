import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className='homeWrapper'>
            <div className='headerDiv'>
                MOD WORDLE
            </div>
            <table>
                <tbody>
                    <tr id='authors'>
                        <td className='left cc'> <div>© 2022</div> </td>
                        <td className='right names'><div> Vio & Jason</div> </td>
                    </tr>
                    <tr id='playBtn'>
                        <td className='left play'>
                            <Link to='/game'>
                                <div>
                                    play
                                </div>
                            </Link>
                        </td>
                        <td className='right wordle'>
                            <Link to='/game'>
                                <div>
                                    mod wordle
                                </div>
                            </Link>
                        </td>
                    </tr>
                    <tr id='github'>
                        <td className='left view'><a href="https://github.com/Vio-Eli/modular_octowordle"><div> view </div></a></td>
                        <td className='right github'><a href="https://github.com/Vio-Eli/modular_octowordle"><div> github </div></a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
