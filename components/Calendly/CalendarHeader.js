import React from 'react'
import ToggleMonth from '../Calendar/ToggleMonth'

export default function CalendarHeader({ selectedDate, setSelectedDate, visibleLeft, visibleRight }) {

    return (
        <ToggleMonth
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            visibleLeft={visibleLeft}
            visibleRight={visibleRight}
        />
    )
}
