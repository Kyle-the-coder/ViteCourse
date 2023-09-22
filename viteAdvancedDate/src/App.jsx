import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { format } from "date-fns";

function App() {
  const [isCalendarShown, setIsCalendarShown] = useState(false);
  const newDate = new Date();
  const [currentDate, setCurrentDate] = useState(newDate);
  const formattedDate = format(currentDate, "MMMM d'nd', yyyy");

  return (
    <>
      <div className="date-picker-container">
        <button
          className="date-picker-button"
          onClick={() => setIsCalendarShown(!isCalendarShown)}
        >
          {formattedDate}
        </button>
        {isCalendarShown && (
          <DatePicker
            setCurrentDate={setCurrentDate}
            currentDate={currentDate}
          />
        )}
      </div>
    </>
  );
}

export default App;
