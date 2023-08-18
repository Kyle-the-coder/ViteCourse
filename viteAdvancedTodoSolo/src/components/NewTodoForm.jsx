export function NewTodoForm({ newTodoName, setNewTodoName }) {
  return (
    <form id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input
        type="text"
        id="todo-input"
        value={newTodoName}
        onChange={(e) => setNewTodoName(e.target.value)}
      />
      <button onClick={() => addNewTodo(newTodoName)}>Add Todo</button>
    </form>
  );
}
