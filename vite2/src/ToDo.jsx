import { useState } from "react";
const TodoFunction = ({ setTodoList }) => {
  const [todoItem, setTodoItem] = useState("");

  const handleAddItem = (todoItem) => {
    setTodoList((item) => [...item, todoItem]);
    setTodoItem("");
  };
  return (
    <div>
      <h1>New Todo</h1>
      <input
        type="text"
        value={todoItem}
        onChange={(e) => {
          setTodoItem(e.target.value);
        }}
      />
      <button onClick={() => handleAddItem(todoItem)}>Add a todo</button>
    </div>
  );
};

export default TodoFunction;
