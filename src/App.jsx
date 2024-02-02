import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";

function App() {
    // Player with symbol X is the default active player
    const [activePlayer, setActivePlayer] = useState('X');

    // Switch turns when a square is selected
    function handleSelectSquare() {
        setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X');
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
                <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
            </div>
        </main>
    );
}

export default App
