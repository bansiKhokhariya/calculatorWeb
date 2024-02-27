import React, { useState } from 'react';

const DataStorageConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('Bit');
    const [toUnit, setToUnit] = useState('Bit');
    const [result, setResult] = useState('');

    const conversionFactors = {
        Bit: 1,
        Byte: 0.125,
        Kilobyte: 1e-6,
        Megabyte: 1e-9,
        Gigabyte: 1e-12,
        Terabyte: 1e-15,
        Petabyte: 1e-18,
    };

    const convertDataStorage = () => {
        const value = parseFloat(inputValue);
        const convertedResult = value * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
        setResult(`${convertedResult} ${toUnit}`);
    };

    return (
        <div className="conversion" id="data-storage">
            <label className='unitConversion-label'>From</label>
            <input
                className='percentage-caculator-input'
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
            />
            <select
                className='unitConversion-input'
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
            >
                {Object.keys(conversionFactors).map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                ))}
            </select>
            <label className='unitConversion-label'>To</label>
            <select
                className='unitConversion-input'
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
            >
                {Object.keys(conversionFactors).map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                ))}
            </select>
            <div className='percentage-button green-button' onClick={convertDataStorage}>
                Calculate
            </div>
            <div className='result-value'>
                Result : <span className='result-value-span-green'>{result}</span>
            </div>
        </div>
    );
};

export default DataStorageConverter;
