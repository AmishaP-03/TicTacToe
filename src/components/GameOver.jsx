export default function GameOver({ winner }) {
    return (
        <div id="game-over">
            <h2>Game over!</h2>
            {winner ?
            <p>{winner} won!</p>
            : <p>It's a draw!</p>
            }
            <p><button>Rematch</button></p>
        </div>
    );
}