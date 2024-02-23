import React from 'react'
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import DuractionBetweenTwoDates from './DurationBetweenTwoDates/DuractionBetweenTwoDates'

const DateAndTime = () => {
    const location = useLocation();

    return (
        <>
            <SidebarToogle />
            {location.pathname == '/dateAndTime/durationBetweenTwoDates' && (
                <DuractionBetweenTwoDates />
            )}
        </>
    )
}

export default DateAndTime