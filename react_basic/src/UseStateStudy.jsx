import { useState } from 'react';
// Hook : 함수인데 이름이 "use"로 시작하는 특수한 역할을 가진 함수
// useState, useEffect, useRef 같은 hook이 존재 (외에도 다른 hook이 있음)

// // useState : 상태를 관리해주는 함수
// function UseStateStudy() {

//     // useState(초기값)
//     // 초기에는 [0, setterfunction] 이렇게 생긴 배열을 반환
//     // 배열 비구조화 할당을 함 
//     const [count, setCount] = useState(0);      

//     return <div>
//         {count}
//         <button onClick={() => setCount(c => c + 1)}>+</button>
//         <button onClick={() => setCount(c => c - 1)}>-</button>
//     </div> 
// }

function UseStateStudy() {
    // ReRendering 됨
    const [data, setData] = useState({ count: 0});      

    return <div>
        {data.count}
        <button onClick={() => setData(prev => {
            return { ...prev, count: prev.count + 1 }       // 객체인 경우 새 객체를 만들어야 함(복사)
        })}>+</button>
    </div> 
}

export default UseStateStudy