import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
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

function App() {
    // Game turns info (array of objects, each object will contain information like: a) the row and column indices of the square selected b) the player symbol which selected that square)
    const [gameTurns, setGameTurns] = useState([]);

    /**
     * OLD CODE:
     * const [activePlayer, setActivePlayer] = useState('X');
     */
    // No need to maintain a separate state to manage active player. Instead it can be derived from gameTurns state itself
    // Player with symbol X is the default active player
    const activePlayer = deriveActivePlayer(gameTurns);

    // Build the game board from turns prop
    let gameBoard = initialGameBoard;

    for (const turn of gameTurns) {
        // Object destructuring, should have the same name as defined in turn object
        const {square, player} = turn;
        const {row, col} = square;

        // We need not manage any other state here to update the game board
        // Thus gameboard is a derived state here, value computed from some other state
        // AIM: MANAGE AS LESS STATES AS POSSIBLE. REUSE EXISTING STATES TO THE MAX POSSIBLE EXTENT
        gameBoard[row][col] = player;
    }

    // App component will be re-excuted after every button select. So, we will check for winner after each turn directly, over here.
    let winner = undefined;
    for (const combinations of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
        const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
        const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = firstSquareSymbol;
        }
    }

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
    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    {/* A very powerful feature of React - build super complex reusable components which do not interfere with each other: */}
                    {/* React creates one isolated instance of component Player */}
                    <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
                    {/* React creates another isolated instance of component Player */}
                    {/* Thus, we we click on edit button against a player, it opens up an input box only for that specific player */}
                    <Player initialName="Player 2" symbol="0" isActive={activePlayer === 'O'}/>
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} />}
                {/* <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/> */}
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
            </div>
            <Log turns={gameTurns}/>
        </main>
    );
}

export default App