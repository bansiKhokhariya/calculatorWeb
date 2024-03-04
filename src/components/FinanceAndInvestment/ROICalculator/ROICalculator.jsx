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
                            onChange={(e) => {
                                const input = e.target.value.replace(/\D/g, '');
                                setAmountInvested(input);
                            }}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Amount Returned</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={amountReturned}
                            onChange={(e) => {
                                const input = e.target.value.replace(/\D/g, '');
                                setAmountReturned(input);
                            }}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Term(Year)</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={term}
                            onChange={(e) => {
                                const input = e.target.value.replace(/\D/g, '');
                                setTerm(input);
                            }}
                        />
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
