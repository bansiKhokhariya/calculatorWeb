import React, { useState } from 'react';

const PresentValueCalculator = () => {
    // State variables to store input values and result
    const [futureValue, setFutureValue] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [numberOfPeriods, setNumberOfPeriods] = useState('');
    const [presentValue, setPresentValue] = useState('');
    const [totalInterest, setTotalInterest] = useState('');

    // Function to handle calculation when any input value changes
    const calculateResult = () => {
        // Convert input values to numbers
        const futureVal = parseFloat(futureValue);
        const rate = parseFloat(interestRate) / 100;
        const periods = parseInt(numberOfPeriods);

        // Validate input values
        if (isNaN(futureVal) || isNaN(rate) || isNaN(periods)) {
            alert('Please enter valid numeric values.');
            return;
        }

        // Calculate present value
        const presentVal = futureVal / Math.pow(1 + rate, periods);
        setPresentValue(presentVal.toFixed(2));

        // Calculate total interest
        const totalInt = futureVal - presentVal;
        setTotalInterest(totalInt.toFixed(2));
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>Present Value of Future Money Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Future Value</span>
                        <input type="number" className="form-control" value={futureValue} onChange={(e) => setFutureValue(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Rate of Interest (%)</span>
                        <input type="number" className="form-control" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Number of Periods (years)</span>
                        <input type="number" className="form-control" value={numberOfPeriods} onChange={(e) => setNumberOfPeriods(e.target.value)} />
                    </div>
                    <button className='btn btn-sm btn-success' onClick={calculateResult}>Calculate</button>
                    {(presentValue !== '' && totalInterest !== '') &&
                        <div>
                            <hr />
                            <strong>Present Value of Investment: <span className='text-success'>₹ {presentValue}</span></strong>
                            <br />
                            <strong>Total Interest: <span className='text-success'>₹ {totalInterest}</span></strong>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default PresentValueCalculator;
