import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (<button className="square" onClick={props.onClick}>
        {props.value}
    </button >)
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />);
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            player: 'X',
            history: [Array(9).fill(null)]
        };
    }
    handleClick(i) {
        const squ = this.state.squares.slice();
        const his = this.state.history.slice();
        if (squ[i] !== null || calculateWinner(squ)) return;
        his.push(squ);
        squ[i] = this.state.player;
        this.setState({
            squares: squ,
            player: this.state.player === 'X' ? 'O' : 'X',
            history: his
        });
    }
    jumpTo(step) {
        this.setState({
            squares: this.state.history[step],
            player: step % 2 === 0 ? 'X' : 'O',
            history: this.state.history.slice(0, step + 1)
        });
    }
    render() {
        const winner = calculateWinner(this.state.squares);
        const status = winner ? `Winner: ${winner}` : `Next player: ${this.state.player}`;
        const his = this.state.history.slice();
        const moves = his.map((step, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

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