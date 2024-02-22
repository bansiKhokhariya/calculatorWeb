import React from 'react'
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import BasicCalculator from './BasicCalculator/BasicCalculator'
import PercentageCalculator from './PercentageCalculator/PercentageCalculator'

const Calculator = () => {

    const location = useLocation();


    return (
        <>
            <SidebarToogle />
            {location.pathname == '/' && (
                <BasicCalculator />
            )}

            {location.pathname == '/calculator/percentageCalculator' && (
                <PercentageCalculator />
            )}
        </>
    )
}

export default Calculator