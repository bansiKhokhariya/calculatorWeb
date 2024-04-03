import React, { useState } from 'react';

const SavingsCalculator = () => {
    // State variables to store input values and result
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanDuration, setLoanDuration] = useState('');
    const [monthlyEMI, setMonthlyEMI] = useState('');
    const [totalAmountPayable, setTotalAmountPayable] = useState('');
    const [interestComponent, setInterestComponent] = useState('');

    // Function to handle calculation when any input value changes
    const calculateResult = () => {
        // Convert input values to numbers
        const amount = parseFloat(loanAmount);
        const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
        const duration = parseInt(loanDuration) * 12; // Convert years to months

        // Validate input values
        if (isNaN(amount) || isNaN(rate) || isNaN(duration)) {
            alert('Please enter valid numeric values.');
            return;
        }

        // Calculate monthly EMI
        const emi = (amount * rate * Math.pow(1 + rate, duration)) / (Math.pow(1 + rate, duration) - 1);
        setMonthlyEMI(emi.toFixed(0));

        // Calculate total amount payable and interest component
        const totalPayable = monthlyEMI * duration;
        setTotalAmountPayable(totalPayable.toFixed(0));

        const totalInterest = totalPayable - amount;
        setInterestComponent(totalInterest.toFixed(0));
    };

    const resetFields = () => {
        setLoanAmount('');
        setInterestRate('');
        setLoanDuration('');
        setMonthlyEMI('')
        setTotalAmountPayable('')
        setInterestComponent('')
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>Savings Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Amount</span>
                        <input type="number" className="form-control" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Interest Rate (P.A)</span>
                        <input type="number" className="form-control" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Loan Duration (Years)</span>
                        <input type="number" className="form-control" value={loanDuration} onChange={(e) => setLoanDuration(e.target.value)} />
                    </div>
                    <div>
                        <button className='btn btn-sm btn-success' onClick={calculateResult}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    {(monthlyEMI !== '' && totalAmountPayable !== '' && interestComponent !== '') &&
                        <div>
                            <hr />
                            <strong>Monthly EMI: <span className='text-success'>₹ {monthlyEMI}</span></strong>
                            <br />
                            <strong>Total Amount Payable: <span className='text-success'>₹ {totalAmountPayable}</span></strong>
                            <br />
                            <strong>Interest Component: <span className='text-success'>₹ {interestComponent}</span></strong>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SavingsCalculator;
