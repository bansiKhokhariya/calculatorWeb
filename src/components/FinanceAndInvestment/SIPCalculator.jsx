import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const SIPCalculator = () => {
    // State variables to store input values and result
    const [SIPAmount, setSIPAmount] = useState('');
    const [SIPPeriod, setSIPPeriod] = useState('');
    const [expectedReturnRate, setExpectedReturnRate] = useState('');
    const [wealthGained, setWealthGained] = useState('');
    const [investedAmount, setInvestedAmount] = useState('');
    const [totalWealth, setTotalWealth] = useState('');
    const [chartData, setChartData] = useState({});

    // Function to handle calculation when any input value changes
    const calculateResult = () => {

        const SIPAmountWithoutComma = SIPAmount.replace(/,/g, "");
        const monthlySIPAmount = parseFloat(SIPAmountWithoutComma);
        const SIPPeriodWithoutComma = SIPPeriod.replace(/,/g, "");
        const years = parseInt(SIPPeriodWithoutComma);
        const expectedReturnRateWithoutComma = expectedReturnRate.replace(/,/g, "");
        const rateOfReturnPercentage = parseFloat(expectedReturnRateWithoutComma) / 100;

        // Validate input values
        if (isNaN(monthlySIPAmount) || isNaN(years) || isNaN(rateOfReturnPercentage)) {
            alert('Please enter valid numeric values.');
            return;
        }

        // Calculate future value using the formula for compound interest
        let futureValue = 0;
        let labels = [];
        let data = [];
        for (let i = 1; i <= years; i++) {
            futureValue += monthlySIPAmount * 12; // Add SIP amount
            futureValue *= 1 + rateOfReturnPercentage; // Apply annual return rate
            labels.push(`Year ${i}`);
            data.push(futureValue.toFixed(2));
        }

        // Update the state with the calculated results
        const totalInvestment = monthlySIPAmount * 12 * years;
        const wealthGainedValue = futureValue - totalInvestment;
        setWealthGained(wealthGainedValue.toFixed(2));
        setInvestedAmount(totalInvestment.toFixed(2));
        setTotalWealth(futureValue.toFixed(2));

        // Set chart data
        setChartData({
            labels: labels,
            datasets: [{
                label: 'Investment Growth',
                data: data,
                backgroundColor: '#007500',
                borderWidth: 1
            }]
        });
    };

    const handleInputChange = (event, setterFunction) => {
        const inputValue = event.target.value;
        // Only allow digits (0-9) and backspace (key code 8)
        if (/^\d*$/.test(inputValue) || event.keyCode === 8) {
            setterFunction(inputValue);
        }
    };

    const resetFields = () => {
        setSIPAmount('');
        setSIPPeriod('');
        setExpectedReturnRate('');
        setWealthGained('');
        setInvestedAmount('');
        setTotalWealth('');
        setChartData({});
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>SIP Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Monthly SIP Amount</span>
                        </div>
                        <input type="text" className="form-control" value={SIPAmount} inputMode='numeric' onChange={(e) => handleInputChange(e, setSIPAmount)} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">SIP Period (Years)</span>
                        </div>
                        <input type="text" className="form-control" value={SIPPeriod} inputMode='numeric' onChange={(e) => handleInputChange(e, setSIPPeriod)} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Expected Return Rate (p.a.) (%)</span>
                        </div>
                        <input type="text" className="form-control" value={expectedReturnRate} inputMode='numeric' onChange={(e) => handleInputChange(e, setExpectedReturnRate)} />
                    </div>
                    <div>
                        <button className='btn btn-sm btn-success' onClick={calculateResult}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    {totalWealth &&
                        <div>
                            <hr />
                            <strong>Wealth Gained: <span className='text-success'> {wealthGained}</span></strong>
                            <br />
                            <strong>Invested Amount:<span className='text-success'> {investedAmount}</span></strong>
                            <br />
                            <strong>Total Wealth:<span className='text-success'> {totalWealth}</span></strong>
                            <hr />
                        </div>
                    }
                    <div>
                        {chartData.labels &&
                            <>
                                <h5 className='mb-4 text-center'>Yearly Investement Growth Chart</h5>
                                <div className='pieChart-box'>
                                    <Doughnut
                                        data={chartData} />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SIPCalculator;


