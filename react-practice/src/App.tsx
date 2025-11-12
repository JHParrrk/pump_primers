import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JSXExample from "./pages/JsxExample/JsxExample";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./pages/todolist/todolist";

function App() {
  return (
    <Router>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />

        {/* 네비게이션 바 추가 */}
        <nav>
          <ul>
            <li>
              <Link to="/jsx-example">JSX 문법 페이지</Link>
            </li>
            <li>
              <Link to="/todo-list">할 일 목록 페이지</Link>
            </li>
          </ul>
        </nav>

        {/* 라우터(화면 전환) */}
        <Routes>
          {/* JSX 문법 예제 페이지 */}
          <Route path="/jsx-example" element={<JSXExample />} />
          <Route path="/todo-list" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
