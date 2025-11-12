import React, { useState, useEffect } from "react";
import "./todolist.css"; // 컴포넌트와 동일한 위치에 있는 CSS 파일을 가져옵니다.

// Todo 항목에 대한 타입 정의
interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  createdAt: string; // 할 일 생성 시각
}

const TodoList: React.FC = () => {
  // - useState 초기화 로직 수정 -
  const [todos, setTodos] = useState<Todo[]>(() => {
    // 컴포넌트가 처음 생성될 때 localStorage에서 데이터를 읽어와 초기 상태로 설정합니다.
    const savedTodos = localStorage.getItem("react-todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  const [inputValue, setInputValue] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // --- 로컬 스토리지 연동 Hooks (저장만 담당) ---
  // 1. 데이터를 불러오는 useEffect는 이제 필요 없으므로 삭제합니다.

  // 2. todos 상태가 변경될 때 localStorage에 저장하는 로직만 남깁니다.
  useEffect(() => {
    localStorage.setItem("react-todos", JSON.stringify(todos));
  }, [todos]);

  // --- 현재 시각을 1초마다 업데이트하는 Hook ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => {
      clearInterval(timer);
    };
  }, []);

  // --- 할 일 관리 함수들 ---
  const addTodo = (): void => {
    if (inputValue.trim() === "") return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: inputValue,
        isCompleted: false,
        createdAt: new Date().toLocaleString("ko-KR"),
      },
    ]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const toggleComplete = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteAll = (): void => {
    setTodos([]);
  };

  return (
    <div className="todo-container">
      <input
        type="text"
        id="todo-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하세요..."
      />
      {todos.length === 0 ? (
        <p id="todo-list-empty-message">현재 할 일이 없습니다.</p>
      ) : (
        <ul id="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.isCompleted ? "complete" : ""}>
              <button
                className="toggle-btn"
                onClick={() => toggleComplete(todo.id)}
              ></button>
              <div className="todo-item-content">
                <span className="todo-text">{todo.text}</span>
                <span className="todo-timestamp">{todo.createdAt}</span>
              </div>
              <button
                className="delete-item-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
      {todos.length > 0 && (
        <div className="delete-btn-wrapper">
          <button onClick={deleteAll}>전체 삭제</button>
        </div>
      )}
      <div className="current-time-wrapper">
        현재 시각: {currentTime.toLocaleString("ko-KR")}
      </div>
    </div>
  );
};

export default TodoList;
