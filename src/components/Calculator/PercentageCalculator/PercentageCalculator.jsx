import React, { useState } from 'react';

const PercentageCalculator = () => {
    const [originalValue1, setOriginalValue1] = useState('');
    const [percentage1, setPercentage1] = useState('');
    const [result1, setResult1] = useState('');

    const [originalValue2, setOriginalValue2] = useState('');
    const [percentage2, setPercentage2] = useState('');
    const [result2, setResult2] = useState('');

    const calculatePercentage1 = () => {
        const originalValue = parseFloat(originalValue1.trim());
        const percentage = parseFloat(percentage1.trim());

        if (!isNaN(originalValue) && !isNaN(percentage) && percentage !== 0) {
            const resultValue = (originalValue * percentage) / 100;
            setResult1(resultValue.toFixed(2));
        }
    };

    const resetInputs1 = () => {
        setOriginalValue1('');
        setPercentage1('');
        setResult1('');
    };

    const calculatePercentage2 = () => {
        const originalValue = parseFloat(originalValue2.trim());
        const percentage = parseFloat(percentage2.trim());

        if (!isNaN(originalValue) && !isNaN(percentage) && percentage !== 0) {
            const resultValue = (originalValue / percentage) * 100;
            setResult2(resultValue.toFixed(2));
        }
    };

    const resetInputs2 = () => {
        setOriginalValue2('');
        setPercentage2('');
        setResult2('');
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>
                        Percentage Calculator
                    </h1>
                </div>
                <div className="card-body card-text">
                    {/* Original value to percentage value */}
                    <h3 className='card-title mb-4'>Original value to percentage value</h3>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Original Value</span>
                        </div>
                        <input type="number" className="form-control" placeholder="Enter Value"
                            value={originalValue1}
                            onChange={(e) => setOriginalValue1(e.target.value)} inputMode='numeric'/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Percentage (%)</span>
                        </div>
                        <input type="number" className="form-control" placeholder="Enter Value"
                            value={percentage1}
                            onChange={(e) => setPercentage1(e.target.value)} inputMode='numeric'/>
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-sm btn-success' onClick={calculatePercentage1}>Calculate</button>
                        <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs1}>Reset</button>
                    </div>
                    {result1 &&
                        <div>
                            <strong> Result = <span className='text-success'> {result1} </span> </strong>
                        </div>
                    }
                    <hr />
                    {/* Percentage value to percentage */}
                    <h3 className='card-title mb-4'>Percentage value to percentage</h3>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Percentage value</span>
                        </div>
                        <input type="number" className="form-control" placeholder="Enter Value"
                            value={originalValue2}
                            onChange={(e) => setOriginalValue2(e.target.value)} inputMode='numeric'/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Percentage</span>
                        </div>
                        <input type="number" className="form-control" placeholder="Enter Value"
                            value={percentage2}
                            onChange={(e) => setPercentage2(e.target.value)} inputMode='numeric'/>
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-sm btn-success' onClick={calculatePercentage2}>Calculate</button>
                        <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs2}>Reset</button>
                    </div>
                    {result2 &&
                        <div>
                            <strong> Result = <span className='text-success'> {result2}% </span> </strong>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
};

export default PercentageCalculator;
