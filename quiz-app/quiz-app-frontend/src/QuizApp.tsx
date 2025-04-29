import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateQuiz from "./components/CreateQuiz";
import ManageQuiz from "./components/ManageQuiz";
import QuizSolve from "./components/QuizSolve";

function QuizApp() {
  return (
     // 반드시 BrowserRouter 컴포넌트 요소를 이용하여 전부 감싸줘야 함 (즉, BrowserRouter가 최상위 컴포넌트여야 함)
    <BrowserRouter>
      <div>
        <header>
            <nav>
                <ul>
                    {/* 내부 페이지에서는 Link 태그, 외부 페이지(완전히 다른 페이지)에서는 a 태그 */}
                    <li><Link to="/" >홈 화면</Link></li>
                    <li><Link to="/quiz">퀴즈 풀기</Link></li>
                    <li><Link to="/manage">퀴즈 관리</Link></li>
                </ul>
            </nav>
        </header>
        <div>
            {/* 모든 Route 컴포넌트는 반드시 Routes 컴포넌트 내부에 위치하도록 함 */}
            <Routes>
                {/* Route 컴포넌트의 path는 경로, element에는 그릴 컴포넌트(혹은 요소) 전달 */}
                <Route path="/" element={<div>홈 화면 입니다.</div>} />
                <Route path="/quiz" element={<QuizSolve />} />
                <Route path="/manage" element={<ManageQuiz />} />
                <Route path="/create" element={<CreateQuiz />} />
            </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default QuizApp;
