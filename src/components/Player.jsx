import { useState } from "react"

export default function Player({initialName, symbol, isActive, onNameChange}) {
    // We do not want to lift this state up to App component because each time a player name is edited/saved, the whole App component will get executed which is unnecessary and unintended.
    // Also, Player component is being used twice in App component and every Player component should manage its own data (name etc).
    const [isEditing, setIsEditing] = useState(false);
    const [currentPlayerName, setPlayerName] = useState(initialName);

    function handleEditButtonClick() {
        setIsEditing(editing => !editing);

        // If isEditing is true, it means we have just clicked the button to stop editing and save. It is when we want to store the given name
        if (isEditing) {
            onNameChange(symbol, currentPlayerName);
        }
    }

    // React gives us an event object as argument when onChange is triggered
    function handleNameChange(event) {
        // event.target -> element that triggered this event, here 'input' element
        // event.target.value -> input element has a value propert which holds the data entered by user in the input field
        setPlayerName(event.target.value);
    }

    return (
        <>
            <li className={isActive ? 'active' : undefined}>
                <span className="player">
                    {isEditing
                    ? <input type="text" required value={currentPlayerName} onChange={handleNameChange}></input> // 2 way binding mechanism. Listening to change in input and updating it back to input value
                    // Post state update through function handleNameChange, the value prop will get updated with the latest player name
                    // Setting value of onChange prop makes the input field editable. Else, it would not have been possible to change the input value, since currentPlayerName was never updated
                    : <span className="player-name">{currentPlayerName}</span>}
                    <span className="player-symbol">{symbol}</span>
                </span>
                <button onClick={handleEditButtonClick}>{isEditing ? 'Save': 'Edit'}</button>
            </li>
        </>
    )
}