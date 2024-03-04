import React, { useState ,useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle'
import BasicCalculator from './BasicCalculator/BasicCalculator'
import PercentageCalculator from './PercentageCalculator/PercentageCalculator'
import BMICalculator from './BMICalculator/BMICalculator'
import NumberToWordConverter from './NumberToWordConverter/NumberToWordConverter'
import UnitConverter from './UnitConverter/UnitConverter'
import CashCounter from './CashCounter/CashCounter'

const Calculator = () => {
    const [historyName, setHistoryName] = useState('')
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

    return (
        <>
            <SidebarToogle openHistoryModal={openHistoryModal} />

            {location.pathname == '/' && (
                <BasicCalculator historyName={historyName} isModalOpen={isModalOpen} closeModal={closeModal} />
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