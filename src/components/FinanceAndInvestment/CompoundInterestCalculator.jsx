import React, { useState } from 'react';

const CompoundInterestCalculator = () => {
    const [principalAmount, setPrincipalAmount] = useState('');
    const [annualRate, setAnnualRate] = useState('');
    const [compoundFrequency, setCompoundFrequency] = useState('monthly');
    const [periodUnit, setPeriodUnit] = useState('years');
    const [periodValue, setPeriodValue] = useState('');
    const [interestEarned, setInterestEarned] = useState('');
    const [totalValue, setTotalValue] = useState('');

    // Function to get frequency value
    const getFrequency = (frequency) => {
        switch (frequency) {
            case 'daily':
                return 365;
            case 'weekly':
                return 52;
            case 'monthly':
                return 12;
            case 'semiannually':
                return 2;
            case 'annually':
                return 1;
            default:
                return 1;
        }
    };

    // Function to get unit value
    const getUnit = (unit) => {
        switch (unit) {
            case 'days':
                return 365;
            case 'weeks':
                return 52;
            case 'months':
                return 12;
            case 'years':
                return 1;
            default:
                return 1;
        }
    };

    // Function to format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);
    };

    const calculateCompoundInterest = () => {
        // Convert input values to numbers
        let principal = parseFloat(principalAmount);
        let rate = parseFloat(annualRate);
        const frequency = getFrequency(compoundFrequency);
        const unit = getUnit(periodUnit);
        const value = parseInt(periodValue);

        // Validate input values
        if (isNaN(principal) || isNaN(rate) || isNaN(value)) {
            alert('Please enter valid numeric values.');
            return;
        }

        // Handle commas in principal amount
        if (typeof principalAmount === 'string') {
            principal = parseFloat(principalAmount.replace(/,/g, ''));
        }

        // Calculate compound interest
        const n = frequency; // Compound frequency
        const r = rate / 100; // Annual interest rate (decimal)
        let t = value; // Period value
        if (periodUnit !== 'years') {
            // Convert period value to years if not in years
            t /= unit;
        }
        const amount = principal * Math.pow((1 + r / n), n * t); // Total value after interest
        const interest = amount - principal; // Interest earned

        // Update state with formatted calculated values
        setInterestEarned(formatCurrency(interest.toFixed(2)));
        setTotalValue(formatCurrency(amount.toFixed(2)));
    };

    const resetFields = () => {
        setPrincipalAmount('');
        setAnnualRate('');
        setCompoundFrequency('monthly');
        setPeriodUnit('years');
        setPeriodValue('');
        setInterestEarned('');
        setTotalValue('');
    };

    const handleInputChange = (event, setterFunction) => {
        const inputValue = event.target.value;
        // Only allow digits (0-9) and backspace (key code 8)
        if (/^\d*$/.test(inputValue) || event.keyCode === 8) {
            setterFunction(inputValue);
        }
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>
                        Compound Interest Calculator
                    </h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Principal Amount</span>
                        <input type="text" className="form-control" value={principalAmount}
                            onChange={(e) => handleInputChange(e, setPrincipalAmount)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Annual Rate (%)</span>
                        <input type="text" className="form-control" value={annualRate}
                            onChange={(e) => handleInputChange(e, setAnnualRate)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Compound Frequency</span>
                        <select className="form-select" value={compoundFrequency} onChange={(e) => handleInputChange(e, setCompoundFrequency)}>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="semi-annually">Semi-Annually</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Period Unit</span>
                        <select className="form-select" value={periodUnit} onChange={(e) => handleInputChange(e, setPeriodUnit)} >
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                            <option value="months">Months</option>
                            <option value="years">Years</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Period Value</span>
                        <input type="text" className="form-control" value={periodValue} onChange={(e) => handleInputChange(e, setPeriodValue)} />
                    </div>
                    <div>
                        <button className="btn btn-success btn-sm" onClick={calculateCompoundInterest}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    <div>
                        <hr />
                        <strong>
                            Interest Earned :
                            <span className='text-success'>
                                &nbsp; {interestEarned}
                            </span>
                        </strong>
                        <br />
                        <strong>
                            Total Value :
                            <span className='text-success'>
                                &nbsp; {totalValue}
                            </span>
                        </strong>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CompoundInterestCalculator;
