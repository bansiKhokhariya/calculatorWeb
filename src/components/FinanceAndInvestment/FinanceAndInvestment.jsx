import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import CurrencyConverter from './CurrencyConverter/CurrencyConverter'
import ROICalculator from './ROICalculator/ROICalculator'
import TvmCalculator from './TvmCalculator/TvmCalculator'
import TvmCalculatorAdvanced from './TvmCalculatorAdvanced/TvmCalculatorAdvanced'


const FinanceAndInvestment = () => {
    const [historyName, setHistoryName] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/financeAndInvestment/tvmCalculator') {
            setHistoryName('tvmHistory');
        }
        else if (location.pathname === '/financeAndInvestment/tvmAdvancedCalculator') {
            setHistoryName('tvmAdvanceHistory');
        } else {
            setHistoryName('');
        }
    }, [location.pathname]);


    const openHistoryModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>

            <SidebarToogle openHistoryModal={openHistoryModal} />

            {location.pathname == '/financeAndInvestment/currencyConverter' && (
                <CurrencyConverter />
            )}

            {location.pathname == '/financeAndInvestment/roiCalculator' && (
                <ROICalculator />
            )}

            {location.pathname == '/financeAndInvestment/tvmCalculator' && (
                <TvmCalculator historyName={historyName} isModalOpen={isModalOpen} closeModal={closeModal} />
            )}

            {location.pathname == '/financeAndInvestment/tvmAdvancedCalculator' && (
                <TvmCalculatorAdvanced historyName={historyName} isModalOpen={isModalOpen} closeModal={closeModal} />
            )}

        </>
    )

}

export default FinanceAndInvestment