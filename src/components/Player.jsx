import {useState} from 'react'

export default function Player({initialName, symbol}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleClick() {
        setIsEditing((editing) => !editing)
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className='player-name'>{playerName}</span>;
    if(isEditing) {
        editablePlayerName = <input value={playerName} onChange={handleChange} type='text'/>;
    }

    return (
        <li>
            <span className='player'>
                {editablePlayerName}
              <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleClick}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </li>
    )
}