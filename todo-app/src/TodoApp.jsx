import { useState, useRef } from "react";
import { v4 } from "uuid"; // 임시 primary key
import { useImmer } from 'use-immer';

function TodoItem({
  id,
  listId,
  title,
  done,
  removeTodoFromList,
  toggleCompletionFromTodoList,
}) {
  return (
    <div>
      <span
        style={done ? { textDecoration: "line-through" } : {}}
        onClick={() => {
          toggleCompletionFromTodoList(listId, id);
        }}
      >
        {title}
      </span>
      <button onClick={() => removeTodoFromList(listId, id)}>삭제</button>
    </div>
  );
}

function TodoList({
  id,
  title,
  todos,
  removeTodoList,
  addTodoToList,
  removeTodoFromList,
  toggleCompletionFromTodoList
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

function TodoApp() {
  // const [todoLists, setTodoLists] = useState([]);
  const [todoLists, setTodoLists] = useImmer([]);

  // 상태값을 저장하지만, 화면에 노출시키지 않을 값들을 관리
  // useState()처럼 불필요한 리렌더링이 일어나지 않음 (효율적)
  // 일반적으로 Input 요소룰 저장할 때 사용
  const listTitleInputRef = useRef();

  const removeTodoList = function (listId) {
    setTodoLists(draft => {
      const index = draft.findIndex(list => list.id === listId);
      if(index !== -1) {
        draft.splice(index, 1);
      }
    })
  };

  const addTodoToList = function (listId, todo) {
    setTodoLists(draft => {
      const index = draft.findIndex(list => list.id === listId);
      draft[index].todos.push(todo);
    })
  };

  const removeTodoFromList = function (listId, todoId) {
    setTodoLists(draft => {
      const list = draft.find(list => list.id === listId);
      if(list) {
        list.todos = list.todos.filter(todo => todo.id !== todoId);
      }
    })
  };

  const toggleCompletionFromTodoList = function (listId, todoId) {
    setTodoLists(draft => {
      const list = draft.find(list => list.id === listId);
      if(list) {
        const todo = list.todos.find(todo => todo.id === todoId);
        todo.done = !todo.done;
      }
    })
  };

  return (
    <div>
      <h1>Todo List</h1>
      {/* ref를 주면 자동 연결 */}
      <input
        ref={listTitleInputRef}
        type="text"
        placeholder="새로운 리스트의 제목을 입력하세요"
      />
      <button
        onClick={() => {
          const title = listTitleInputRef.current.value;
          if (title.trim().length > 0) {
            setTodoLists((prev) => [
              ...prev,
              {
                id: v4(), // 랜덤 문자열
                title,
                todos: [],
              },
            ]);
            listTitleInputRef.current.value = "";
          } else {
            alert("리스트의 제목을 입력하세요!");
          }
        }}
      >
        리스트 추가
      </button>
      <div>
        {todoLists.map((list) => {
          return (
            <TodoList
              key={list.id}
              {...list}
              removeTodoList={removeTodoList}
              addTodoToList={addTodoToList}
              removeTodoFromList={removeTodoFromList}
              toggleCompletionFromTodoList={toggleCompletionFromTodoList}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TodoApp;
