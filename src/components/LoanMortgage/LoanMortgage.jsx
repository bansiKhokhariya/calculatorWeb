import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import LoanCalculator from './LoanCalculator/LoanCalculator'


const LoanMortgage = () => {
    const [historyName, setHistoryName] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    

    useEffect(() => {
        if (location.pathname === '/loanMortgage/loanCalculator') {
            setHistoryName('loanHistory');
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

            {location.pathname == '/loanMortgage/loanCalculator' && (
                <LoanCalculator historyName={historyName} isModalOpen={isModalOpen} closeModal={closeModal} />
            )}
        </>
    )
}

export default LoanMortgage