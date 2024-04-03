import React, { useState } from 'react';

const CAGRCalculator = () => {
    const [beginningValue, setBeginningValue] = useState('');
    const [endingValue, setEndingValue] = useState('');
    const [yearsOfInvestment, setYearsOfInvestment] = useState('');
    const [cagr, setCAGR] = useState('');

    const calculateCAGR = () => {
        // Convert input values to numbers
        const begin = parseFloat(beginningValue);
        const end = parseFloat(endingValue);
        const years = parseInt(yearsOfInvestment);

        // Validate input values
        if (isNaN(begin) || isNaN(end) || isNaN(years) || years <= 0) {
            alert('Please enter valid numeric values for Beginning Value, Ending Value, and Number of Years of Investment.');
            return;
        }

        // Calculate CAGR
        const cagrValue = Math.pow((end / begin), (1 / years)) - 1;

        // Convert CAGR to percentage and round to two decimal places
        const cagrPercentage = (cagrValue * 100).toFixed(2);

        // Update state with calculated CAGR
        setCAGR(cagrPercentage);
    };

    const resetFields = () => {
        setBeginningValue('');
        setEndingValue('');
        setYearsOfInvestment('');
        setCAGR('');
    };

    return (
        <div className="bootstrap-card-section">
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>CAGR Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Beginning Value</span>
                        <input
                            type="number"
                            className="form-control"
                            value={beginningValue}
                            onChange={(e) => setBeginningValue(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Ending Value</span>
                        <input
                            type="number"
                            className="form-control"
                            value={endingValue}
                            onChange={(e) => setEndingValue(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Number of Years of Investment</span>
                        <input
                            type="number"
                            className="form-control"
                            value={yearsOfInvestment}
                            onChange={(e) => setYearsOfInvestment(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-success btn-sm" onClick={calculateCAGR}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    {cagr &&
                        <div>
                            <hr />
                            <strong>CAGR (Compound Annual Growth Rate): <span className='text-success'> {cagr}%</span></strong>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CAGRCalculator; 
