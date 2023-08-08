const Counter = ({ count, setCount }) => {
  console.log(count);
  const handleCounter = () => {
    setCount((currentCount) => currentCount + 1);
  };
  return (
    <div>
      <div onClick={handleCounter}>Click to +1</div>
      <h1>The count is: {count}</h1>
    </div>
  );
};
export default Counter;
