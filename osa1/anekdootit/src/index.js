import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
    return (
        <button
            onClick={handleClick} type="button">
            {text}
        </button>
    )
}

const Votes = (props) => {
    return (
        <div>
            {props.item}
            <p>has {props.votes} votes </p>
        </div>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState([
        { upvote_count: 0 },
        { upvote_count: 0 },
        { upvote_count: 0 },
        { upvote_count: 0 },
        { upvote_count: 0 },
        { upvote_count: 0 }
    ])
    const [maxVoted, setMaxVoted] = useState(0)

    let currentMax = 0
   
    const anecdotesLength = anecdotes.length - 1;

    const handleAnecdoteClick = (props) => {
        const randomNumber = Math.floor((Math.random() * anecdotesLength) + 0);
        const newAnecdote = {
            selected: randomNumber
        }
        setSelected(newAnecdote.selected)
    }

    const handleVoteClick = (props) => {
        const copyPoints = [...points]
        copyPoints[selected].upvote_count++
        setPoints(copyPoints)
        
        for (let i = 0; i < copyPoints.length; i++) {
            if (currentMax === null || currentMax < copyPoints[i].upvote_count) {
                currentMax = copyPoints[i].upvote_count
                const mostVoted = {
                    maxVoted: i
                }
                setMaxVoted(mostVoted.maxVoted)
            }
        }
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <p>has {points[selected].upvote_count} votes</p>
            <br />
            <Button handleClick={handleVoteClick} text='Vote' />
            <Button handleClick={handleAnecdoteClick} text='Show anecdote' />
            <h1>Anecdote with most votes</h1>
            <Votes item={props.anecdotes[maxVoted]} votes={points[maxVoted].upvote_count}/>

        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)