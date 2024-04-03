import React, { useState, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle';

// Lazy load LoanCalculator component
const LoanCalculator = React.lazy(() => import('./LoanCalculator/LoanCalculator'));

const LoanMortgage = () => {
    const [historyName, setHistoryName] = useState('');
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

    const renderCalculatorComponent = () => {
        switch (location.pathname) {
            case '/loanMortgage/loanCalculator':
                return <LoanCalculator historyName={historyName} isModalOpen={isModalOpen} closeModal={closeModal} />;
            default:
                return null;
        }
    };

    return (
        <div>
            <SidebarToogle openHistoryModal={openHistoryModal} />
            <Suspense fallback={<div>Loading...</div>}>
                {renderCalculatorComponent()}
            </Suspense>
        </div>
    );
};

export default LoanMortgage;
