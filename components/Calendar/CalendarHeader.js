import React, { useEffect } from 'react';
import { NotificationLoading } from '@/functions/Notifications';
import { getAxios } from '@/functions/ApiCalls';
import { format } from 'date-fns';
import ConnectGoogleCalendar from './ConnectGoogleCalendar';
import ToggleMonth from './ToggleMonth';


export default function CalendarHeader({ selectedDate, setSelectedDate, isConnected }) {

    const handleConnectGoogleCalendar = async () => {
        NotificationLoading()
        let url = `${process.env.DIGITALOCEAN}/tasks/authenticate-google/`
        let redirectURI = await getAxios(url, false, false, () => { })
        if (redirectURI?.url) {
            const newTab = window.open(redirectURI.url, '_blank');
            newTab.focus();
        }
    }

    return (
        <div className='flex justify-between items-center mb-4'>
            <ToggleMonth
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <ConnectGoogleCalendar
                isConnected={isConnected}
                handleConnectGoogleCalendar={handleConnectGoogleCalendar}
            />
        </div>

    );
};