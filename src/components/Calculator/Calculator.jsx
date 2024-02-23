import React from 'react'
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import BasicCalculator from './BasicCalculator/BasicCalculator'
import PercentageCalculator from './PercentageCalculator/PercentageCalculator'
import BMICalculator from './BMICalculator/BMICalculator'
import NumberToWordConverter from './NumberToWordConverter/NumberToWordConverter'

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

            {location.pathname == '/calculator/bmiCalculator' && (
                <BMICalculator />
            )}
            
            {location.pathname == '/calculator/numberToWordConverter' && (
                <NumberToWordConverter />
            )}


        </>
    )
}

export default Calculator