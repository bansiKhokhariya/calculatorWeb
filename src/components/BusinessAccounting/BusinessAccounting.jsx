import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarToogle from '../SidebarToogle/SidebarToogle';

// Lazy load components
const BreakEvenPointCalculator = React.lazy(() => import('./BreakEvenPointCalculator/BreakEvenPointCalculator'));
const DepreciationCalculator = React.lazy(() => import('./DepreciationCalculator/DepreciationCalculator'));
const MarginMarkupCalculator = React.lazy(() => import('./MarginMarkupCalculator/MarginMarkupCalculator'));

const BusinessAccounting = () => {
    const location = useLocation();

    const renderCalculatorComponent = () => {
        switch (location.pathname) {
            case '/businessAccounting/breakEvenPointCalculator':
                return <BreakEvenPointCalculator />;
            case '/businessAccounting/depreciationCalculator':
                return <DepreciationCalculator />;
            case '/businessAccounting/marginMarkupCalculator':
                return <MarginMarkupCalculator />;
            default:
                return null;
        }
    };

    return (
        <div>
            <SidebarToogle />
            <Suspense fallback={<div>Loading...</div>}>
                {renderCalculatorComponent()}
            </Suspense>
        </div>
    );
};

export default BusinessAccounting;
