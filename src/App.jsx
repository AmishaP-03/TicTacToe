import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

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
                {/* <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/> */}
                <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
            </div>
            <Log turns={gameTurns}/>
        </main>
    );
}

export default App