import React, { useState } from 'react';

const LumpsumInvestmentCalculator = () => {
    // State variables to store input values and result
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [investmentPeriod, setInvestmentPeriod] = useState('');
    const [returns, setReturns] = useState('');
    const [totalWealth, setTotalWealth] = useState('');
    const [wealthGained, setWealthGained] = useState('');

    // Function to handle calculation when any input value changes
    const calculateResult = () => {
        // Convert input values to numbers
        const amount = parseFloat(investmentAmount);
        const period = parseInt(investmentPeriod);
        const rate = parseFloat(returns) / 100;

        // Validate input values
        if (isNaN(amount) || isNaN(period) || isNaN(rate)) {
            alert('Please enter valid numeric values.');
            return;
        }

        // Calculate total wealth
        const total = amount * Math.pow((1 + rate), period);
        setTotalWealth(total.toFixed(2));

        // Calculate wealth gained
        const gained = total - amount;
        setWealthGained(gained.toFixed(2));
    };

    const resetFields = () => {
        setInvestmentAmount('');
        setInvestmentPeriod('');
        setReturns('');
        setTotalWealth('')
        setWealthGained('')
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>Lumpsum Investment Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Investment Amount</span>
                        <input type="number" className="form-control" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Investment Period (years)</span>
                        <input type="number" className="form-control" value={investmentPeriod} onChange={(e) => setInvestmentPeriod(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Returns (%)</span>
                        <input type="number" className="form-control" value={returns} onChange={(e) => setReturns(e.target.value)} />
                    </div>
                    <div>
                        <button className='btn btn-sm btn-success' onClick={calculateResult}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    {(totalWealth !== '' && wealthGained !== '') &&
                        <div>
                            <hr />
                            <strong>Total Wealth: <span className='text-success'>₹ {totalWealth}</span></strong>
                            <br />
                            <strong>Wealth Gained: <span className='text-success'>₹ {wealthGained}</span></strong>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default LumpsumInvestmentCalculator;
