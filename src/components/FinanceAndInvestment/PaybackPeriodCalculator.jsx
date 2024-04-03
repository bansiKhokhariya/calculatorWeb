import React, { useState } from 'react';

const PaybackPeriodCalculator = () => {
    // State variables to store input values and result
    const [initialInvestment, setInitialInvestment] = useState('');
    const [netAnnualCashInflow, setNetAnnualCashInflow] = useState('');
    const [paybackPeriod, setPaybackPeriod] = useState('');

    // Function to handle calculation when any input value changes
    const calculatePaybackPeriod = () => {
        // Convert input values to numbers
        const initialInv = parseFloat(initialInvestment);
        const annualCashInflow = parseFloat(netAnnualCashInflow);

        // Validate input values
        if (isNaN(initialInv) || isNaN(annualCashInflow) || annualCashInflow === 0) {
            alert('Please enter valid numeric values.');
            return;
        }

        // Calculate payback period
        const paybackPeriodYears = initialInv / annualCashInflow;
        setPaybackPeriod(paybackPeriodYears.toFixed(2));
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>Payback Period Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Initial Investment</span>
                        <input type="text" className="form-control" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Net Annual Cash Inflow</span>
                        <input type="text" className="form-control" value={netAnnualCashInflow} onChange={(e) => setNetAnnualCashInflow(e.target.value)} />
                    </div>
                    <button className='btn btn-sm btn-success' onClick={calculatePaybackPeriod}>Calculate</button>
                    {paybackPeriod !== '' &&
                        <div>
                            <hr />
                            <strong>Payback Period (in Years): <span className='text-success'>{paybackPeriod}</span></strong>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default PaybackPeriodCalculator;
