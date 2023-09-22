import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  addMonths,
} from "date-fns";
import { useState } from "react";

export function DatePicker({ currentDate, setCurrentDate }) {
  const [isSelected, setIsSelected] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(currentDate || new Date());

  const year = format(currentDate, "yyyy");
  const month = format(currentDate, "MM");
  const startDate = startOfMonth(new Date(year, month - 1, 1));
  const endDate = endOfMonth(new Date(year, month - 1, 1));
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  function handlePreviousMonth() {
    setVisibleMonth((currentMonth) => {
      return addMonths(currentMonth, -1);
    });
  }
  function handleNextMonth() {
    setVisibleMonth((currentMonth) => {
      return addMonths(currentMonth, 1);
    });
  }

  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button
          className="prev-month-button month-button"
          onClick={() => handlePreviousMonth()}
        >
          &larr;
        </button>
        <div className="current-month">
          {format(visibleMonth, "MMMM - yyyy")}
        </div>
        <button
          className="next-month-button month-button"
          onClick={() => handleNextMonth()}
        >
          &rarr;
        </button>
      </div>
      <div className="date-picker-grid-header date-picker-grid">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="date-picker-grid-dates date-picker-grid">
        {daysInMonth.map((date) => {
          const dayOfMonth = date.getDate();

          return (
            <button
              key={dayOfMonth}
              className={`date ${isSelected ? "selected" : ""}`}
              onClick={() => {
                setCurrentDate(date), handleDateClick(date);
              }}
            >
              {dayOfMonth}
            </button>
          );
        })}
      </div>
    </div>
  );
}
