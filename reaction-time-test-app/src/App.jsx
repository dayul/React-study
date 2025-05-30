import { useState } from "react";

const MIN_DELAY_MS = 2000;
const MAX_ADDITIONAL_TIME = 1000;

const DEACTIVE_COLOR = "gray";
const ACTIVE_COLOR = "green";

const colorByState = {
  ready: DEACTIVE_COLOR,
  start: DEACTIVE_COLOR,
  test: ACTIVE_COLOR,
  end: DEACTIVE_COLOR,
};

// 스타일 객체 정의
const defaultButtonStyle = {
  width: 200,
  height: 50,
  fontSize: 26,
  color: "white",
  border: "0px",
  borderRadius: 10,
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  textAlign: "center",
};

const contentBoxStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "500px",
  padding: "30px",
  border: "2px solid black",
  borderRadius: "10px",
  backgroundColor: "white",
};

function App() {
  // 맨 처음 상태
  const [state, setState] = useState("ready");
  const [record, setRecord] = useState({
    start: null,
    end: null,
  });

  const backgroundColor = colorByState[state];
  let instruction;
  let actionButton;

  if (state === "ready") {
    instruction = <h1>버튼을 누르면 시작합니다.</h1>;
    actionButton = (
      <button
        style={{ ...defaultButtonStyle, backgroundColor }}
        onClick={() => {
          const randomTime = Math.random() * MAX_ADDITIONAL_TIME + MIN_DELAY_MS;
          setState("start");
          setTimeout(() => {
            setState("test");
            // start 기록 (객체이기 때문에)
            // setRecord(r => { return { ...r, start: Date.now }})
            setRecord((r) => ({ ...r, start: Date.now() })); // 처음에 start, end 값을 복사하고 start가 덮어씌워짐
          }, randomTime);
        }}
      >
        시작
      </button>
    );
  } else if (state === "start") {
    instruction = <h1>버튼이 녹색이 되면 누르세요.</h1>;
    actionButton = <button style={{ ...defaultButtonStyle, backgroundColor }}>클릭</button>;
  } else if (state === "test") {
    instruction = <h1>클릭하세요!</h1>;
    actionButton = (
      <button
        style={{ ...defaultButtonStyle, backgroundColor }}
        onClick={() => {
          setState("end");
          // end 기록
          setRecord((r) => ({ ...r, end: Date.now() }));
        }}
      >
        클릭
      </button>
    );
  } else if (state === "end") {
    // 렌더링 전에 setState함수를 호출하게 되면 리랜더링 무한반복임.... 절대 하지 말 것!

    // 최종 결과 계산
    const reactionTime = record.end - record.start;

    instruction = <h1>반응 속도: {reactionTime}ms</h1>;
    actionButton = (
      <button style={{ backgroundColor }} onClick={() => setState("ready")}>
        다시 시작
      </button>
    );
  }

  return (
    <div style={{...containerStyle, backgroundColor}}>
      <div style={contentBoxStyle}>
        {instruction}
        {actionButton}
      </div>
    </div>
  );
}

export default App;
