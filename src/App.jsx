import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
    'X': 'Player 1',
    'O': 'Player 2'
};

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

/**
 * Not dependent on any of the variables inside App component function neither needs to be re-defined every time the component is re-initialised
 */
function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (!!gameTurns.length && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function deriveGameBoard(gameTurns) {
    // Build the game board from turns prop
    // let gameBoard = INITIAL_GAME_BOARD; // creating a shallow copy. Will create a problem when we try to reset the board after a match is finished
    let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])]; // Creating a deep copy of INITIAL_GAME_BOARD to make sure it remains unchanged and can be used while resetting the board.

    for (const turn of gameTurns) {
        // Object destructuring, should have the same name as defined in turn object
        const {square, player} = turn;
        const {row, col} = square;

        // We need not manage any other state here to update the game board
        // Thus gameboard is a derived state here, value computed from some other state
        // AIM: MANAGE AS LESS STATES AS POSSIBLE. REUSE EXISTING STATES TO THE MAX POSSIBLE EXTENT
        gameBoard[row][col] = player;

        // The above update to gameBoard will also make changes to INITIAL_GAME_BOARD because arrays are objects and hence are reference values in JS.
        // Both these variables point to the same location in memory. Hence to keep INITIAL_GAME_BOARD unaffected, we should create its shallow copy and use it for modifications.
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    let winner = undefined;
    for (const combinations of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
        const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
        const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }
    return winner;
}

function App() {
    // Store the player info as it is not logical to lift state from Player component to App component
    const [players, setPlayers] = useState(PLAYERS);

    // Game turns info (array of objects, each object will contain information like: a) the row and column indices of the square selected b) the player symbol which selected that square)
    const [gameTurns, setGameTurns] = useState([]);

    /**
     * OLD CODE:
     * const [activePlayer, setActivePlayer] = useState('X');
     */
    // No need to maintain a separate state to manage active player. Instead it can be derived from gameTurns state itself
    // Player with symbol X is the default active player
    const activePlayer = deriveActivePlayer(gameTurns);

    const gameBoard = deriveGameBoard(gameTurns);

    // App component will be re-excuted after every button select. So, we will check for winner after each turn directly, over here.
    const winner = deriveWinner(gameBoard, players);

    const hasDraw = gameTurns.length === 9 && !winner;

    // Switch turns when a square is selected
    function handleSelectSquare(rowIndex, colIndex) {
        // setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X'); NOT REQUIRED ANYMORE
        setGameTurns((currentTurns) => {
            // We cannot depend on the other state to get the value of activePlayer as it might not be the updated value. So we'll compute the value of active player here.
            // Trick to avoid merging of two states
            const currentPlayer = deriveActivePlayer(currentTurns);
            const updatedTurns = [
                {
                    square: {row: rowIndex, col: colIndex},
                    player: currentPlayer
                },
                ...currentTurns
            ];
            return updatedTurns;
        });
    }

    function handleGameRestart() {
        // gameTurns is the single source of truth for this complete application. Hence, to restart the game, we must reset it to []
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers((currentPlayers) => {
            return {
                ...currentPlayers,
                [symbol]: newName
            }
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    {/* A very powerful feature of React - build super complex reusable components which do not interfere with each other: */}
                    {/* React creates one isolated instance of component Player */}
                    <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange}/>
                    {/* React creates another isolated instance of component Player */}
                    {/* Thus, we we click on edit button against a player, it opens up an input box only for that specific player */}
                    <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange}/>
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleGameRestart}/>}
                {/* <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/> */}
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
            </div>
            <Log turns={gameTurns}/>
        </main>
    );
}

export default App;