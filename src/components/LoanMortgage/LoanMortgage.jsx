import React from 'react'
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import LoanCalculator from './LoanCalculator/LoanCalculator'


const LoanMortgage = () => {
    const location = useLocation();

    return (
        <>

            <SidebarToogle />

            {location.pathname == '/loanMortgage/loanCalculator' && (
                <LoanCalculator />
            )}

        </>
    )
}

export default LoanMortgage