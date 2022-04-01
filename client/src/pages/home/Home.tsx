import React, { useEffect } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import { init } from 'ityped';

const githubHandler = () => {
    window.open("https://github.com/Vio-Eli/modular_octowordle")
}

export default function Home() {

    useEffect(() => {
        const ularSpan = document.querySelector('#ular');
        init(ularSpan!, {
            showCursor: false,
            strings: ["ULAR"]
        });
    }, []);

    return (
        <div className='homeWrapper'>
            <div className='headerDiv'>
                <span id="mod" style={ { color: "#e07680" } }>MOD 
                <span id="ular"></span>
                </span> 
                <span id="wordle" style={ { color: "#64da7c" } }>WORDLE</span>
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
                        <td className='left view' onClick={githubHandler}><div> view </div></td>
                        <td className='right github' onClick={githubHandler}><div> github </div></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
