import React from 'react'
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import CurrencyConverter from './CurrencyConverter/CurrencyConverter'
import ROICalculator from './ROICalculator/ROICalculator'


const FinanceAndInvestment = () => {

    const location = useLocation();

    return (
        <>

            <SidebarToogle />

            {location.pathname == '/financeAndInvestment/currencyConverter' && (
                <CurrencyConverter />
            )}

            {location.pathname == '/financeAndInvestment/roiCalculator' && (
                <ROICalculator />
            )}

        </>
    )

}

export default FinanceAndInvestment