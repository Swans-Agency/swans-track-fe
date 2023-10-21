import dayjs from 'dayjs';
import React from 'react';


export default function EventModal({ selectedEvent, handleDeleteEvent, setIsModalOpenNew, setSelectedEvent }) {
    return (
        <div>
            <div className='flex gap-2 justify-start'>
                <span className="font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </span>
                {dayjs(selectedEvent?.start)?.format('dddd, MMMM D - HH:mm')} - {dayjs(selectedEvent?.end)?.format('dddd, MMMM D - HH:mm')}
            </div>
            {selectedEvent?.location && <div className='flex gap-2 justify-start'>
                <span className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>

                </span>
                {(selectedEvent?.location)}
            </div>}

            {selectedEvent?.discription &&
                <div className='flex gap-2 justify-start'>
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>

                    </span>
                    <div
                        // className="border rounded-lg p-2 hover:cursor-pointer hover:border-blue-400"
                        dangerouslySetInnerHTML={{ __html: selectedEvent?.discription }}
                    />
                </div>
            }
            <div className="flex gap-x-2 justify-end  mt-3">
                <button className="bg-red-600 text-white px-4 py-2 hover:shadow-lg rounded" onClick={() => handleDeleteEvent(selectedEvent?.id)}>Delete</button>
                <button className="bg-blue-900 text-white px-4 py-2 hover:shadow-lg rounded" onClick={() => setIsModalOpenNew(true)}>Edit</button>
            </div>
        </div>
    );
};