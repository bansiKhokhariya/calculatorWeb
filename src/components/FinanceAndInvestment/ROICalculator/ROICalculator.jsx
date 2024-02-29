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

    const calculateROI = () => {
        // Convert input values to numbers
        const invested = parseFloat(amountInvested);
        const returned = parseFloat(amountReturned);
        const years = parseFloat(term);

        // Calculate gain or loss
        const gainLoss = returned - invested;

        // Calculate return on investment
        const roi = ((returned - invested) / invested) * 100;

        // Calculate simple annual ROI
        const simpleROI = roi / years;

        // Calculate compound annual ROI (assuming annually compounded)
        const compoundROI = ((1 + roi / 100) ** (1 / years) - 1) * 100;


        // Update state with calculated values
        setInvestmentPeriod(`${years} yr`);
        setGainOrLoss(gainLoss);
        setReturnOfInvestment(`${roi.toFixed(2)}%`);
        setSimpleAnnualROI(`${simpleROI.toFixed(2)}%`);
        setCompoundAnnualROI(`${compoundROI.toFixed(2)}%`);
    };

    return (
        <div className='percentage-caculator-section-main'>
            <div className="percentage-caculator-section">
                <h2 className='percentage-caculator-title'>Return on Investment (ROI) Calculator</h2>
                <div className='percentage-caculator-main-box' >
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="amountInvested">Amount Invested :</label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input
                                className='percentage-caculator-input'
                                type="text"
                                value={amountInvested}
                                onChange={(e) => setAmountInvested(e.target.value)}
                                id="amountInvested"
                            />
                            &nbsp;
                            &nbsp;
                        </div>
                    </div>
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="amountReturned">Amount Returned :</label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input
                                className='percentage-caculator-input'
                                type="text"
                                value={amountReturned}
                                onChange={(e) => setAmountReturned(e.target.value)}
                                id="amountReturned"
                            />
                            &nbsp;
                            &nbsp;
                        </div>
                    </div>
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="term">Term(Year) :</label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input
                                className='percentage-caculator-input'
                                type="text"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                id="term"
                            />
                            &nbsp;
                            &nbsp;
                        </div>
                    </div>
                    {/* Similar input boxes for amountReturned and term */}
                    <div className='percentage-button-section'>
                        <div className='percentage-button green-button' onClick={calculateROI}>
                            Calculate
                        </div>
                    </div>
                    <div className='percentage-result-section'>
                        <div className='result-value'>
                            Investment Period :  <span className='result-value-span-green'>{investmentPeriod}</span>
                        </div>
                        <div className='result-value'>
                            Gain or loss :  <span className='result-value-span-green'>{gainOrLoss}</span>
                        </div>
                        <div className='result-value'>
                            Return of Investment :  <span className='result-value-span-green'>{returnOfInvestment}</span>
                        </div>
                        <div className='result-value'>
                            Simple Annual ROI :  <span className='result-value-span-green'>{simpleAnnualROI}</span>
                        </div>
                        <div className='result-value'>
                            Compound Annual ROI :  <span className='result-value-span-green'>{compoundAnnualROI}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ROICalculator;
