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
    
    //Check horizontal
    for (let i=0; i<game.length; i++) {
        var counts = Array(10).fill(0);
        for (let t=0; t<game[i].length; t++) {
            if (game[i][t] && !counts[game[i][t]]) {
                counts[game[i][t]] = 1;

            } else if (!game[i][t]) {

            } else {
                return true;
            }
        }
    }
    
    //Check vertical
    for (let i=0; i<game[0].length; i++) {
        let counts = [];
        for (let t=0; t<game.length; t++) {
            if (game[t][i] && !counts[game[t][i]]) {
                counts[game[t][i]] = 1;
            } else if (!game[t][i]) {

            } else {
                return true;
            }
        }   
    }
    
    //Check section
    for (let i=0; i<7; i+=3) {
        for (let j=0; j<7; j+=3) {
            let counts = []
            for (let k=0; k<3; k++) {
                for (let l=0; l<3; l++) {
                    if (game[i+l][j+k] && !counts[game[i+l][j+k]]) {
                        counts[game[i+l][j+k]] = 1;
                    } else if (!game[i+l][j+k]) {
                        
                    } else {
                        return true;
                    }
                }
            }
        }
    }
    
    return false;
}


class Game extends React.Component {
    
    constructor(props) {
        super(props);
        let ind = Math.floor(Math.random() * 7);
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
        const violate = checkViolation(current.game);
        const isOver = isFinished(current.game);
        
        console.log("Violation?: ", violate);
        console.log("Over?: ", isOver);
        
        const numButton = [1,2,3,4,5,6,7,8,9].map((val) => {
            if (val === this.state.curNum) {
                return(
                    <li>
                        <button className="bold button" onClick={() => this.changeNum(val)}>
                            {val + " (Selected)"}
                        </button>
                    </li>
                );
            
            } else {
                return(
                    <li>
                        <button className="button" onClick={() => this.changeNum(val)}>
                            {val}
                        </button>
                    </li>
                );
            }
        })
        
        let status = 'You can solve this! I believe in you.';
        if (!violate && isOver) {
            status = 'Congratulation! You have solved the game.';
        } else if (violate) {
            status = 'Uh oh, that does not seem like a good move.';
        }
        
        return(
            <div className='game'>
                <div className='game-board'>
                    <Board 
                        game={current.game} 
                        onClick={(x,y) => this.handleClick(x,y)}
                    />
                </div>
                <div className='game-info'>
                    <div className="title bold">Sudoku</div>
                    <div className="text">{status}</div>
                    <div className="number">
                        {numButton}
                    </div>
                    <div>
                        <div>
                            <button onClick={()=> this.restart()}>Restart</button>
                        </div>
                        <div>
                            {this.state.stepNum>0? (<button onClick={() => this.undo()}>Undo</button>): (<button disabled>Undo</button>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;