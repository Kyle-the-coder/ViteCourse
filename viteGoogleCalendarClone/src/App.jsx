import { useState } from "react";
import Calendar from "./components/Calendar.jsx";

function App() {
  const newDate = new Date();
  const [currentDate, setCurrentDate] = useState(newDate);
  return <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />;
}

export default App;
