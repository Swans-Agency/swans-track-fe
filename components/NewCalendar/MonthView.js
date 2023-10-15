import dayjs from 'dayjs';
import React from 'react';


export default function MonthView({ calendarEvents, setClickedDate, setIsModalOpenNew, currentMonth, days, handleShowEvent}) {
    return (
        <div className='grid grid-cols-7 gap-1 '>
            <div className='col-span-7 h-[1rem] bg-white sticky top-[4rem] left-0'></div>
            {
                days.map((day, index) => {
                    return (
                        <div key={index} className={`text-center bg-mainBackground text-white sticky top-[5rem] left-0 ${day == "Sun" ? "rounded-tl-lg" : ""}  ${day == "Sat" ? "rounded-tr-lg" : ""} py-1`}>
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
                            <div className={`${today == render ? "" : ""} w-full hover:cursor-crosshair flex justify-center text-center`} onClick={() => { setClickedDate(dayjs(new Date(date))); setIsModalOpenNew(true) }}>
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

    );
};