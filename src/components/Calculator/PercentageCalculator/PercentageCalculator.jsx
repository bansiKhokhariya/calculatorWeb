import React, { useState } from 'react';

const PercentageCalculator = () => {
    const [originalValue1, setOriginalValue1] = useState('');
    const [percentage1, setPercentage1] = useState('');
    const [result1, setResult1] = useState('');

    const [originalValue2, setOriginalValue2] = useState('');
    const [percentage2, setPercentage2] = useState('');
    const [result2, setResult2] = useState('');

    const handleChangeOriginalValue1 = (event) => {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setOriginalValue1(value);
        }
    };

    const handleChangePercentage1 = (event) => {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setPercentage1(value);
        }
    };

    const calculatePercentage1 = () => {
        if (originalValue1.trim() !== '' && percentage1.trim() !== '') {
            const resultValue = (parseFloat(originalValue1) * parseFloat(percentage1)) / 100;
            setResult1(resultValue.toFixed(2));
        }
    };

    const resetInputs1 = () => {
        setOriginalValue1('');
        setPercentage1('');
        setResult1('');
    };

    const handleChangeOriginalValue2 = (event) => {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setOriginalValue2(value);
        }
    };

    const handleChangePercentage2 = (event) => {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setPercentage2(value);
        }
    };

    const calculatePercentage2 = () => {
        if (originalValue2.trim() !== '' && percentage2.trim() !== '') {
            const resultValue = (parseFloat(originalValue2) / parseFloat(percentage2)) * 100;
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
                    <h3 className='card-title mb-4'>Original value to percentage value</h3>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Original Value</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={originalValue1}
                            onChange={handleChangeOriginalValue1} inputMode='numeric'/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Percentage (%)</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={percentage1}
                            onChange={handleChangePercentage1} inputMode='numeric'/>
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-sm btn-success' onClick={calculatePercentage1}>Calculate</button>
                        <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs1}>Reset</button>
                    </div>
                    <div >
                        <div>
                            original value =
                            <span className='text-success'>
                                &nbsp; {originalValue1}
                            </span>
                        </div>
                        <div>
                            Percentage =
                            <span className='text-success'>
                                &nbsp; {percentage1}
                            </span>
                        </div>
                        <div>
                            <strong>
                                Result =
                                <span className='text-success'>
                                    &nbsp; {result1}
                                </span>
                            </strong>
                        </div>
                    </div>
                    <hr />
                    <h3 className='card-title mb-4'>Percentage value to percentage</h3>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Original Value</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={originalValue2}
                            onChange={handleChangeOriginalValue2} inputMode='numeric'/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Percentage Value</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={percentage2}
                            onChange={handleChangePercentage2} inputMode='numeric'/>
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-sm btn-success' onClick={calculatePercentage2}>Calculate</button>
                        <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs2}>Reset</button>
                    </div>
                    <div>
                        <div>
                            Original Value =
                            <span className='text-success'>
                                &nbsp; {originalValue2}
                            </span>
                        </div>
                        <div>
                            Percentage Value =
                            <span className='text-success'>
                                &nbsp; {percentage2}
                            </span>
                        </div>
                        <div>
                            <strong>
                                Result =
                                <span className='text-success'>
                                    &nbsp; {result2}%
                                </span>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PercentageCalculator;
