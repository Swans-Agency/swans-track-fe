import dayjs from 'dayjs';
import React from 'react';


export default function EventModal({ selectedEvent, handleDeleteEvent, setIsModalOpenNew, setSelectedEvent }) {
    return (
        <div>
            <p>
                <span className="font-semibold">From: </span>
                {dayjs(selectedEvent?.start)?.format('dddd, MMMM D - HH:mm')}
            </p>
            <p>
                <span className="font-semibold">To: </span>
                {dayjs(selectedEvent?.end)?.format('dddd, MMMM D - HH:mm')}
            </p>
            {selectedEvent?.location  && <p>
                <span className="font-semibold">Location: </span>
                {(selectedEvent?.location)}
            </p>}
            <p className="text-justify text-gray-600 pt-3">{selectedEvent?.discription}</p>
            <div className="flex gap-x-2 justify-end  mt-3">
                <button className="bg-red-600 text-white px-4 py-2 hover:shadow-lg rounded" onClick={() => handleDeleteEvent(selectedEvent?.id)}>Delete</button>
                <button className="bg-blue-900 text-white px-4 py-2 hover:shadow-lg rounded" onClick={() => setIsModalOpenNew(true)}>Edit</button>
            </div>
        </div>
    );
};