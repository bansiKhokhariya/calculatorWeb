import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Bansi = () => {
    const [totalInvestment, setTotalInvestment] = useState('');
    const [rateOfInterest, setRateOfInterest] = useState('');
    const [years, setYears] = useState('');
    const [months, setMonths] = useState('');
    const [compoundingPeriod, setCompoundingPeriod] = useState('monthly');
    const [maturityAmount, setMaturityAmount] = useState('');
    const [totalInterest, setTotalInterest] = useState('');
    const [chartData, setChartData] = useState({});
    const maxTotalInvestment = 10000000; // 1 crore

    const calculateMaturityAmount = () => {
        const principal = parseFloat(totalInvestment.replace(/,/g, ''));
        const rate = parseFloat(rateOfInterest) / 100;
        const time = parseInt(years) + parseInt(months) / 12;
        let n = 1;
        if (compoundingPeriod === 'quarterly') n = 4;
        else if (compoundingPeriod === 'half-yearly') n = 2;
        else if (compoundingPeriod === 'yearly') n = 1;

        if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
            alert('Please enter valid numeric values.');
            return;
        }

        if (principal > maxTotalInvestment) {
            alert('Total investment cannot exceed 1,00,00,000 (1 crore).');
            return;
        }

        const amount = principal * Math.pow((1 + rate / n), n * time);
        const interest = amount - principal;

        setMaturityAmount(amount.toFixed(2));
        setTotalInterest(interest.toFixed(2));

        // Generate pie chart data
        const pieChartData = {
            labels: ['Principal', 'Interest Earned'],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ['#007bff', '#28a745'],
                hoverBackgroundColor: ['#0056b3', '#218838']
            }]
        };

        setChartData(pieChartData);
    };

    const handleInputChange = (event, setterFunction) => {
        const inputValue = event.target.value;
        // Only allow digits (0-9) and backspace (key code 8)
        if (/^\d*$/.test(inputValue) || event.keyCode === 8) {
            setterFunction(inputValue);
        }
    };

    const resetFields = () => {
        setTotalInvestment('');
        setRateOfInterest('');
        setYears('');
        setMonths('');
        setCompoundingPeriod('monthly');
        setMaturityAmount('');
        setTotalInterest('');
        setChartData({});
    };

    return (
        <div className="bootstrap-card-section">
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>FD Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Total Investment</span>
                        <input type="text" className="form-control" value={totalInvestment} onChange={(e) => handleInputChange(e, setTotalInvestment)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Rate of Interest (p.a.)</span>
                        <input type="text" className="form-control" value={rateOfInterest} onChange={(e) => handleInputChange(e, setRateOfInterest)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Time Period (Years)</span>
                        <input type="number" className="form-control" value={years} onChange={(e) => setYears(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Time Period (Months)</span>
                        <input type="number" className="form-control" value={months} onChange={(e) => setMonths(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Compounding Period</span>
                        <select className="form-select" value={compoundingPeriod} onChange={(e) => setCompoundingPeriod(e.target.value)}>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="half-yearly">Half-Yearly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-success btn-sm" onClick={calculateMaturityAmount}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>

                    {maturityAmount && totalInterest && (
                        <div>
                            <hr />
                            <strong>Maturity Amount: <span className='text-success'> {maturityAmount}</span></strong>
                            <br />
                            <strong>Total Interest: <span className='text-success'>{totalInterest}</span></strong>
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

export default Bansi;
