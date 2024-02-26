import React from 'react'
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import DuractionBetweenTwoDates from './DurationBetweenTwoDates/DuractionBetweenTwoDates'
import AgeCaculator from './AgeCaculator/AgeCaculator'
import WeekDayCalculator from './WeekDayCalculator/WeekDayCalculator'
import DateAddSubtract from './DateAddSubtract/DateAddSubtract'

const DateAndTime = () => {
    const location = useLocation();

    return (
        <>
            <SidebarToogle />
            {location.pathname == '/dateAndTime/durationBetweenTwoDates' && (
                <DuractionBetweenTwoDates />
            )}
            {location.pathname == '/dateAndTime/ageCaculator' && (
                <AgeCaculator />
            )}
            {location.pathname == '/dateAndTime/weekDayCalculator' && (
                <WeekDayCalculator />
            )}
            {location.pathname == '/dateAndTime/dateAddSubtract' && (
                <DateAddSubtract />
            )}
        </>
    )
}

export default DateAndTime