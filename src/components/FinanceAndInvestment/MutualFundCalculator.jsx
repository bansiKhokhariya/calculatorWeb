import React, { useState } from 'react';

const MutualFundCalculator = () => {
    // State variables to store input values and result
    const [initialInvestment, setInitialInvestment] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [annualReturnRate, setAnnualReturnRate] = useState('');
    const [investmentDuration, setInvestmentDuration] = useState('');
    const [futureValue, setFutureValue] = useState('');

    // Function to handle calculation when any input value changes
    const calculateFutureValue = () => {
        // Convert input values to numbers
        const initialInvestmentAmount = parseFloat(initialInvestment);
        const monthlyContributionAmount = parseFloat(monthlyContribution);
        const annualReturnRatePercentage = parseFloat(annualReturnRate) / 100;
        const years = parseInt(investmentDuration);

        // Validate input values
        if (isNaN(initialInvestmentAmount) || isNaN(monthlyContributionAmount) || isNaN(annualReturnRatePercentage) || isNaN(years)) {
            alert('Please enter valid numeric values.');
            return;
        }

        // Calculate future value using the formula for compound interest
        let futureVal = initialInvestmentAmount;
        for (let i = 1; i <= years; i++) {
            futureVal *= 1 + annualReturnRatePercentage; // Apply annual return rate
            futureVal += monthlyContributionAmount * 12; // Add monthly contributions
        }

        // Update the state with the calculated future value
        setFutureValue(futureVal.toFixed(2));
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>Mutual Fund Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Initial Investment ($)</span>
                        </div>
                        <input type="text" className="form-control" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Monthly Contribution ($)</span>
                        </div>
                        <input type="text" className="form-control" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Expected Annual Return Rate (%)</span>
                        </div>
                        <input type="text" className="form-control" value={annualReturnRate} onChange={(e) => setAnnualReturnRate(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Investment Duration (Years)</span>
                        </div>
                        <input type="text" className="form-control" value={investmentDuration} onChange={(e) => setInvestmentDuration(e.target.value)} />
                    </div>
                    <div>
                        <button className='btn btn-sm btn-success' onClick={calculateFutureValue}>Calculate</button>
                    </div>
                    {futureValue &&
                        <div>
                            <hr />
                            <strong>Future Value: ${futureValue}</strong>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default MutualFundCalculator;
