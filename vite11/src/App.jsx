export default function App() {
  const [name, setName] = useState("");
  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <Counter intialCount={0} />
    </>
  );
}
