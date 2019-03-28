import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Statistic = (props) => {
    return (
        <tr>
            <td colSpan="3">
            {props.text} 
            </td>
            <td colSpan="3">
            {props.value}
            </td>
        </tr>
    )
}
const Statistics = (props) => {
    console.log("*******", props.clicks.good);
    console.log("*Length: ", props.clicks.all);

    if (props.clicks.all === 0) {
        return (
            <div>
                <br />
                Ei yhtään palautetta annettu
                </div>
        )
    }
    return (
        <div>
            <h1>Statistiikka</h1>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <table>
                                <tbody>
                                    <Statistic text="hyvä" value={props.clicks.good} />
                                    <Statistic text="neutraali" value={props.clicks.neutral} />
                                    <Statistic text="huono" value={props.clicks.bad} />
                                    <Statistic text="yhteensä" value={props.clicks.all} />
                                    <Statistic text="keskiarvo" value={((props.clicks.good) * 1 + (props.clicks.neutral) * 0 + (props.clicks.bad) * -1) / props.clicks.all} />
                                    <Statistic text="positiivisia" value={`${(props.clicks.good / props.clicks.all) * 100} %`} />
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

const Button = ({ handleClick, text }) => (

    <button onClick={handleClick} type="button">
        {text}
    </button>
)

const App = (props) => {
    // tallenna napit omaan tilaansa
    const [clicks, setClicks] = useState({
        good: 0, neutral: 0, bad: 0, all: 0
    })

    const handleGoodClick = () => {

        const newClicks = {
            ...clicks,
            good: clicks.good + 1,
            all: clicks.all + 1

        }
        setClicks(newClicks)
        console.log("!!!!!!!", newClicks)
    }

    const handleNeutralClick = () => {
        const newClicks = {
            ...clicks,
            neutral: clicks.neutral + 1,
            all: clicks.all + 1
        }
        setClicks(newClicks)
    }

    const handleBadClick = () => {
        const newClicks = {
            ...clicks,
            bad: clicks.bad + 1,
            all: clicks.all + 1
        }
        setClicks(newClicks)
    }

    return (
        <div>
            <h1>anna palautetta</h1>
            <Button handleClick={handleGoodClick} text='hyvä' />
            <Button handleClick={handleNeutralClick} text='neutraali' />
            <Button handleClick={handleBadClick} text='huono' />

            <Statistics clicks={clicks} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));