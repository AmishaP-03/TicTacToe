import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleUpdate(rowIndex, colIndex) {
        // We have to update the game board while making sure not to lose the previous state.
        setGameBoard((previousGameBoard) => {
            /**
             * If our state is an object (which includes arrays as well), it should not be updated directly. Rather it should be updated in an immutable way.
             * This implies that the concerned state object should not be modified directly. Instead, we should first create its copy and update it.
             * This is because if we directly update the state object (previousGameBoard) here, then we will cause the old value in memory to update even before this scheduled state update  is executed by React.
             */
            const updatedBoard = [...previousGameBoard.map((innerArray) => [...innerArray])];
            updatedBoard[rowIndex][colIndex] = 'X';
            return updatedBoard;
        })
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => handleUpdate(rowIndex, colIndex)}>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    );
}