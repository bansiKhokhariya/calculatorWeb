import React, { useState } from 'react';

const PercentageCalculator = () => {
    const [originalValue1, setOriginalValue1] = useState('');
    const [percentage1, setPercentage1] = useState('');
    const [result1, setResult1] = useState('');

    const [originalValue2, setOriginalValue2] = useState('');
    const [percentage2, setPercentage2] = useState('');
    const [result2, setResult2] = useState('');

    const addCommas = (amount) => {
        const parts = amount.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join('.');
    };

    const handleChangeOriginalValue1 = (event) => {
        let { value } = event.target;
        // Strip out non-numeric characters
        value = value.replace(/[^0-9.]/g, '');
        setOriginalValue1(addCommas(value));
    };

    const handleChangePercentage1 = (event) => {
        let { value } = event.target;
        // Strip out non-numeric characters
        value = value.replace(/[^0-9.]/g, '');
        setPercentage1(addCommas(value));
    };

    const calculatePercentage1 = () => {
        const originalValue = originalValue1.trim().replace(/,/g, "");

        if (originalValue !== '' && percentage1.trim() !== '') {
            const resultValue = (parseFloat(originalValue) * parseFloat(percentage1)) / 100;
            setResult1(resultValue.toFixed(2));
        }
    };

    const resetInputs1 = () => {
        setOriginalValue1('');
        setPercentage1('');
        setResult1('');
    };

    const handleChangeOriginalValue2 = (event) => {
        let { value } = event.target;
        // Strip out non-numeric characters
        value = value.replace(/[^0-9.]/g, '');
        setOriginalValue2(addCommas(value));
    };

    const handleChangePercentage2 = (event) => {
        let { value } = event.target;
        // Strip out non-numeric characters
        value = value.replace(/[^0-9.]/g, '');
        setPercentage2(addCommas(value));
    };

    const calculatePercentage2 = () => {
        // Parse originalValue2 and percentage2 as numbers
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
                    <h3 className='card-title mb-4'>Original value to percentage value</h3>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Original Value</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={originalValue1}
                            onChange={handleChangeOriginalValue1} inputMode='numeric' />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Percentage (%)</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={percentage1}
                            onChange={handleChangePercentage1} inputMode='numeric' />
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
                            <span className="input-group-text">Percentage value</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={originalValue2}
                            onChange={handleChangeOriginalValue2} inputMode='numeric' />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Percentage</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={percentage2}
                            onChange={handleChangePercentage2} inputMode='numeric' />
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
