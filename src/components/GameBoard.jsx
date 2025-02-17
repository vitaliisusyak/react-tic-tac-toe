export default function GameBoard({onSelectSquare, board}) {
    return (
        <ol id="game-board">
            {board.map((row, index) => <li key={index}>
                <ol>
                    {row.map((playerSymbol, cellIndex) =>
                        <li key={cellIndex}>
                            <button disabled={playerSymbol} onClick={() => onSelectSquare(index, cellIndex)}>{playerSymbol}</button>
                        </li>)}
                </ol>
            </li>)}
        </ol>
    )
};