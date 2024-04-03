import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';

const DiscountCalculator = () => {
    const [totalInstallment, setTotalInstallment] = useState('');
    const [percentageRate, setPercentageRate] = useState('');
    const [payableAmount, setPayableAmount] = useState('');
    const [discount, setDiscount] = useState('');

    const calculateDiscount = () => {
        // Convert input values to numbers
        const total = parseFloat(totalInstallment);
        const rate = parseFloat(percentageRate);

        // Validate input values
        if (isNaN(total) || isNaN(rate) || rate < 0 || rate > 100) {
            alert('Please enter a valid total installment and percentage rate.');
            return;
        }

        // Calculate discount and payable amount
        const discountAmount = (total * rate) / 100;
        const payable = total - discountAmount;

        // Update state with calculated values
        setDiscount(discountAmount.toFixed(2));
        setPayableAmount(payable.toFixed(2));
    };

    // Pie chart data
    const data = {
        labels: ['Discount', 'Payable Amount'],
        datasets: [
            {
                data: [discount, payableAmount],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    const resetFields = () => {
        setTotalInstallment('');
        setPercentageRate('');
        setPayableAmount('');
        setDiscount('');
    };

    return (
        <div className="bootstrap-card-section">
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>Discount Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Total Installment</span>
                        <input
                            type="number"
                            className="form-control"
                            value={totalInstallment}
                            onChange={(e) => setTotalInstallment(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Percentage Rate</span>
                        <input
                            type="number"
                            className="form-control"
                            value={percentageRate}
                            onChange={(e) => setPercentageRate(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-success btn-sm" onClick={calculateDiscount}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    {discount !== '' && payableAmount !== '' && (
                        <div>
                            <hr />
                            <strong>Discount: <span className='text-success'>{discount}</span> </strong>
                            <br />
                            <strong>Payable Amount: <span className='text-success'>{payableAmount}</span> </strong>
                            <hr />
                            <div className="pieChart-box ">
                                <Pie data={data} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiscountCalculator;
