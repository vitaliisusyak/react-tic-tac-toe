import {useState} from 'react'

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard)

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedGameBoard[rowIndex][colIndex] = 'X';

            return updatedGameBoard
        })
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row, index) => <li key={index}>
                <ol>
                    {row.map((playerSymbol, cellIndex) =>
                        <li key={cellIndex}>
                            <button onClick={() => handleSelectSquare(index, cellIndex)}>{playerSymbol}</button>
                        </li>)}
                </ol>
            </li>)}
        </ol>
    )
};