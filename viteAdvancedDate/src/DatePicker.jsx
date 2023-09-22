import { eachDayOfInterval, startOfMonth, endOfMonth, format } from "date-fns";

export function DatePicker({ currentDate, setCurrentDate }) {
  const currentMonthDateFormat = format(currentDate, "MMMM - yyyy");
  const year = format(currentDate, "yyyy");
  const month = format(currentDate, "MM");
  const startDate = startOfMonth(new Date(year, month - 1, 1));
  const endDate = endOfMonth(new Date(year, month - 1, 1));
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button className="prev-month-button month-button">&larr;</button>
        <div className="current-month">{currentMonthDateFormat}</div>
        <button className="next-month-button month-button">&rarr;</button>
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
              className="date"
              onClick={() => setCurrentDate(date)}
            >
              {dayOfMonth}
            </button>
          );
        })}
      </div>
    </div>
  );
}
