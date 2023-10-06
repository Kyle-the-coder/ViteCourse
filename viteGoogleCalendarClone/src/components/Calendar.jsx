import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { Fragment, useEffect, useState } from "react";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import EventsModal from "./EventsModal";

export default function Calendar({ currentDate, setCurrentDate }) {
  //PAGE REFRESH STATE
  const [isSubmitted, setIsSubmitted] = useState(false);
  //LOCAL STORAGE KEYS
  const [foundKey, setFoundKey] = useState([]);
  const convertKeysToDates = () => {
    return foundKey.map((key) => new Date(key));
  };
  const dateObjects = convertKeysToDates();
  //MONTH INFO AND MODAL
  const [visibleMonth, setVisibleMonth] = useState(currentDate);
  const [isAddEventShown, setIsAddEventShown] = useState(false);
  const [isEventListShown, setIsEventListShown] = useState(false);
  const [isEditEventShown, setIsEditEventShown] = useState(false);
  //FORM STATES
  const [dateOfEvent, setDateOfEvent] = useState("");
  const [eventName, setEventName] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [eventColor, setEventColor] = useState("");
  //DISPLAY INFO
  const [eventInfo, setEventInfo] = useState({});
  const [singleEventInfo, setSingleEventInfo] = useState({});
  const formattedDate = format(visibleMonth, "MMMM yyyy");
  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

  useEffect(() => {
    const searchLocalStorage = () => {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        keys.push(key);
        setFoundKey(keys);
      }
    };

    searchLocalStorage();
    dateObjects.sort((a, b) => {
      console.log(a, b);
      // Convert boolean values to numbers (false becomes 0, true becomes 1)
      const aIsAllDay = JSON.parse(a).isAllDay ? 1 : 0;
      const bIsAllDay = JSON.parse(b).isAllDay ? 1 : 0;

      // Compare the numeric values
      return bIsAllDay - aIsAllDay;
    });
  }, [isSubmitted]);

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
  function handleCurrentDay() {
    setVisibleMonth(currentDate);
  }
  function handleEditEvent(parsedInfo, date) {
    setIsEditEventShown(true);
    setDateOfEvent(date);
    setSingleEventInfo(parsedInfo);
  }

  return (
    <div className="calendar">
      <div className="header">
        <button className="btn" onClick={() => handleCurrentDay()}>
          Today
        </button>
        <div>
          <button
            className="month-change-btn"
            onClick={() => handlePreviousMonth()}
          >
            &lt;
          </button>
          <button
            className="month-change-btn"
            onClick={() => handleNextMonth()}
          >
            &gt;
          </button>
        </div>
        <span className="month-title">{formattedDate}</span>
      </div>
      <div className="days">
        {daysInMonth.map((date, index) => {
          return (
            <div
              key={date.toDateString()}
              className={`day ${
                !isSameMonth(date, visibleMonth) &&
                "non-month-day old-month-day"
              } `}
            >
              <div className="day-header">
                {index < 7 && (
                  <div className="week-name">{format(date, "EE")}</div>
                )}

                <div className={`${isToday(date) && "today"} day-number`}>
                  {date.getDate()}
                </div>
                <button
                  className="add-event-btn"
                  onClick={() => {
                    setIsAddEventShown(true);
                    setDateOfEvent(date);
                  }}
                >
                  +
                </button>
                {dateObjects.map((eventDate, index) => {
                  const info = localStorage.getItem(eventDate);
                  const parsedInfo = JSON.parse(info);
                  parsedInfo.sort((a, b) => {
                    const aIsAllDay = JSON.parse(a).isAllDay ? 1 : 0;
                    const bIsAllDay = JSON.parse(b).isAllDay ? 1 : 0;
                    return bIsAllDay - aIsAllDay;
                  });
                  return (
                    <div key={index}>
                      {isSameDay(date, eventDate) && (
                        <>
                          {parsedInfo.map((info, index) => {
                            const parsedInfo = JSON.parse(info);
                            return (
                              <Fragment key={index}>
                                {parsedInfo.isAllDay ? (
                                  <button
                                    className={`all-day-event mb-2 ${parsedInfo.eventColor} event`}
                                    onClick={() =>
                                      handleEditEvent(parsedInfo, date)
                                    }
                                  >
                                    <div className="event-name">
                                      {parsedInfo.eventName}
                                    </div>
                                  </button>
                                ) : (
                                  <button
                                    className="event mb-2"
                                    onClick={() =>
                                      handleEditEvent(parsedInfo, date)
                                    }
                                  >
                                    <div
                                      className={`color-dot ${parsedInfo.eventColor}`}
                                    ></div>
                                    <div className="event-time">
                                      {parsedInfo.startTime}
                                    </div>
                                    <div className="event-name">
                                      {parsedInfo.eventName}
                                    </div>
                                  </button>
                                )}
                              </Fragment>
                            );
                          })}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {isAddEventShown && (
          <AddEventModal
            setIsAddEventShown={setIsAddEventShown}
            setEventName={setEventName}
            setIsAllDay={setIsAllDay}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            setEventColor={setEventColor}
            eventName={eventName}
            isAllDay={isAllDay}
            startTime={startTime}
            endTime={endTime}
            eventColor={eventColor}
            dateOfEvent={dateOfEvent}
            setDateOfEvent={setDateOfEvent}
            setIsSubmitted={setIsSubmitted}
            isSubmitted={isSubmitted}
          />
        )}
        {isEventListShown && (
          <EventsModal
            setIsEventListShown={setIsEventListShown}
            dateObjects={dateObjects}
          />
        )}
        {isEditEventShown && (
          <EditEventModal
            singleEventInfo={singleEventInfo}
            isAllDay={isAllDay}
            setIsEditEventShown={setIsEditEventShown}
            setEventName={setEventName}
            setIsAllDay={setIsAllDay}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            setEventColor={setEventColor}
            eventName={eventName}
            startTime={startTime}
            eventColor={eventColor}
            endTime={endTime}
            dateOfEvent={dateOfEvent}
          />
        )}

        {/* <div className="day non-month-day old-month-day">
          <div className="day-header">
            <div className="week-name">Sun</div>
            <div className="day-number">28</div>
            <button className="add-event-btn">+</button>
          </div>
          <div className="events">
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
          </div>
        </div>
        <div className="day non-month-day old-month-day">
          <div className="day-header">
            <div className="week-name">Mon</div>
            <div className="day-number">29</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day non-month-day old-month-day">
          <div className="day-header">
            <div className="week-name">Tue</div>
            <div className="day-number">30</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day non-month-day old-month-day">
          <div className="day-header">
            <div className="week-name">Wed</div>
            <div className="day-number">31</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day old-month-day">
          <div className="day-header">
            <div className="week-name">Thu</div>
            <div className="day-number">1</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day old-month-day">
          <div className="day-header">
            <div className="week-name">Fri</div>
            <div className="day-number">2</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day old-month-day">
          <div className="day-header">
            <div className="week-name">Sat</div>
            <div className="day-number">3</div>
            <button className="add-event-btn">+</button>
          </div>
        </div> */}
        {/* <div className="day old-month-day">
          <div className="day-header">
            <div className="day-number">4</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day old-month-day">
          <div className="day-header">
            <div className="day-number">5</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day old-month-day">
          <div className="day-header">
            <div className="day-number">6</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day old-month-day">
          <div className="day-header">
            <div className="day-number">7</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day old-month-day">
          <div className="day-header">
            <div className="day-number">8</div>
            <button className="add-event-btn">+</button>
          </div>
          <div className="events">
            <button className="all-day-event blue event">
              <div className="event-name">Short</div>
            </button>
            <button className="all-day-event red event">
              <div className="event-name">
                Long Event Name That Just Keeps Going
              </div>
            </button>
            <button className="event">
              <div className="color-dot red"></div>
              <div className="event-time">7am</div>
              <div className="event-name">Event Name</div>
            </button>
          </div>
        </div>
        <div className="day old-month-day">
          <div className="day-header">
            <div className="day-number">9</div>
            <button className="add-event-btn">+</button>
          </div>
          <div className="events">
            <button className="all-day-event green event">
              <div className="event-name">Short</div>
            </button>
            <button className="event">
              <div className="color-dot blue"></div>
              <div className="event-time">7am</div>
              <div className="event-name">Event Name</div>
            </button>
            <button className="event">
              <div className="color-dot green"></div>
              <div className="event-time">8am</div>
              <div className="event-name">Event Name</div>
            </button>
            <button className="event">
              <div className="color-dot blue"></div>
              <div className="event-time">9am</div>
              <div className="event-name">Event Name</div>
            </button>
            <button className="event">
              <div className="color-dot blue"></div>
              <div className="event-time">10am</div>
              <div className="event-name">Event Name</div>
            </button>
            <button className="event">
              <div className="color-dot red"></div>
              <div className="event-time">11am</div>
              <div className="event-name">Event Name</div>
            </button>
          </div>
          <button className="events-view-more-btn">+2 More</button>
        </div>
        <div className="day old-month-day">
          <div className="day-header">
            <div className="day-number">10</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day old-month-day">
          <div className="day-header">
            <div className="day-number">11</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day old-month-day">
          <div className="day-header">
            <div className="day-number">12</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day old-month-day">
          <div className="day-header">
            <div className="day-number">13</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number today">14</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">15</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">16</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">17</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">18</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">19</div>
            <button className="add-event-btn">+</button>
          </div>
          <div className="events">
            <button className="all-day-event blue event">
              <div className="event-name">Short</div>
            </button>
            <button className="all-day-event blue event">
              <div className="event-name">
                Long Event Name That Just Keeps Going
              </div>
            </button>
            <button className="event">
              <div className="color-dot blue"></div>
              <div className="event-time">7am</div>
              <div className="event-name">Event Name</div>
            </button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">20</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">21</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">22</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">23</div>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">24</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">25</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">26</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">27</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">28</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">29</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day">
          <div className="day-header">
            <div className="day-number">30</div>
            <button className="add-event-btn">+</button>
          </div>
        </div>
        <div className="day non-month-day">
          <div className="day-header">
            <div className="day-number">1</div>
            <button className="add-event-btn">+</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
