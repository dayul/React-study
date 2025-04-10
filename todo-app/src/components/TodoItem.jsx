import { TodoItemContainer, TodoTitle, DeleteButton } from '../styles/components/TodoItem';

export default function TodoItem({
  id,
  listId,
  title,
  done,
  removeTodoFromList,
  toggleCompletionFromTodoList,
}) {
  return (
    <TodoItemContainer>
      <TodoTitle
        style={done ? { textDecoration: "line-through" } : {}}
        onClick={() => {
          toggleCompletionFromTodoList(listId, id);
        }}
      >
        {title}
      </TodoTitle>
      <DeleteButton onClick={() => removeTodoFromList(listId, id)}>삭제</DeleteButton>
    </TodoItemContainer>
  );
}