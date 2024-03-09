import React, { useState } from 'react';

const ROICalculator = () => {
    const [amountInvested, setAmountInvested] = useState('');
    const [amountReturned, setAmountReturned] = useState('');
    const [term, setTerm] = useState('');
    const [investmentPeriod, setInvestmentPeriod] = useState('');
    const [gainOrLoss, setGainOrLoss] = useState('');
    const [returnOfInvestment, setReturnOfInvestment] = useState('');
    const [simpleAnnualROI, setSimpleAnnualROI] = useState('');
    const [compoundAnnualROI, setCompoundAnnualROI] = useState('');
    const [termError, setTermError] = useState('');

    const calculateROI = () => {
        // Convert input values to numbers
        const invested = parseFloat(amountInvested.replace(/,/g, ''));
        const returned = parseFloat(amountReturned.replace(/,/g, ''));
        const years = parseFloat(term);
    
        // Check if term input is empty or not a number
        if (isNaN(years) || years <= 0) {
            setTermError('Please enter a valid positive number for the term (year).');
            return;
        } else {
            setTermError('');
        }
    
        // Calculate gain or loss
        const gainLoss = returned - invested;
    
        // Calculate return on investment
        const roi = ((returned - invested) / invested) * 100;
    
        // Calculate simple annual ROI
        const simpleROI = roi / years;
    
        // Calculate compound annual ROI (assuming annually compounded)
        const compoundROI = (Math.pow((1 + roi / 100), (1 / years)) - 1) * 100;
    
        // Update state with calculated values
        setInvestmentPeriod(`${years} yr`);
        setGainOrLoss(addCommasAndDecimals(gainLoss));
        setReturnOfInvestment(`${addCommasAndDecimals(roi.toFixed(2))}%`);
        setSimpleAnnualROI(`${addCommasAndDecimals(simpleROI.toFixed(2))}%`);
        setCompoundAnnualROI(`${addCommasAndDecimals(compoundROI.toFixed(2))}%`);
    };
    

    const resetInputs = () => {
        setAmountInvested('');
        setAmountReturned('');
        setTerm('');
        setInvestmentPeriod('');
        setGainOrLoss('');
        setReturnOfInvestment('');
        setSimpleAnnualROI('');
        setCompoundAnnualROI('');
    };

    const handleChangeTerm = (e) => {
        const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setTerm(input.slice(0, 4)); // Limit to 4 digits
    };

    const handleChangeAmountInvested = (e) => {
        const input = e.target.value.replace(/[^\d.]/g, ''); // Remove non-numeric and non-decimal characters
        setAmountInvested(addCommasAndDecimals(input));
    };

    const handleChangeAmountReturned = (e) => {
        const input = e.target.value.replace(/[^\d.]/g, ''); // Remove non-numeric and non-decimal characters
        setAmountReturned(addCommasAndDecimals(input));
    };

    const addCommasAndDecimals = (value) => {
        if (typeof value === 'string') {
            const parts = value.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas to the integer part
            return parts.join('.'); // Combine integer and decimal parts
        } else {
            // If the value is not a string, return it as is
            return value;
        }
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>
                        Return on Investment (ROI) Calculator
                    </h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Amount Invested</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={amountInvested}
                            onChange={handleChangeAmountInvested}
                            inputMode='numeric'
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Amount Returned</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={amountReturned}
                            onChange={handleChangeAmountReturned}
                            inputMode='numeric'
                        />
                    </div>
                    <div className="input-group mb-3">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Term(Year)</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={term}
                            onChange={handleChangeTerm}
                            inputMode='numeric'
                        />
                    </div>
                    {termError && (
                        <div className="text-danger mb-3">{termError}</div>
                    )}
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-sm btn-success' onClick={calculateROI}>Calculate</button>
                        <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs}>Reset</button>
                    </div>
                    <div >
                        <div>
                            <strong>
                                Investment Period =
                                <span className='text-success'>
                                    &nbsp; {investmentPeriod}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Gain or loss =
                                <span className='text-success'>
                                    &nbsp; {gainOrLoss}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Return of Investment =
                                <span className='text-success'>
                                    &nbsp; {returnOfInvestment}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Simple Annual ROI =
                                <span className='text-success'>
                                    &nbsp; {simpleAnnualROI}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Compound Annual ROI =
                                <span className='text-success'>
                                    &nbsp; {compoundAnnualROI}
                                </span>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ROICalculator;

