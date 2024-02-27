import React from 'react'
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import CurrencyConverter from './CurrencyConverter/CurrencyConverter'


const FinanceAndInvestment = () => {

    const location = useLocation();

    return (
        <>

            <SidebarToogle />

            {location.pathname == '/financeAndInvestment/currencyConverter' && (
                <CurrencyConverter />
            )}

        </>
    )

}

export default FinanceAndInvestment