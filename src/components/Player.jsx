import { useState } from "react"

export default function Player({name, symbol}) {
    const [isEditing, setIsEditing] = useState(false);

    function handleEditButtonClick() {
        setIsEditing(true);
    }

    return (
        <>
            <li>
                <span className="player">
                    {isEditing
                    ? <input type="text" required></input>
                    : <span className="player-name">{name}</span>}
                    <span className="player-symbol">{symbol}</span>
                </span>
                <button onClick={handleEditButtonClick}>Edit</button>
            </li>
        </>
    )
}