import React, { useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import moment from 'moment';
import { postAxios } from '@/functions/ApiCalls';
import { useRouter } from 'next/router';
import CardInfo from './CardInfo';


export default function Calendar({ isConnected }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthEvents, setMonthEvents] = useState({})
    const [authorizedNow, setAuthorizedNow] = useState(false)

    const router = useRouter()

    const currentMonth = eachDayOfInterval({
        start: startOfMonth(selectedDate),
        end: endOfMonth(selectedDate),
    });

    const handleGetEvents = async () => {
        let bodyData = {
            "StartMonth": moment(moment(selectedDate).startOf('month') - 1).format("YYYY-MM-DD[T00:00:00Z]"),
            "endMonth": moment(moment(selectedDate).endOf('month') + 1).format("YYYY-MM-DD[T00:00:00Z]")
        }
        let url = `${process.env.DIGITALOCEAN}/tasks/authenticate-google/`
        let res = await postAxios(url, bodyData, false, false, () => {})
        setMonthEvents(res)
    }

    const handleAuthorize = async (url, bodyData) => {
        await postAxios(url, bodyData, false, false, () => { })
    }

    useEffect(() => {
        { isConnected?.details && handleGetEvents() }
    }, [selectedDate, authorizedNow])

    useEffect(() => {
        const { state, code } = router.query
        if (!isConnected?.details && state && code) {
            let bodyData = {
                "state": state,
                "authorizationCode": code
            }
            let url = `${process.env.DIGITALOCEAN}/tasks/exchange-code/`
            handleAuthorize(url, bodyData)
            setAuthorizedNow(true)
        }
    }, [isConnected])

    return (
        <div>
            <h1 className='text-3xl font-light tracking-tight text-textIcons'>Calendar</h1>
            <CalendarHeader
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                isConnected={isConnected}
            />
            <div className='grid desktop:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] tablet:grid-cols-[1fr_1fr_1fr_1fr] phone:grid-cols-[1fr] gap-1'>
                {currentMonth.map((date, index) => (
                    <CardInfo
                        key={index}
                        date={date}
                        monthEvents={monthEvents}
                        isConnected={isConnected}
                    />
                ))}
            </div>
        </div>

    );
};