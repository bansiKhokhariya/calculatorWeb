import React, { useState } from 'react';

const SoundConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('Decibel');
    const [toUnit, setToUnit] = useState('Decibel');
    const [result, setResult] = useState('');

    const conversionFactors = {
        Decibel: 1,
        Bel: 0.1,
    };

    const convertSound = () => {
        const value = parseFloat(inputValue);
        const convertedResult = value * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
        setResult(`${convertedResult} ${toUnit}`);
    };

    return (
        <div className='mt-4'>
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">@</span>
            </div>
            <input type="number" className="form-control" placeholder="Enter Value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
        <label className='card-text text-center mt-2 mb-2 ms-1'>From</label>
        <select className="form-select form-select-sm" id="conversionType"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
        >
            {Object.keys(conversionFactors).map(unit => (
                <option key={unit} value={unit}>{unit}</option>
            ))}
        </select>
        <label className='card-text text-center mt-2 mb-2 ms-1'>To</label>
        <select className="form-select form-select-sm" id="conversionType"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
        >
            {Object.keys(conversionFactors).map(unit => (
                <option key={unit} value={unit}>{unit}</option>
            ))}
        </select>
        <div className='mt-3 mb-2'>
            <button className='btn btn-sm btn-success' onClick={convertSound}>Convert</button>
        </div>
        <div >
            <div>
                <strong>
                    Result =
                    <span className='text-success'>
                        &nbsp; {result}
                    </span>
                </strong>
            </div>
        </div>
    </div>
    );
};

export default SoundConverter;
