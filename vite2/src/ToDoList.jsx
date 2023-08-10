const TodoList = ({ todoList, setTodoList }) => {
  const handleDeleteItem = (itemName) => {
    const newList = todoList.filter((item) => item !== itemName);
    setTodoList(newList);
  };
  return (
    <div>
      {todoList.map((item, index) => {
        return (
          <div key={index}>
            <input type="checkbox" id="todoItem" />
            <label htmlFor="todoItem">{item}</label>
            <button onClick={() => handleDeleteItem(item)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
