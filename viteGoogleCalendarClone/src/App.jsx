import { useState } from "react";
import Calendar from "./components/Calendar.jsx";

function App() {
  const newDate = new Date();
  const [currentDate, setCurrentDate] = useState(newDate);
  return (
    <div>
      <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </div>
  );
}

export default App;
