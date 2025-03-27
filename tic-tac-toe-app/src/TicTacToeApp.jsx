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

function checkWinner(tiles) {
  for (let i = 0; i < 9; i += 3) {
      if (tiles[i] !== null && tiles[i] === tiles[i + 1] && tiles[i] === tiles[i + 2]) {
          return tiles[i]
      }
  }
  for (let i = 0; i < 3; i++) {
      if (tiles[i] !== null && tiles[i] === tiles[i + 3] && tiles[i] === tiles[i + 6]) {
          return tiles[i]
      }
  }
  if (tiles[0] !== null && tiles[0] === tiles[4] && tiles[0] === tiles[8]) {
      return tiles[0]
  }
  if (tiles[2] !== null && tiles[2] === tiles[4] && tiles[2] === tiles[6]) {
      return tiles[2]
  }
  return null
}

// 타일 컴포넌트로 분리
function Tile({ type, turn, index, setTurn, setGameBoard }) {
  return (
    <button
      onClick={() => {
        if (type === null) {
          setGameBoard((board) => {
            // 로직
            const copy = [...board]; // 상태가 바뀔 때 리렌더링 되는데, 객체는 레퍼런스(주소)를 비교하기 때문에 리렌더링 하려면 새로 복사해서 생성
            copy[index] = turn;
            return copy;
          });
          setTurn((turn) => (turn === "o" ? "x" : "o"));
        }

      }}
      style={tileStyle}
    >
      {type !== null ? type : "-"}
    </button>
  );
}

function TicTacToeApp() {
  const [turn, setTurn] = useState("o");
  const [gameBoard, setGameBoard] = useState(Array(9).fill(null));

  // 의존 배열이 하나라도 바뀌면 함수 호출
  useEffect(() => {
    console.log(checkWinner(gameBoard))
  }, [gameBoard]) 

  return (
    <div>
      <h1>Current Turn: {turn}</h1>
      <h1>Next Turn: {turn === "o" ? "x" : "o"}</h1>
      <div style={boardStyle}>
        {gameBoard.map((tile, index) => {
          return (
            <Tile
              index={index}
              turn={turn}
              setTurn={setTurn}
              setGameBoard={setGameBoard}
              type={tile}
            />
          ); // true여서 가장 마지막 값 "-" 반환
        })}
      </div>
    </div>
  );
}

export default TicTacToeApp;
