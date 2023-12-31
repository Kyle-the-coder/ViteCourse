import { useEffect, useState } from "react";

export default function EditEventModal({
  setIsEditEventShown,
  setEventName,
  setIsAllDay,
  setStartTime,
  setEndTime,
  setEventColor,
  isAllDay,
  singleEventInfo,
  eventName,
  startTime,
  endTime,
  eventColor,
  dateOfEvent,
}) {
  const [isNameFilled, setIsNameFilled] = useState(false);
  function handleEventInfo(e) {
    e.preventDefault();
    console.log("name", eventName);
    if (eventName === "") {
      setIsNameFilled(true);
      return;
    } else if (eventName !== "") {
      const eventInfo = {
        key: singleEventInfo.key,
        eventName: eventName,
        isAllDay: isAllDay,
        startTime: startTime,
        endTime: endTime,
        eventColor: eventColor,
        dateOfEvent: dateOfEvent,
      };
      const getInfo = localStorage.getItem(dateOfEvent);
      const newArray = JSON.parse(getInfo);
      const updatedArray = newArray.map((item) => {
        let parsedInfo = JSON.parse(item);
        if (parsedInfo.key === singleEventInfo.key) {
          parsedInfo = eventInfo;
        }
        return JSON.stringify(parsedInfo);
      });
      localStorage.setItem(dateOfEvent, JSON.stringify(updatedArray));
      setIsEditEventShown(false);
    }
  }

  useEffect(() => {
    setEventColor(singleEventInfo.eventColor);
    setEventName(singleEventInfo.eventName);
    setStartTime(singleEventInfo.startTime);
    setEndTime(singleEventInfo.endTime);
  }, []);

  function handleClose() {
    const element = document.querySelector(".modal");
    if (element) {
      element.classList.add("closing");
    }
    setTimeout(() => {
      setIsEditEventShown(false);
    }, 300);
  }

  function handleDeleteEvent(key) {
    const allEvents = localStorage.getItem(dateOfEvent);
    console.log(allEvents);
    if (allEvents === null) return;
    if (allEvents !== null) {
      const parsedEvents = JSON.parse(allEvents);
      console.log("p", parsedEvents);
      const newArray = parsedEvents.filter(
        (item) => JSON.parse(item).key !== key
      );
      localStorage.setItem(dateOfEvent, JSON.stringify(newArray));
      setIsEditEventShown(false);
    }
  }

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-body">
        <div className="modal-title">
          <div>Edit Event</div>
          <small>6/8/23</small>
          <button className="close-btn" onClick={() => handleClose()}>
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
              defaultValue={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              name="all-day"
              id="all-day"
              defaultChecked={singleEventInfo.isAllDay}
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
                defaultValue={startTime}
                disabled={singleEventInfo.isAllDay}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="end-time">End Time</label>
              <input
                type="time"
                name="end-time"
                id="end-time"
                defaultValue={endTime}
                disabled={singleEventInfo.isAllDay}
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
                defaultChecked={singleEventInfo.eventColor === "blue"}
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
                defaultChecked={singleEventInfo.eventColor === "red"}
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
                defaultChecked={singleEventInfo.eventColor === "green"}
                onChange={(e) => setEventColor(e.target.value)}
              />
              <label htmlFor="green">
                <span className="sr-only">Green</span>
              </label>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-success" type="submit">
              Submit
            </button>
            <button
              onClick={() => handleDeleteEvent(singleEventInfo.key)}
              className="btn btn-delete"
              type="button"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
