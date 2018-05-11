import React, { Component } from 'react';
import './index.css';
import Board from './board';
import templates from './templates';


function isFinished(game) {
    
    let result = true;
    
    for (let i=0; i<game.length; i++) {
        if (result) {
            for (let t=0; t<game[i].length; t++) {
                if (!game[i][t]) {
                    result = false;
                    break
                }
            }   
        }
    }
    
    return result;
}

//To-Do
function checkViolation(game) {
    
    let result = null;
    //Check horizontal
    const num = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false
    }
    
    for (let x=0; )
    //Check vertical
    
    //Check section
    
    
    return null;
}


class Game extends React.Component {
    
    constructor(props) {
        super(props);
        let ind = Math.floor(Math.random() * 6);
        const game = templates[ind];
        this.state = {
            history: [{
                game: game,
                curMove: null,
            }],
            stepNum: 0,
            curNum: 1,
        };
    }
    
    //To-Do
    componentDidUpdate() {
        const history = this.state.history;
        const current = history[this.state.stepNum];
    }
    

    handleClick(x,y) { 
        const history = this.state.history.slice(0, this.state.stepNum + 1);
        const current = history[history.length -1]
        
        //make a copy of the game array
        const game = current.game.map((arr) => arr.slice());
        
        if (isFinished(game)||checkViolation(game)||game[x][y]) {
            return;
        }
        
        game[x][y] = this.state.curNum;
        
        var curMove = [x,y];
        
        this.setState({
            history: history.concat([{
                game: game,
                curMove: curMove,
            }]),
            stepNum: history.length
        });
    }
    

    undo() {
        if (this.state.stepNum > 0) {
            let step = this.state.stepNum;
            this.setState({
                stepNum: step - 1,
            });    
        }
    }
    
    
    restart() {
        this.setState({stepNum: 0});    
    }
    
    
    changeNum(num) {
        this.setState({curNum: num});
    }
    
    
    render() {
        
        const history = this.state.history;
        const current = history[this.state.stepNum];
        
        console.log(current.game);
        
        const numButton = [1,2,3,4,5,6,7,8,9].map((val) => {
            return(
                <li>
                    <button className="number" onClick={() => this.changeNum(val)}>
                        {val}
                    </button>
                </li>
            );
        })
        
        let status = 'Sudoku!';
//        if (winner) {
//            status = 'Winner: ' + winner;
//        } else {
//            status = "Next player: " + (this.state.xNext? 'X':'O');
//        }
        
        return(
            <div className='game'>
                <div className='game-board'>
                    <Board 
                        game={current.game} 
                        onClick={(x,y) => this.handleClick(x,y)}
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <div>{"Number Selected: " + this.state.curNum}</div>
                    <div>
                        {numButton}
                    </div>
                    <div>
                        <div>
                            <button onClick={()=> this.restart()}>Restart</button>
                        </div>
                        <div>
                            <button onClick={() => this.undo()}>Undo</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;