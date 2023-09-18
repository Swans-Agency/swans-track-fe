import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import CalendarHeader from '../Calendar/CalendarHeader';
import ModalANTD from '../ANTD/ModalANTD';
import EventModal from '../Calendar/SwansCalendar/EventModal';
import { deleteAxios } from '@/functions/ApiCalls';
import NewEventForm from '../Calendar/SwansCalendar/NewEventForm';


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
    setSelectedEvent({})
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
      />
      <div className='grid grid-cols-7 gap-1'>
        {
          days.map((day, index) => {
            return (
              <div key={index} className='text-center bg-gray-600 text-white sticky top-16 left-0'>
                {day}
              </div>
            )
          })
        }
        {
          currentMonth?.map((date, index) => {
            if (index === 0) {
              const dayOfWeek = dayjs(date).day();
              const emptyDivs = Array.from({ length: dayOfWeek }, (data, i) => (
                <div key={i} className="m-auto bg-gray-50 h-[10rem] w-full">
                  <p>
                    {data}
                  </p>
                </div>
              ));
              return emptyDivs;
            }
          })
        }
        {
          currentMonth.map((date, index) => {
            let today = dayjs().format("YYYY-MM-DD")
            let render = dayjs(date).format("YYYY-MM-DD")
            return (
              <div
                key={index}
                className={`text-center  bg-gray-100  h-[10rem] px-1 `}
                onClick={() => setClickedDate(dayjs(date))}
              >
                <div className={`${today == render ? "" : ""} w-full hover:cursor-crosshair flex justify-center text-center`} onClick={() => { setClickedDate(dayjs(date)) ;setIsModalOpenNew(true)}}>
                  <p className={`${today == render ? "text-blue-600 font-bold" : ""} w-7 h-7 mt-1 rounded-full flex justify-center items-center text-center`}>
                    {dayjs(date).format('DD')}
                  </p>
                </div>
                <div className='overflow-y-auto h-[8rem]'>
                  {
                    calendarEvents?.map((item) => {
                      let day = dayjs(item?.start)?.format("YYYY-MM-DD")
                      if (day === dayjs(date)?.format("YYYY-MM-DD")) {
                        return (
                          <>
                            <div className="flex gap-x-1 items-center hover:shadow hover:border rounded px-2 py-[0.1rem]" onClick={() => handleShowEvent(item)}>
                              <div className={`w-[0.4rem] h-[0.4rem] rounded-full  ${day < today ? "bg-gray-600 text-gray-300" : "bg-green-500"}`}></div>
                              <div className={`${day < today ? "text-gray-500" : "text-black"} text-sm flex gap-x-1 items-center justify-start whitespace-nowrap overflow-x-hidden`}>
                                <span>{dayjs(item?.start)?.format("HH:mm")}</span>
                                <span className=''>{item?.title}</span>
                              </div>
                            </div>
                          </>
                        )
                      }
                    })
                  }
                </div>
              </div>
            )
          })
        }

      </div>
      <ModalANTD
        title={selectedEvent?.title}
        isModalOpen={isModalOpen}
        footer={null}
        handleCancel={handleClose}
        handleOk={handleClose}
        renderComponent={<EventModal selectedEvent={selectedEvent} handleDeleteEvent={handleDeleteEvent} setIsModalOpenNew={setIsModalOpenNew} setSelectedEvent={setSelectedEvent} />}
      />
      {clickedDate  && <ModalANTD
        title={"New Event"}
        isModalOpen={isModalOpenNew}
        footer={null}
        handleCancel={handleClose}
        handleOk={handleClose}
        renderComponent={<NewEventForm getEvents={getEvents} handleClose={handleClose} instance={selectedEvent} setSelectedEvent={setSelectedEvent} clickedDate={clickedDate}  />}
      />}
    </>

  );
};