import React, { useState, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle';

// Lazy load the components
const CurrencyConverter = React.lazy(() => import('./CurrencyConverter'));
const ROICalculator = React.lazy(() => import('./ROICalculator'));
const TvmCalculator = React.lazy(() => import('./TvmCalculator/TvmCalculator'));
const TvmCalculatorAdvanced = React.lazy(() => import('./TvmCalculatorAdvanced'));
const MutualFundCalculator = React.lazy(() => import('./MutualFundCalculator'));
const SIPCalculator = React.lazy(() => import('./SIPCalculator'));
const PPFCalculator = React.lazy(() => import('./PPFCalculator'));
const CompoundInterestCalculator = React.lazy(() => import('./CompoundInterestCalculator'));
const FDCalculator = React.lazy(() => import('./FDCalculator'));
const RDCalculator = React.lazy(() => import('./RDCalculator'));
const GratuityCalculator = React.lazy(() => import('./GratuityCalculator'));
const CAGRCalculator = React.lazy(() => import('./CAGRCalculator'));
const DiscountCalculator = React.lazy(() => import('./DiscountCalculator'));
const SWPCalculator = React.lazy(() => import('./SWPCalculator'));
const LumpsumInvestmentCalculator = React.lazy(() => import('./LumpsumInvestmentCalculator'));
const PresentValueCalculator = React.lazy(() => import('./PresentValueCalculator'));
const SavingsCalculator = React.lazy(() => import('./SavingsCalculator'));
const EducationCalculator = React.lazy(() => import('./EducationCalculator'));
const DownPaymentCalculator = React.lazy(() => import('./DownPaymentCalculator'));
const LeaseCalculatorIndia = React.lazy(() => import('./LeaseCalculatorIndia'));
const PaybackPeriodCalculator = React.lazy(() => import('./PaybackPeriodCalculator'));

const FinanceAndInvestment = () => {
  const [historyName, setHistoryName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/financeAndInvestment/tvmCalculator') {
      setHistoryName('tvmHistory');
    } else if (location.pathname === '/financeAndInvestment/tvmAdvancedCalculator') {
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

  // Mapping object for URL and corresponding lazy-loaded components
  const componentMap = {
    '/financeAndInvestment/currencyConverter': CurrencyConverter,
    '/financeAndInvestment/roiCalculator': ROICalculator,
    '/financeAndInvestment/tvmCalculator': () => <TvmCalculator historyName={historyName} isModalOpen={isModalOpen} closeModal={closeModal} />,
    '/financeAndInvestment/tvmAdvancedCalculator': () => <TvmCalculatorAdvanced historyName={historyName} isModalOpen={isModalOpen} closeModal={closeModal} />,
    '/financeAndInvestment/mutualFundCalculator': MutualFundCalculator,
    '/financeAndInvestment/SIPCalculator': SIPCalculator,
    '/financeAndInvestment/PPFCalculator': PPFCalculator,
    '/financeAndInvestment/compoundInterestCalculator': CompoundInterestCalculator,
    '/financeAndInvestment/FDCalculator': FDCalculator,
    '/financeAndInvestment/RDCalculator': RDCalculator,
    '/financeAndInvestment/gratuityCalculator': GratuityCalculator,
    '/financeAndInvestment/CAGRCalculator': CAGRCalculator,
    '/financeAndInvestment/discountCalculator': DiscountCalculator,
    '/financeAndInvestment/SWPCalculator': SWPCalculator,
    '/financeAndInvestment/lumpsumInvestmentCalculator': LumpsumInvestmentCalculator,
    '/financeAndInvestment/presentValueCalculator': PresentValueCalculator,
    '/financeAndInvestment/savingsCalculator': SavingsCalculator,
    '/financeAndInvestment/educationCalculator': EducationCalculator,
    '/financeAndInvestment/downPaymentCalculator': DownPaymentCalculator,
    '/financeAndInvestment/leaseCalculatorIndia': LeaseCalculatorIndia,
    '/financeAndInvestment/paybackPeriodCalculator': PaybackPeriodCalculator,
  };

  const getCalculatorComponent = () => {
    const Component = componentMap[location.pathname];
    return Component ? <Component /> : null;
  };

  return (
    <>
      <SidebarToogle openHistoryModal={openHistoryModal} />
      <Suspense fallback={<div>Loading...</div>}>
        {getCalculatorComponent()}
      </Suspense>
    </>
  );
};

export default FinanceAndInvestment;
