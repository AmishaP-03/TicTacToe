const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

// export default function GameBoard({onSelectSquare, activePlayerSymbol}) {
export default function GameBoard({onSelectSquare, turns}) {
    // LIFTING THIS STATE UP TO THE APP COMPONENT SO THAT IS CAN BE REUSED BY LOG COMPONENT AS WELL

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex) {
    //     // Handle the player turn switch logic in the parent
    //     onSelectSquare();

    //     // We have to update the game board while making sure not to lose the previous state.
    //     setGameBoard((previousGameBoard) => {
    //         /**
    //          * If our state is an object (which includes arrays as well), it should not be updated directly. Rather it should be updated in an immutable way.
    //          * This implies that the concerned state object should not be modified directly. Instead, we should first create its copy and update it.
    //          * This is because if we directly update the state object (previousGameBoard) here, then we will cause the old value in memory to update even before this scheduled state update  is executed by React.
    //          */
    //         const updatedBoard = [...previousGameBoard.map((innerArray) => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });
    // }

    // Build the game board from turns prop
    let gameBoard = initialGameBoard;

    for (const turn of turns) {
        // Object destructuring, should have the same name as defined in turn object
        const {square, player} = turn;
        const {row, col} = square;

        // We need not manage any other state here to update the game board
        // Thus gameboard is a derived state here, value computed from some other state
        // AIM: MANAGE AS LESS STATES AS POSSIBLE. REUSE EXISTING STATES TO THE MAX POSSIBLE EXTENT
        gameBoard[row][col] = player;
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}> {/* Good practice to add a key while outputting a dynamic list */}
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        {/* <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button> */}
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    );
}