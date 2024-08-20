import { useState } from "react";

export default function Player({intialName,symbol, IsActive, onChangeName}){

    const [IsEditing, SetIsEditing]=useState(false);
    const [playerName,SetplayerName]=useState(intialName);

    function handleedit(){
        SetIsEditing(editing=> !editing);

        if(IsEditing){
            onChangeName(symbol,playerName);
        }
    }

    function handlePlayerName(event){
        SetplayerName(event.target.value);
    }
    let editplayerName= <span className="player-name">{playerName}</span>;
    if(IsEditing){
        editplayerName= <input type="text" required value={playerName} onChange={handlePlayerName}/>
    }

    return(
        <li className={IsActive? 'active':undefined}>
            <span className="player">
            {editplayerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleedit}>{IsEditing?"Save":"Edit"}</button>
      </li>
    );
}