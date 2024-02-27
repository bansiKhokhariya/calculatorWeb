import React from 'react'
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import BasicCalculator from './BasicCalculator/BasicCalculator'
import PercentageCalculator from './PercentageCalculator/PercentageCalculator'
import BMICalculator from './BMICalculator/BMICalculator'
import NumberToWordConverter from './NumberToWordConverter/NumberToWordConverter'
import UnitConverter from './UnitConverter/UnitConverter'
import CashCounter from './CashCounter/CashCounter'

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

            {location.pathname == '/calculator/unitConverter' && (
                <UnitConverter />
            )}

            {location.pathname == '/calculator/cashCounter' && (
                <CashCounter />
            )}

        </>
    )
}

export default Calculator