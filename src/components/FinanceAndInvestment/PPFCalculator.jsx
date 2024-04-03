import React, { useState } from 'react';

const PPFCalculator = () => {
    // State variables to store input values and result
    const [frequency, setFrequency] = useState('monthly');
    const [monthlyInvestment, setMonthlyInvestment] = useState('');
    const [currentRate, setCurrentRate] = useState('');
    const [investmentDuration, setInvestmentDuration] = useState('');
    const [maturityAmount, setMaturityAmount] = useState('');

    // Function to handle calculation when any input value changes
    const calculateMaturityAmount = () => {
        // Convert input values to numbers
        const monthlyInvestmentAmount = parseFloat(monthlyInvestment);
        const rateOfInterest = parseFloat(currentRate) / 100;
        const years = parseInt(investmentDuration);

        // Validate input values
        if (isNaN(monthlyInvestmentAmount) || isNaN(rateOfInterest) || isNaN(years)) {
            alert('Please enter valid numeric values.');
            return;
        }

        // Calculate maturity amount for different investment frequencies
        let maturity = 0;
        if (frequency === 'monthly') {
            const n = years * 12;
            const r = rateOfInterest / 12;
            maturity = monthlyInvestmentAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        } else if (frequency === 'quarterly') {
            const n = years * 4;
            const r = rateOfInterest / 4;
            maturity = monthlyInvestmentAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        } else if (frequency === 'half-yearly') {
            const n = years * 2;
            const r = rateOfInterest / 2;
            maturity = monthlyInvestmentAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        } else if (frequency === 'yearly') {
            const n = years;
            const r = rateOfInterest;
            maturity = monthlyInvestmentAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        }

        setMaturityAmount(maturity.toFixed(2));
    };

    const resetFields = () => {
        setMaturityAmount('');
        setMonthlyInvestment('');
        setCurrentRate('');
        setInvestmentDuration('')
        setFrequency('monthly')
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
                    <h1>PPF Investment Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text">Frequency of Investment</label>
                        </div>
                        <select className="form-select" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="half-yearly">Half-Yearly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">PPF Investment</span>
                        </div>
                        <input type="text" className="form-control" value={monthlyInvestment} onChange={(e) => handleInputChange(e, setMonthlyInvestment)} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Current PPF Investment Rate (%)</span>
                        </div>
                        <input type="text" className="form-control" value={currentRate} onChange={(e) => handleInputChange(e, setCurrentRate)} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Duration of Investment (Years)</span>
                        </div>
                        <input type="text" className="form-control" value={investmentDuration} onChange={(e) => handleInputChange(e, setInvestmentDuration)} />
                    </div>
                    <div>
                        <button className='btn btn-sm btn-success' onClick={calculateMaturityAmount}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    {maturityAmount &&
                        <div>
                            <hr />
                            <strong>Maturity Amount: <span className='text-success'> {maturityAmount}</span></strong>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default PPFCalculator;
