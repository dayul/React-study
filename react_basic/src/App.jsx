// 함수 컴포넌트 정의 : 이름이 반드시 대문자로 시작
function App() {
  const arr = ["a", "b", "c"];
  const itemList = <ul>
    {arr.map(item => <li>{item}</li>)}
    {/* JSX 구간에서 주석은 이렇게 작성 */}
  </ul>


  return <div style={{ background: "green", color: "yellow"}}>
    {itemList}
  </div>
}

// default는 한번만 사용할 수 있기 때문에 import App from './App.jsx' 처럼 중괄호 없이 사용
export default App
