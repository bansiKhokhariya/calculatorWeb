import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle';

// Lazy load components
const DuractionBetweenTwoDates = React.lazy(() => import('./DurationBetweenTwoDates/DuractionBetweenTwoDates'));
const AgeCaculator = React.lazy(() => import('./AgeCaculator/AgeCaculator'));
const WeekDayCalculator = React.lazy(() => import('./WeekDayCalculator/WeekDayCalculator'));
const DateAddSubtract = React.lazy(() => import('./DateAddSubtract/DateAddSubtract'));

const DateAndTime = () => {
    const location = useLocation();

    const renderCalculatorComponent = () => {
        switch (location.pathname) {
            case '/dateAndTime/durationBetweenTwoDates':
                return <DuractionBetweenTwoDates />;
            case '/dateAndTime/ageCaculator':
                return <AgeCaculator />;
            case '/dateAndTime/weekDayCalculator':
                return <WeekDayCalculator />;
            case '/dateAndTime/dateAddSubtract':
                return <DateAddSubtract />;
            default:
                return null;
        }
    };

    return (
        <div>
            <SidebarToogle />
            <Suspense fallback={<div>Loading...</div>}>
                {renderCalculatorComponent()}
            </Suspense>
        </div>
    );
}

export default DateAndTime;

