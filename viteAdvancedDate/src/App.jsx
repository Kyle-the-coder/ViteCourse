import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { format } from "date-fns";

function App() {
  const [isCalendarShown, setIsCalendarShown] = useState(false);
  const newDate = new Date();
  const formattedDate = format(newDate, "MMMM d'nd', yyyy");
  const [currentDate, setCurrentDate] = useState(formattedDate);

  return (
    <>
      <div className="date-picker-container">
        <button
          className="date-picker-button"
          onClick={() => setIsCalendarShown(!isCalendarShown)}
        >
          {currentDate}
        </button>
        {isCalendarShown && <DatePicker setCurrentDate={setCurrentDate} />}
      </div>
    </>
  );
}

export default App;
