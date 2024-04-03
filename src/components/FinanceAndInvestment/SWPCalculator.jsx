import React, { useState } from 'react';

const SWPCalculator = () => {
    // State variables to store input values and result
    const [totalInvestment, setTotalInvestment] = useState(500000);
    const [withdrawalPerMonth, setWithdrawalPerMonth] = useState(10000);
    const [expectedReturnsRate, setExpectedReturnsRate] = useState(8);
    const [timePeriod, setTimePeriod] = useState(5);
    const [totalWithdrawal, setTotalWithdrawal] = useState('');
    const [finalValue, setFinalValue] = useState('');

    // Function to handle calculation when any input value changes
    const calculateValues = () => {
        // Convert input values to numbers
        const investment = parseFloat(totalInvestment);
        const withdrawal = parseFloat(withdrawalPerMonth);
        const returnsRate = parseFloat(expectedReturnsRate) / 100;
        const years = parseInt(timePeriod);

        // Calculate total withdrawal
        const totalWithdrawalAmount = withdrawal * 12 * years;
        setTotalWithdrawal(totalWithdrawalAmount.toFixed(2));

        // Calculate final value using the SWP formula
        let currentValue = investment;
        const months = years * 12;
        for (let i = 0; i < months; i++) {
            const interest = currentValue * (returnsRate / 12);
            currentValue += (interest - withdrawal);
        }

        // Update state with the calculated final value
        setFinalValue(currentValue.toFixed(2));
    };

    const resetFields = () => {
        setTotalInvestment('');
        setWithdrawalPerMonth('')
        setExpectedReturnsRate('')
        setTimePeriod('')
        setTotalWithdrawal('')
        setFinalValue('')
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>SWP Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Total Investment</span>
                        <input type="number" className="form-control" value={totalInvestment} onChange={(e) => setTotalInvestment(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Withdrawal per month</span>
                        <input type="number" className="form-control" value={withdrawalPerMonth} onChange={(e) => setWithdrawalPerMonth(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Expected Returns Rate (p.a) (%)</span>
                        <input type="number" className="form-control" value={expectedReturnsRate} onChange={(e) => setExpectedReturnsRate(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Time Period (Year)</span>
                        <input type="number" className="form-control" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} />
                    </div>
                    <div>
                        <button className='btn btn-sm btn-success' onClick={calculateValues}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    {(totalWithdrawal !== '' && finalValue !== '') &&
                        <div>
                            <hr />
                            <strong>Total Withdrawal: <span className='text-success'>{totalWithdrawal}</span></strong>
                            <br />
                            <strong>Final Value: <span className='text-success'>{finalValue}</span></strong>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SWPCalculator;

