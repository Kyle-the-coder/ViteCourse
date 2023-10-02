import { useState } from "react";

export default function AddEventModal({
  setIsAddEventShown,
  eventName,
  setEventName,
  isAllDay,
  setIsAllDay,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  eventColor,
  setEventColor,
  dateOfEvent,
  setIsSubmitted,
  isSubmitted,
}) {
  function handleEventInfo(e) {
    e.preventDefault();
    const eventInfo = {
      eventName: eventName,
      isAllDay: isAllDay,
      startTime: startTime,
      endTime: endTime,
      eventColor: eventColor,
      dateOfEvent: dateOfEvent,
    };
    const storeEventInfo = JSON.stringify(eventInfo);
    const getInfo = localStorage.getItem(dateOfEvent);

    if (getInfo === null) {
      const newArray = [storeEventInfo];
      localStorage.setItem(dateOfEvent, JSON.stringify(newArray));
    } else {
      const newArray = JSON.parse(getInfo);
      newArray.push(storeEventInfo);
      localStorage.setItem(dateOfEvent, JSON.stringify(newArray));
    }
    setIsAddEventShown(false);
    setIsSubmitted(!isSubmitted);
  }
  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-body">
        <div className="modal-title">
          <div>Add Event</div>
          <small>6/8/23</small>
          <button
            className="close-btn"
            onClick={() => setIsAddEventShown(false)}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleEventInfo}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              name="all-day"
              id="all-day"
              defaultChecked={isAllDay}
              onChange={(e) => setIsAllDay(e.target.checked)}
            />
            <label htmlFor="all-day">All Day?</label>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="start-time">Start Time</label>
              <input
                type="time"
                name="start-time"
                id="start-time"
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="end-time">End Time</label>
              <input
                type="time"
                name="end-time"
                id="end-time"
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Color</label>
            <div className="row left">
              <input
                type="radio"
                name="color"
                value="blue"
                id="blue"
                defaultChecked={false}
                className="color-radio"
                onChange={(e) => setEventColor(e.target.value)}
              />
              <label htmlFor="blue">
                <span className="sr-only">Blue</span>
              </label>
              <input
                type="radio"
                name="color"
                value="red"
                id="red"
                className="color-radio"
                onChange={(e) => setEventColor(e.target.value)}
              />
              <label htmlFor="red">
                <span className="sr-only">Red</span>
              </label>
              <input
                type="radio"
                name="color"
                value="green"
                id="green"
                className="color-radio"
                onChange={(e) => setEventColor(e.target.value)}
              />
              <label htmlFor="green">
                <span className="sr-only">Green</span>
              </label>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-success" type="submit">
              Add
            </button>
            <button className="btn btn-delete" type="button">
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
