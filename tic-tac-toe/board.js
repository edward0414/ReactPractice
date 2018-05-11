import React, { Component } from 'react';
import './index.css';


function Square(props) {
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    
    renderSquare(i) {
        return <Square 
                   value={this.props.squares[i]}
                   onClick={() => this.props.onClick(i)}
                />;
    }
    
    render() {
        
        const board = [0,3,6].map((num) => {
            const squares = [num, num+1, num+2].map((val)=> this.renderSquare(val))
            
            return (
                <div className='board-row' key={num}>{squares}</div>
            );
        })
        
        return(
            <div>
                {board}
            </div>
        );
    }
}

export default Board;