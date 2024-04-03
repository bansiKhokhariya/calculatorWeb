import React, { useEffect, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';


const Calculator = React.lazy(() => import('./components/Calculator/Calculator'));
const DateAndTime = React.lazy(() => import('./components/DateAndTime/DateAndTime'));
const LoanMortgage = React.lazy(() => import('./components/LoanMortgage/LoanMortgage'));
const BusinessAccounting = React.lazy(() => import('./components/BusinessAccounting/BusinessAccounting'));
const FinanceAndInvestment = React.lazy(() => import('./components/FinanceAndInvestment/FinanceAndInvestment'));


const App = () => {
  var selectedTheme = localStorage.getItem('selectedTheme');
  useEffect(() => {
    if (selectedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('selectedTheme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('selectedTheme', 'dark');
    }
  }, [selectedTheme]);


  const route = [
    // General category Calculator path
    { path: "/", component: Calculator },
    { path: "/calculator/percentageCalculator", component: Calculator },
    { path: "/calculator/bmiCalculator", component: Calculator },
    { path: "/calculator/numberToWordConverter", component: Calculator },
    { path: "/calculator/unitConverter", component: Calculator },
    { path: "/calculator/cashCounter", component: Calculator },
    // Loan And Mortgage Category Path
    { path: "/loanMortgage/loanCalculator", component: LoanMortgage },
    // Finance and Investment Category Path
    { path: "/financeAndInvestment/currencyConverter", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/roiCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/tvmCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/tvmAdvancedCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/mutualFundCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/SIPCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/PPFCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/compoundInterestCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/FDCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/RDCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/gratuityCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/CAGRCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/discountCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/SWPCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/lumpsumInvestmentCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/presentValueCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/savingsCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/educationCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/downPaymentCalculator", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/leaseCalculatorIndia", component: FinanceAndInvestment },
    { path: "/financeAndInvestment/paybackPeriodCalculator", component: FinanceAndInvestment },
    // Business Accounting Category Path
    { path: "/businessAccounting/breakEvenPointCalculator", component: BusinessAccounting },
    { path: "/businessAccounting/depreciationCalculator", component: BusinessAccounting },
    { path: "/businessAccounting/marginMarkupCalculator", component: BusinessAccounting },
    // Date And Time Category Path
    { path: "/dateAndTime/durationBetweenTwoDates", component: DateAndTime },
    { path: "/dateAndTime/ageCaculator", component: DateAndTime },
    { path: "/dateAndTime/weekDayCalculator", component: DateAndTime },
    { path: "/dateAndTime/dateAddSubtract", component: DateAndTime },
  ];

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {route.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
          <Route path="/financeAndInvestment" element={<FinanceAndInvestment />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
