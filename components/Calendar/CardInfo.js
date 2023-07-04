import React from 'react';
import DayHeader from './DayHeader';
import Events from './Events';



export default function CardInfo({ date, monthEvents, isConnected }) {
    return (
        <div key={date} className='h-[10rem] relative grid text-center bg-gray-100 overflow-hidden hover:overflow-auto'>
            <div>
                <DayHeader
                    date={date}
                    isConnected={isConnected}
                />
                <Events
                    date={date}
                    monthEvents={monthEvents}
                    isConnected={isConnected}
                />
            </div>
        </div>

    );
};