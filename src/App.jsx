import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import {useState} from "react";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }

    return currentPlayer
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    gameTurns.forEach(turn => {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    })

    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    let winner = null;
    WINNING_COMBINATIONS.forEach((c) => {
        const firstSymbol = gameBoard[c[0].row][c[0].column];
        const secondSymbol = gameBoard[c[1].row][c[1].column];
        const thirdSymbol = gameBoard[c[2].row][c[2].column];

        if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
            winner = players[firstSymbol];
        }
    })

    return winner;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);

    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);

            return  [ {square: { row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
        })
    }

    function handleNameChange(symbol, playerName) {
        setPlayers(prevState => {
            return {...prevState, [symbol]: playerName};
        })
    }

    function handleRestart() {
        setGameTurns([])
    }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={players['X']} symbol='X' isActive={activePlayer === 'X'} onChangeName={handleNameChange}></Player>
          <Player initialName={players['O']} symbol='O' isActive={activePlayer === 'O'} onChangeName={handleNameChange}></Player>
        </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}></GameOver>}
          <GameBoard board={gameBoard} onSelectSquare={(rowIndex, colIndex) => handleSelectSquare(rowIndex, colIndex)} activePlayerSymbol={activePlayer} />
      </div>
        <Log turns={gameTurns}></Log>
    </main>
  )
}

export default App
