import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JSXExample from "./pages/JsxExample";
import logo from "./logo.svg";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* 네비게이션 바 추가 */}
        <nav>
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/jsx-example">JSX 문법 페이지</Link>
            </li>
          </ul>
        </nav>

        {/* 라우터(화면 전환) */}
        <Routes>
          {/* 기본 홈 화면 */}
          <Route
            path="/"
            element={
              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                  </p>
                  <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn React
                  </a>
                </header>
              </div>
            }
          />
          {/* JSX 문법 예제 페이지 */}
          <Route path="/jsx-example" element={<JSXExample />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;