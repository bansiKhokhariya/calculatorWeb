import React, { useState } from 'react';

const DownPaymentCalculator = () => {
    // State variables to store input values and result
    const [totalCost, setTotalCost] = useState('');
    const [downPaymentPercentage, setDownPaymentPercentage] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [processingFeePercentage, setProcessingFeePercentage] = useState('');
    const [loanTenure, setLoanTenure] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [processingFee, setProcessingFee] = useState('');
    const [cashNeeded, setCashNeeded] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');

    // Function to handle calculation when any input value changes
    const calculateResult = () => {
        // Convert input values to numbers
        const assetCost = parseFloat(totalCost);
        const downPaymentPercent = parseFloat(downPaymentPercentage);
        const interestRatePercent = parseFloat(interestRate) / 100;
        const processingFeePercent = parseFloat(processingFeePercentage) / 100;
        const tenureYears = parseFloat(loanTenure);

        // Validate input values
        if (isNaN(assetCost) || isNaN(downPaymentPercent) || isNaN(interestRatePercent) || isNaN(processingFeePercent) || isNaN(tenureYears)) {
            alert('Please enter valid numeric values.');
            return;
        }

        // Calculate down payment
        const downPaymentAmount = (downPaymentPercent / 100) * assetCost;
        setDownPayment(downPaymentAmount.toFixed(2));

        // Calculate loan amount
        const loanAmountValue = assetCost - downPaymentAmount;
        setLoanAmount(loanAmountValue.toFixed(2));

        // Calculate processing fee
        const processingFeeAmount = processingFeePercent * loanAmountValue;
        setProcessingFee(processingFeeAmount.toFixed(2));

        // Calculate cash needed
        const cashNeededValue = downPaymentAmount + processingFeeAmount;
        setCashNeeded(cashNeededValue.toFixed(2));

        // Calculate monthly payment
        const monthlyInterestRate = interestRatePercent / 12;
        const totalMonths = tenureYears * 12;
        const monthlyPaymentValue = (loanAmountValue * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
        setMonthlyPayment(monthlyPaymentValue.toFixed(2));
    };

    const resetFields = () => {
        setTotalCost('');
        setDownPaymentPercentage('');
        setInterestRate('');
        setProcessingFeePercentage('');
        setLoanTenure('');
        setDownPayment('');
        setLoanAmount();
        setProcessingFee();
        setCashNeeded();
        setMonthlyPayment();
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>Down Payment Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Total Cost of Asset</span>
                        <input type="number" className="form-control" value={totalCost} onChange={(e) => setTotalCost(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Down Payment (in %)</span>
                        <input type="number" className="form-control" value={downPaymentPercentage} onChange={(e) => setDownPaymentPercentage(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Interest Rate (in %)</span>
                        <input type="number" className="form-control" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Processing Fee (in %)</span>
                        <input type="number" className="form-control" value={processingFeePercentage} onChange={(e) => setProcessingFeePercentage(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Loan Tenure (in Years)</span>
                        <input type="number" className="form-control" value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} />
                    </div>
                    <div>
                        <button className='btn btn-sm btn-success' onClick={calculateResult}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    {(downPayment !== '' && loanAmount !== '' && processingFee !== '' && cashNeeded !== '' && monthlyPayment !== '') &&
                        <div>
                            <hr />
                            <strong>Down Payment (DP): <span className='text-success'>{downPayment}</span></strong>
                            <br />
                            <strong>Loan Amount: <span className='text-success'>{loanAmount}</span></strong>
                            <br />
                            <strong>Processing Fee (PF): <span className='text-success'>{processingFee}</span></strong>
                            <br />
                            <strong>Cash Needed (DP + PF): <span className='text-success'>{cashNeeded}</span></strong>
                            <br />
                            <strong>Monthly Payment: <span className='text-success'>{monthlyPayment}</span></strong>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default DownPaymentCalculator;
