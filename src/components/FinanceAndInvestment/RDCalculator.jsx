import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RDCalculator = () => {
    const [monthlyDeposit, setMonthlyDeposit] = useState('');
    const [numberOfMonths, setNumberOfMonths] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [totalInterest, setTotalInterest] = useState('');
    const [depositedAmount, setDepositedAmount] = useState('');
    const [totalMaturityAmount, setTotalMaturityAmount] = useState('');
    const [chartData, setChartData] = useState({});
    const maxMonthlyDeposit = 10000000;

    const calculateMaturityAmount = () => {
        const deposit = parseFloat(monthlyDeposit);
        const months = parseInt(numberOfMonths);
        const rate = parseFloat(interestRate) / 100;

        // Validate input values
        if (isNaN(deposit) || isNaN(months) || isNaN(rate)) {
            alert('Please enter valid numeric values.');
            return;
        }

        if (deposit > maxMonthlyDeposit) {
            alert('Monthly RD deposit cannot exceed 1,00,00,000 (1 crore).');
            return;
        }

        const totalInterest = (deposit * months * (months + 1) * rate / 24);

        // Calculate deposited amount
        const depositedAmount = deposit * months;

        // Calculate total maturity amount
        const totalMaturityAmount = depositedAmount + totalInterest;

        // Update state with calculated values
        setTotalInterest(totalInterest.toFixed(2));
        setDepositedAmount(depositedAmount.toFixed(2));
        setTotalMaturityAmount(totalMaturityAmount.toFixed(2));

        setChartData({
            labels: ['Deposited Amount', 'Interest Earned'],
            datasets: [{
                data: [depositedAmount, totalInterest],
                backgroundColor: ['#007bff', '#28a745'],
                hoverBackgroundColor: ['#0056b3', '#218838']
            }]
        })

    };

    const resetFields = () => {
        setMonthlyDeposit('');
        setNumberOfMonths('');
        setInterestRate('');
        setTotalInterest('');
        setDepositedAmount('');
        setTotalMaturityAmount('');
        setChartData({});
    };

    return (
        <div className="bootstrap-card-section">
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>RD Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Monthly RD Deposit</span>
                        <input type="number" className="form-control" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Number of Months</span>
                        <input type="number" className="form-control" value={numberOfMonths} onChange={(e) => setNumberOfMonths(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">RD Interest Rate (%)</span>
                        <input type="number" className="form-control" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                    </div>
                    <div>
                        <button className="btn btn-success btn-sm" onClick={calculateMaturityAmount}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    {totalInterest && depositedAmount && (
                        <div>
                            <hr />
                            <strong>Total Interest Earned: <span className='text-success'> {totalInterest}</span></strong>
                            <br />
                            <strong>Deposited Amount: <span className='text-success'> {depositedAmount}</span></strong>
                            <br />
                            <strong>Total Maturity Amount: <span className='text-success'>{totalMaturityAmount}</span> </strong>
                            <hr />
                            <div className="pieChart-box mt-3">
                                <Pie data={chartData} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RDCalculator;
