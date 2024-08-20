// import { useState } from "react";


export default function GameBoard({SetActive,Board}){
  
//     const [gameBoard,SetGameBoard]=useState(initialGameBoard);
    
//     function handleboard(rowIndex,colIndex){
//         SetGameBoard((PrevGameBoard)=>{
//             const UpdatedGame= [...PrevGameBoard.map(innerArray=> [...innerArray])];
//             UpdatedGame[rowIndex][colIndex]= ActivePlayerSymbol;
//             return UpdatedGame;
//         });
//         SetActive();
//     }
    return(
        <ol id="game-board">
            {Board.map((row,rowIndex)=>(
               <li key={rowIndex}>
                <ol>
                    {row.map((playersymbol,colIndex)=>(
                        <li key={colIndex}>
                            <button onClick={()=>SetActive(rowIndex,colIndex)} disabled={playersymbol!==null}>{playersymbol}</button>
                        </li>
                    ))}
                </ol>
               </li>
            ))}
        </ol>
    );
}