import {
  addMonths,
  endOfDay,
  endOfMonth,
  endOfWeek,
  isBefore,
  isSameMonth,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { eachDayOfInterval, startOfWeek } from "date-fns/esm";
import React, { useMemo, useState } from "react";
import { useAsyncError } from "react-router-dom";
import { useEvents } from "../context/useEvent";
import { EventFormModal } from "../modals/EventFormModal";
import { cc } from "../utils/cc";
import { formatDate } from "../utils/formatDate";

export function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const calendarDays = useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
    const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth));
    return eachDayOfInterval({
      start: firstWeekStart,
      end: lastWeekEnd,
    });
  }, [selectedMonth]);
  return (
    <div className="calendar">
      <div className="header">
        <button className="btn" onClick={() => setSelectedMonth(new Date())}>
          Today
        </button>
        <div>
          <button
            className="month-change-btn"
            onClick={() => {
              setSelectedMonth((m) => subMonths(m, 1));
            }}
          >
            &lt;
          </button>
          <button
            className="month-change-btn"
            onClick={() => {
              setSelectedMonth((m) => addMonths(m, 1));
            }}
          >
            &gt;
          </button>
        </div>
        <span className="month-title">
          {formatDate(selectedMonth, { month: "long", year: "numeric" })}
        </span>
      </div>
      <div className="days">
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={day.getTime()}
            day={day}
            showWeekName={index < 7}
            selectedMonth={selectedMonth}
          />
        ))}
      </div>
    </div>
  );
}

type CalendarDayProps = {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
};

function CalendarDay({ day, showWeekName, selectedMonth }: CalendarDayProps) {
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const { addEvent } = useEvents();
  return (
    <div
      className={cc(
        "day",
        !isSameMonth(day, selectedMonth) && "non-month-day",
        isBefore(endOfDay(day), new Date()) && "old-month-day"
      )}
    >
      <div className="day-header">
        {showWeekName && (
          <div className="week-name">
            {formatDate(day, { weekday: "short" })}
          </div>
        )}
        <div className={cc("day-number", isToday(day) && "today")}>
          {formatDate(day, { day: "numeric" })}
        </div>
        <button
          className="add-event-btn"
          onClick={() => setIsNewEventModalOpen(true)}
        >
          +
        </button>
      </div>
      {/* <div className="events">
            <button className="all-day-event blue event">
              <div className="event-name">Short</div>
            </button>
            <button className="all-day-event green event">
              <div className="event-name">
                Long Event Name That Just Keeps Going
              </div>
            </button>
            <button className="event">
              <div className="color-dot blue"></div>
              <div className="event-time">7am</div>
              <div className="event-name">Event Name</div>
            </button>
          </div> */}
      <EventFormModal
        date={day}
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        onSubmit={() => null}
      />
    </div>
  );
}