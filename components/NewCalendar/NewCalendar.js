import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';
import React, { useState } from 'react';
import CalendarHeader from '../Calendar/CalendarHeader';
import ModalANTD from '../ANTD/ModalANTD';
import EventModal from '../Calendar/SwansCalendar/EventModal';
import { deleteAxios } from '@/functions/ApiCalls';
import NewEventForm from '../Calendar/SwansCalendar/NewEventForm';
import MonthView from './MonthView';
import DrawerANTD from '../ANTD/DrawerANTD';


export default function NewCalendar({ calendarEvents, getEvents }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenNew, setIsModalOpenNew] = useState(false)
  const [clickedDate, setClickedDate] = useState()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const currentMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  const handleShowEvent = (event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)

  }

  const handleClose = () => {
    setSelectedEvent(null)
    setIsModalOpen(false)
    setIsModalOpenNew(false)
    setClickedDate(null)
  }

  const handleDeleteEvent = async (id) => {
    let url = `${process.env.DIGITALOCEAN}/calendar/delete/${id}/`
    let res = await deleteAxios(url, true, true)
    handleClose()
    getEvents()
  }

  return (
    <>
      <CalendarHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isHidden={true}
        createNew={true}
        setIsModalOpenNew={setIsModalOpenNew}
        setClickedDate={setClickedDate}
      />
      <MonthView
        calendarEvents={calendarEvents}
        setClickedDate={setClickedDate}
        setIsModalOpenNew={setIsModalOpenNew}
        currentMonth={currentMonth}
        days={days}
        handleShowEvent={handleShowEvent}
      />
      <ModalANTD
        title={selectedEvent?.title}
        isModalOpen={isModalOpen}
        footer={null}
        handleCancel={handleClose}
        handleOk={handleClose}
        renderComponent={<EventModal selectedEvent={selectedEvent} handleDeleteEvent={handleDeleteEvent} setIsModalOpenNew={setIsModalOpenNew} setSelectedEvent={setSelectedEvent} />}
      />
      {clickedDate && !selectedEvent && <DrawerANTD
        title={"New Event"}
        open={isModalOpenNew}
        footer={null}
        onClose={handleClose}
        // handleOk={handleClose}
        children={<NewEventForm getEvents={getEvents} handleClose={handleClose} instance={selectedEvent} setSelectedEvent={setSelectedEvent} clickedDate={clickedDate} />}
      />}

      {clickedDate && selectedEvent &&
        <ModalANTD
          title={selectedEvent?.title}
          isModalOpen={isModalOpenNew}
          footer={null}
          handleCancel={handleClose}
          handleOk={handleClose}
          renderComponent={<NewEventForm getEvents={getEvents} handleClose={handleClose} instance={selectedEvent} setSelectedEvent={setSelectedEvent} clickedDate={clickedDate} />}
        />
      }
    </>

  );
};