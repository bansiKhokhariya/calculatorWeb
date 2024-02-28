import React, { useState } from 'react';

function LoanCalculator() {
    // State variables for input fields
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [loanTermYears, setLoanTermYears] = useState(0);
    const [extraPayment, setExtraPayment] = useState(0);
    const [result, setResult] = useState({});

    // Function to handle loan calculation
    const calculateLoan = () => {
        const loanAmountNum = parseFloat(loanAmount);
        const interestRateNum = parseFloat(interestRate) / 100 / 12;
        const loanTermMonthsNum = parseInt(loanTermYears) * 12;
        const extraPaymentNum = parseFloat(extraPayment);

        // mortgage constant Calculations
        const mortgageConstant = (interestRateNum * Math.pow(1 + interestRateNum, loanTermMonthsNum)) /
            (Math.pow(1 + interestRateNum, loanTermMonthsNum) - 1) * 12;

        // monthly payment Calculations
        var x = Math.pow(1 + interestRateNum, loanTermMonthsNum) + extraPaymentNum;
        var monthlyPayment = (loanAmountNum * x * interestRateNum) / (x - 1);

        setResult({
            mortgageConstant: (mortgageConstant * 100).toFixed(2) + '%',
            monthlyPayment: (monthlyPayment.toFixed(2)),
            annualPayment: (monthlyPayment * 12).toFixed(2),
            totalInterest: ((monthlyPayment * loanTermMonthsNum) - loanAmountNum).toFixed(2)
        })

    };

    return (
        <>
            <div className='percentage-caculator-section-main'>
                <div className="percentage-caculator-section">
                    <h2 className='percentage-caculator-title'>Loan Calculator</h2>
                    <div className='percentage-caculator-main-box' >
                        <div className="conversion">

                            <div className='percentage-input-box'>
                                <label className='percentage-caculator-lable' htmlFor="loanamount">Loan Amount : </label>
                                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                    <input
                                        className='percentage-caculator-input'
                                        type="text"
                                        name=""
                                        id="loanamount"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(e.target.value.replace(/\D/g, ''))}
                                    />
                                    &nbsp;
                                    &nbsp;
                                </div>
                            </div>
                            <div className='percentage-input-box'>
                                <label className='percentage-caculator-lable' htmlFor="interestRate">Interest Rate :</label>
                                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                    <input
                                        className='percentage-caculator-input'
                                        type="text"
                                        name=""
                                        id="interestRate"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(e.target.value.replace(/\D/g, ''))}
                                    />
                                    <div style={{ fontWeight: '600' }}>
                                        %
                                    </div>
                                </div>
                            </div>
                            <div className='percentage-input-box'>
                                <label className='percentage-caculator-lable' htmlFor="loanTermYears">Years To Pay :</label>
                                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                    <input
                                        className='percentage-caculator-input'
                                        type="text"
                                        name=""
                                        id="loanTermYears"
                                        value={loanTermYears}
                                        onChange={(e) => setLoanTermYears(e.target.value.replace(/\D/g, ''))}
                                    />
                                    &nbsp;
                                    &nbsp;
                                </div>
                            </div>
                            <div className='percentage-input-box'>
                                <label className='percentage-caculator-lable' htmlFor="extraPayment">Extra Payment :</label>
                                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                    <input
                                        className='percentage-caculator-input'
                                        type="text"
                                        name=""
                                        id="extraPayment"
                                        value={extraPayment}
                                        onChange={(e) => setExtraPayment(e.target.value.replace(/\D/g, ''))}
                                    />
                                    &nbsp;
                                    &nbsp;
                                </div>
                            </div>

                            <div className='percentage-button-section'>
                                <div className='percentage-button green-button' onClick={calculateLoan}>
                                    Calculate
                                </div>
                            </div>

                            <div className='percentage-result-section'>
                                <div className='result-value'>
                                    {result.mortgageConstant}
                                </div>
                            </div>

                            <div className='percentage-result-section'>
                                <div className='result-value'>
                                    Monthly Payment  :  <span className='result-value-span-green'> {result.monthlyPayment}</span>
                                </div>
                                <div className='result-value'>
                                    Annual Payment  :  <span className='result-value-span-green'> {result.annualPayment}</span>
                                </div>
                                <div className='result-value'>
                                    Total Payment  :  <span className='result-value-span-green'> {result.annualPayment}</span>
                                </div>
                                <div className='result-value'>
                                    Total Interest  :  <span className='result-value-span-green'> {result.totalInterest}</span>
                                </div>
                                <div className='result-value'>
                                    Mortgage Constant  :  <span className='result-value-span-green'> {result.mortgageConstant}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default LoanCalculator;
