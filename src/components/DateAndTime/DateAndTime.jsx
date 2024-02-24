import React from 'react'
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import DuractionBetweenTwoDates from './DurationBetweenTwoDates/DuractionBetweenTwoDates'
import AgeCaculator from './AgeCaculator/AgeCaculator'

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
        </>
    )
}

export default DateAndTime