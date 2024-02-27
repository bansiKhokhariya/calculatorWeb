import React, { useState } from 'react';

const ElectricCapacitanceConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('Farad');
    const [toUnit, setToUnit] = useState('Farad');
    const [result, setResult] = useState('');

    const conversionFactors = {
        Farad: 1,
        Microfarad: 1e6,
        Picofarad: 1e12,
    };

    const convertCapacitance = () => {
        const value = parseFloat(inputValue);
        const convertedResult = value * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
        setResult(`${convertedResult} ${toUnit}`);
    };

    return (
        <div className="conversion" id="electric-capacitance">
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
            <div className='percentage-button green-button' onClick={convertCapacitance}>
                Calculate
            </div>
            <div className='result-value'>
                Result : <span className='result-value-span-green'>{result}</span>
            </div>
        </div>
    );
};

export default ElectricCapacitanceConverter;
