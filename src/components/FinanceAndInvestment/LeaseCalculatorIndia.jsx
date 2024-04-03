import React, { useState } from 'react';

const LeaseCalculatorIndia = () => {
    // State variables to store input values and result
    const [assetValue, setAssetValue] = useState('');
    const [residualValue, setResidualValue] = useState('');
    const [leaseTerm, setLeaseTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [monthlyLeasePayments, setMonthlyLeasePayments] = useState('');
    const [totalPayments, setTotalPayments] = useState('');
    const [totalInterest, setTotalInterest] = useState('');

    // Function to handle calculation when any input value changes
    const calculateResult = () => {
        // Convert input values to numbers
        const assetVal = parseFloat(assetValue);
        const residualVal = parseFloat(residualValue);
        const term = parseFloat(leaseTerm);
        const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate

        // Validate input values
        if (isNaN(assetVal) || isNaN(residualVal) || isNaN(term) || isNaN(rate)) {
            alert('Please enter valid numeric values.');
            return;
        }

        // Calculate monthly lease payments
        const presentValue = assetVal - residualVal;
        const numberOfPayments = term * 12;
        const monthlyPayments = presentValue / (((1 - Math.pow(1 + rate, -numberOfPayments)) / rate));
        setMonthlyLeasePayments(monthlyPayments.toFixed(0));

        // Calculate total payments
        const totalPay = monthlyPayments.toFixed(0) * numberOfPayments;
        setTotalPayments(totalPay.toFixed(0));

        // Calculate total interest
        const totalInt = totalPay - presentValue;
        setTotalInterest(totalInt.toFixed(0));
    };

    const resetFields = () => {
        setAssetValue('');
        setResidualValue('');
        setLeaseTerm('');
        setInterestRate('')
        setMonthlyLeasePayments('')
        setTotalPayments('')
        setTotalInterest('')
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>Lease Calculator India</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Asset Value</span>
                        <input type="number" className="form-control" value={assetValue} onChange={(e) => setAssetValue(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Residual Value</span>
                        <input type="number" className="form-control" value={residualValue} onChange={(e) => setResidualValue(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Lease Term (in Years)</span>
                        <input type="number" className="form-control" value={leaseTerm} onChange={(e) => setLeaseTerm(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Interest rate (%)</span>
                        <input type="number" className="form-control" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                    </div>
                    <div>
                        <button className='btn btn-sm btn-success' onClick={calculateResult}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    {(monthlyLeasePayments !== '' && totalPayments !== '' && totalInterest !== '') &&
                        <div>
                            <hr />
                            <strong>Monthly Lease Payments: <span className='text-success'>{monthlyLeasePayments}</span></strong>
                            <br />
                            <strong>Total Payments: <span className='text-success'>{totalPayments}</span></strong>
                            <br />
                            <strong>Total Interest: <span className='text-success'>{totalInterest}</span></strong>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default LeaseCalculatorIndia;
