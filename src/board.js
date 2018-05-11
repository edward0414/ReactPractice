import React, { Component } from 'react';
import './index.css';


function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


class Board extends React.Component {
    
    renderSquare(x,y) {
        return(
            <Square
                value={this.props.game[x][y]}
                X={x}
                Y={y}
                onClick={()=> this.props.onClick(x,y)}  
            />
        );
    }
    
    render () {
        
        const board = [0,1,2].map((y) => { //y-related
            const row = [0,1,2].map((x) => { //x-related
                const section = [0,1,2].map((num) => { // building a secction
                    const squares = [0, 1, 2].map((val)=> this.renderSquare(y*3+num, x*3+val))

                    return (
                        <div className='board-row' key={num}>{squares}</div>
                    );
                })
                
                return (
                    <div className='section'>
                        {section}
                    </div>);
            })
            
            return (
                <div className='row'>
                    {row}
                </div>);
            
        });
        
        return(
            <div>
                {board}
            </div>
        );
    }
}

export default Board;