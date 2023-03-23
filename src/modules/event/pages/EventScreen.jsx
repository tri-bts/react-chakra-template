import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch } from 'react-redux';

import { Container, useDisclosure } from '@chakra-ui/react';

import { event_fetch } from '../slice/event.slice';

import EventInput from '../components/EventInput';

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText} </b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function EventScreen() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);

  function handleDateClick() {
    onOpen();
  }

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  function onAddEvent(values) {
    setEvents(events => [...events, values]);
    onClose();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const data = await dispatch(event_fetch()).unwrap();
    setEvents(data);
  }, [dispatch]);

  return (
    <Container maxW={'5xl'} py={12}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
      />

      {onOpen && <EventInput isOpen={isOpen} onClose={onClose} onAddEvent={onAddEvent} />}
    </Container>
  );
}

export default EventScreen;
