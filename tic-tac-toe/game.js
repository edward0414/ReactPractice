import React, { Component } from 'react';
import './index.css';
import Board from './board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function drawAlert(squares) {
    const winner = calculateWinner(squares);
    
    if (!winner) {
        let draw = true;
        for (var x=0; x<squares.length; x++) {
            if (!squares[x]) {
                draw = false;
                break
            }
        }

        if (draw) {
            alert("This game is a draw!");
        }
    }
}

class Game extends React.Component {
    
    constructor(props) {
        super(props);    
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                curMove: null,
            }],
            stepNum: 0,
            xNext: true,
        };
    }
    
    
    componentDidUpdate() {
        const history = this.state.history;
        const current = history[this.state.stepNum];
        
        drawAlert(current.squares);
    }
    
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNum + 1);
        const current = history[history.length -1]
        const squares = current.squares.slice() //make a copy of the squares array
        
        if (calculateWinner(squares)||squares[i]) {
            return;
        }
        squares[i] = this.state.xNext? 'X':'O';
        
        let x = Math.floor(i/3);
        let y = i % 3;
        var curMove = [x,y];
        
        const next = !(this.state.xNext);
        
        this.setState({
            history: history.concat([{
                squares: squares,
                curMove: curMove,
            }]),
            stepNum: history.length,
            xNext: next,
        });
    }
    
    
    jumpTo(step) {
        this.setState({
            stepNum: step,
            xNext: (step % 2) === 0,
        });
    }
    
    
    render() {
        
        const history = this.state.history;
        const current = history[this.state.stepNum];
        const winner = calculateWinner(current.squares);
        
        
        const moves = history.map((step, move) => {
            const desc = move? 'Go to move (' + history[move].curMove  + ')': 'Go to game start';
            
            if (move === this.state.stepNum) {
                return (
                    <li key={move}>
                        <button className='bold' onClick={()=> this.jumpTo(move)}>{desc}</button>
                    </li>
                )
                
            } else {
                return(
                <li key={move}>
                    <button onClick={()=> this.jumpTo(move)}>{desc}</button>
                </li>
            );
                
            }
        })
        
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = "Next player: " + (this.state.xNext? 'X':'O');
        }
        
        return(
            <div className='game'>
                <div className='game-board'>
                    <Board 
                        squares={current.squares} 
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <div>{moves}</div>
                </div>
            </div>
        );
    }
}

export default Game;