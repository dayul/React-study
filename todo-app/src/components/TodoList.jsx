import { useState } from "react";
import { v4 } from "uuid"; // 임시 primary key
import TodoItem from "./TodoItem";

export default function TodoList({
  id,
  title,
  todos,
  removeTodoList,
  addTodoToList,
  removeTodoFromList,
  toggleCompletionFromTodoList,
}) {
  // 제어 컴포넌트와 비제어 컴포넌트의 개념
  // 제어 컴포넌트 : 상태 사용(useState)
  // 비제어 컴포넌트 : useRef 사용
  const [todoTitle, setTodoTitle] = useState("");

  return (
    <div>
      <h1>{title}</h1>
      {/* 상태와 input 동기화 */}
      <input
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        type="text"
        placeholder="할 일을 입력하세요."
      />
      <button
        onClick={() => {
          // if(todoTitle.length >= 4) {
          //   alert("리스트의 최대 개수는 4개입니다.");
          //   return;
          // }
          addTodoToList(id, {
            id: v4(),
            title: todoTitle,
            done: false,
          });
          setTodoTitle("");
        }}
      >
        할일 추가
      </button>
      <hr style={{ color: "gray" }} />
      <button onClick={() => removeTodoList(id)}>리스트 삭제</button>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            listId={id}
            {...todo}
            removeTodoFromList={removeTodoFromList}
            toggleCompletionFromTodoList={toggleCompletionFromTodoList}
          />
        ))}
      </div>
    </div>
  );
}