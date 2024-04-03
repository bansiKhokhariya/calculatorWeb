import React, { useState, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle';

// Lazy load components
const BasicCalculator = React.lazy(() => import('./BasicCalculator/BasicCalculator'));
const PercentageCalculator = React.lazy(() => import('./PercentageCalculator/PercentageCalculator'));
const BMICalculator = React.lazy(() => import('./BMICalculator/BMICalculator'));
const NumberToWordConverter = React.lazy(() => import('./NumberToWordConverter/NumberToWordConverter'));
const UnitConverter = React.lazy(() => import('./UnitConverter/UnitConverter'));
const CashCounter = React.lazy(() => import('./CashCounter/CashCounter'));

const Calculator = () => {
    const [historyName, setHistoryName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            setHistoryName('savedResults');
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
            case '/calculator/percentageCalculator':
                return <PercentageCalculator />;
            case '/calculator/bmiCalculator':
                return <BMICalculator />;
            case '/calculator/numberToWordConverter':
                return <NumberToWordConverter />;
            case '/calculator/unitConverter':
                return <UnitConverter />;
            case '/calculator/cashCounter':
                return <CashCounter />;
            default:
                return <BasicCalculator historyName={historyName} isModalOpen={isModalOpen} closeModal={closeModal} />;
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

export default Calculator;

