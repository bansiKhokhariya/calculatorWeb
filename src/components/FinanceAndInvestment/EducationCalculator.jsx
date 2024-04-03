import React, { useState } from 'react';

const EducationCalculator = () => {
    // State variables to store input values and result
    const [currentSavings, setCurrentSavings] = useState('');
    const [presentCostOfEducation, setPresentCostOfEducation] = useState('');
    const [expectedInflationRate, setExpectedInflationRate] = useState('');
    const [childCurrentAge, setChildCurrentAge] = useState('');
    const [childAgeWhenNeeded, setChildAgeWhenNeeded] = useState('');
    const [expectedRateOfReturn, setExpectedRateOfReturn] = useState('');
    const [futureValueOfEducation, setFutureValueOfEducation] = useState('');
    const [investmentRequiredPerMonth, setInvestmentRequiredPerMonth] = useState('');

    // Function to handle calculation when any input value changes
    const calculateEducationCost = () => {
        // Convert input values to numbers
        const savings = parseFloat(currentSavings);
        const presentCost = parseFloat(presentCostOfEducation);
        const inflationRate = parseFloat(expectedInflationRate) / 100;
        const currentAge = parseInt(childCurrentAge);
        const ageNeeded = parseInt(childAgeWhenNeeded);
        const rateOfReturn = parseFloat(expectedRateOfReturn) / 100;

        // Validate input values
        if (isNaN(savings) || isNaN(presentCost) || isNaN(inflationRate) || isNaN(currentAge) || isNaN(ageNeeded) || isNaN(rateOfReturn)) {
            alert('Please enter valid numeric values.');
            return;
        }

        // Calculate future value of education
        const yearsLeft = ageNeeded - currentAge;
        const monthsLeft = yearsLeft * 12;
        const monthlyInflation = Math.pow(1 + inflationRate, 1 / 12) - 1;
        const futureValue = presentCost * Math.pow(1 + monthlyInflation, monthsLeft);

        // Calculate investment required per month
        const monthsInvesting = monthsLeft;
        const monthlyRateOfReturn = Math.pow(1 + rateOfReturn, 1 / 12) - 1;
        const monthlyInvestment = (futureValue - savings) * (monthlyRateOfReturn / (Math.pow(1 + monthlyRateOfReturn, monthsInvesting) - 1));

        // Update state with calculated values
        setFutureValueOfEducation(futureValue.toFixed(2));
        setInvestmentRequiredPerMonth(monthlyInvestment.toFixed(2));
    };

    const resetFields = () => {
        setCurrentSavings('')
        setPresentCostOfEducation('')
        setExpectedInflationRate('')
        setChildCurrentAge('')
        setChildAgeWhenNeeded('')
        setExpectedRateOfReturn('')
        setFutureValueOfEducation('')
        setInvestmentRequiredPerMonth('')
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>Education Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Current Savings</span>
                        <input type="number" className="form-control" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Present Cost of Education</span>
                        <input type="number" className="form-control" value={presentCostOfEducation} onChange={(e) => setPresentCostOfEducation(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Expected Inflation Rate (P.A)</span>
                        <input type="number" className="form-control" value={expectedInflationRate} onChange={(e) => setExpectedInflationRate(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Child's Current Age</span>
                        <input type="number" className="form-control" value={childCurrentAge} onChange={(e) => setChildCurrentAge(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Child's Age When Needed</span>
                        <input type="number" className="form-control" value={childAgeWhenNeeded} onChange={(e) => setChildAgeWhenNeeded(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Expected Rate of Return on Investment (P.A)</span>
                        <input type="number" className="form-control" value={expectedRateOfReturn} onChange={(e) => setExpectedRateOfReturn(e.target.value)} />
                    </div>
                    <div>
                        <button className='btn btn-sm btn-success' onClick={calculateEducationCost}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    {futureValueOfEducation !== '' &&
                        <div>
                            <hr />
                            <strong>Future Value of Cost of Education: <span className='text-success'>{futureValueOfEducation}</span> </strong>
                            <br />
                            <strong>Investment Required Per Month: <span className='text-success'>{investmentRequiredPerMonth}</span></strong>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default EducationCalculator;

