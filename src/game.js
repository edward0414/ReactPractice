import React, { Component } from 'react';
import './index.css';
import Board from './board';


class Game extends React.Component {
    render() {
        return(
            <div className='game'>
                <div className='game-board'>
                    <Board />
                </div>
                <div className='game-info'>
                    <div>{/*status*/}</div>
                    <div>{}</div>
                </div>
            </div>
        );
    }
}

export default Game;