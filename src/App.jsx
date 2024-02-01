import GameBoard from "./components/GameBoard";
import Player from "./components/Player";

function App() {
    return (
        <main>
            <div id="game-container">
                <ol id="players">
                    {/* A very powerful feature of React - build super complex reusable components which do not interfere with each other: */}
                    {/* React creates one isolated instance of component Player */}
                    <Player initialName="Player 1" symbol="X"/>
                    {/* React creates another isolated instance of component Player */}
                    {/* Thus, we we click on edit button against a player, it opens up an input box only for that specific player */}
                    <Player initialName="Player 2" symbol="0"/>
                </ol>
                <GameBoard />
            </div>
        </main>
    );
}

export default App
