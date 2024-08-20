import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD= [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

const PLAYER=
  {
    X:"Player1", 
    O:'Player2'
}

function derivedActivePlayer(gameTurns){
  let CurrentPlayer='X';

  if(gameTurns.length >0 && gameTurns[0].player==='X'){
    CurrentPlayer='O';
  }
  return CurrentPlayer;
}

function derivedWinner(gameBoard,players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol= gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol= gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol= gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner = players[firstSquareSymbol] ;
    }
  }
  return winner;
}

function derivedGameBoard(gameTurns){
  let gameBoard= [...INITIAL_GAME_BOARD.map(array=>[...array])];

  for(const Turn of gameTurns){
      const {square, player}=Turn;
      const {row, col}=square;

      gameBoard[row][col]=player;
  }
  return gameBoard;
}
function App() {  
  const [players,Setplayers]= useState(PLAYER);
  const [gameTurns,SetGameTurns]= useState([]);
  const ActivePlayer= derivedActivePlayer(gameTurns);
  const gameBoard=derivedGameBoard(gameTurns);
  
  function handleActivePlayer(rowIndex,colIndex){
  
      SetGameTurns((PrevGame=>{
        
        const CurrentPlayer= derivedActivePlayer(PrevGame);
        const UpdatedTurns= [
            {square: {row: rowIndex, col: colIndex}, player: CurrentPlayer},
          ...PrevGame
        ];
        return UpdatedTurns;
      }));
  }

  const winner=derivedWinner(gameBoard,players);
  const hasDraw= gameTurns.length===9 && !winner;

  function Restart(){
    SetGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    Setplayers(prevplayers=>{
      return{
        ...prevplayers,
        [symbol]: newName
      }
    });
  }
  return (
    <main>
      <div id="game-container">
          <ol id="players" className="highlight-player">
              <Player intialName={PLAYER.X} symbol="X" IsActive={ActivePlayer==='X'} onChangeName={handlePlayerNameChange}/>
              <Player intialName={PLAYER.O} symbol="O" IsActive={ActivePlayer==='O'} onChangeName={handlePlayerNameChange}/>
          </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={Restart}/>}
      <GameBoard SetActive={handleActivePlayer} Board={gameBoard}/>
      </div>

     <Log turns={gameTurns}/>
     <p className="myname">Designed with ❤️ by @_Pratap_7744</p>
    </main>
  )
}

export default App
