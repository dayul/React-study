import { useState, useEffect } from "react";

const boardStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  gap: "4px",
  width: "300px",
  height: "300px",
};

const tileStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  fontWeight: "bold",
  background: "#eee",
  cursor: "pointer",
  border: "2px solid gray",
};

// o, x 타일 스타일 추가
const oStyle = {
  color: "white",
  background: "black",
}
const xStyle = {
  color: "black",
  background: "white",
}

function checkWinner(tiles) {
  for (let i = 0; i < 9; i += 3) {
    if (
      tiles[i] !== null &&
      tiles[i] === tiles[i + 1] &&
      tiles[i] === tiles[i + 2]
    ) {
      return tiles[i];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      tiles[i] !== null &&
      tiles[i] === tiles[i + 3] &&
      tiles[i] === tiles[i + 6]
    ) {
      return tiles[i];
    }
  }
  if (tiles[0] !== null && tiles[0] === tiles[4] && tiles[0] === tiles[8]) {
    return tiles[0];
  }
  if (tiles[2] !== null && tiles[2] === tiles[4] && tiles[2] === tiles[6]) {
    return tiles[2];
  }
  return null;
}

// 타일 컴포넌트로 분리
function Tile({ type, index, handleTileClick }) {

  let finalStyle
  if(type !== null) {
    if(type === 'o') finalStyle = {...tileStyle, ...oStyle};
    else finalStyle = {...tileStyle, ...xStyle}
  }

  return (
    <button
      onClick={() => handleTileClick(type, index)}
      style={finalStyle}
    >
      {type !== null ? type : "-"}
    </button>
  );
}

function TicTacToeApp() {
  const [turn, setTurn] = useState("o");
  const [gameBoard, setGameBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  // 의존 배열이 하나라도 바뀌면 함수 호출
  useEffect(() => {
    const currentWinner = checkWinner(gameBoard);

    if (currentWinner === null) {
      if(gameBoard.every(tile => tile !== null))
        setWinner("draw");
    } else {
      setWinner(currentWinner);
    }
  }, [gameBoard]);
  
  const handleTileClick = (type, index) => {
    if (type === null && winner === null) {
      setGameBoard((board) => {
        // 로직
        const copy = [...board]; // 상태가 바뀔 때 리렌더링 되는데, 객체는 레퍼런스(주소)를 비교하기 때문에 리렌더링 하려면 새로 복사해서 생성
        copy[index] = turn;
        return copy;
      });
      setTurn((turn) => (turn === "o" ? "x" : "o"));
    }
  }

  return (
    <div>
      {winner === null ? (
        <div>
          <h1>Current Turn: {turn}</h1>
          <h1>Next Turn: {turn === "o" ? "x" : "o"}</h1>
        </div>
      ) : (
        <div>
          {winner === "draw" ? (
            <h1>비겼습니다.</h1>
          ) : (
            // return하는 값이 1개여야 해서 묶어줌
            <h1>{winner}가 이겼습니다.</h1>
          )}
          <button onClick={() => {
            setTurn("o");
            setGameBoard(Array(9).fill(null));
            setWinner(null);
          }}>Reset</button>
        </div>
      )}
      <div style={boardStyle}>
        {gameBoard.map((tile, index) => {
          return (
            <Tile
              key={index}
              index={index}
              type={tile}
              handleTileClick={handleTileClick}
            />
          ); // true여서 가장 마지막 값 "-" 반환
        })}
      </div>
    </div>
  );
}

export default TicTacToeApp;
