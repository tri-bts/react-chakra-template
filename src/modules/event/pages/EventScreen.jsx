import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { useDispatch } from 'react-redux';

import { event_fetch } from '../slice/event.slice';

function handleDateClick(arg) {
  console.log(arg);
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function EventScreen() {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const data = await dispatch(event_fetch()).unwrap();
    setEvents(data);
  }, [dispatch]);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
}

export default EventScreen;
