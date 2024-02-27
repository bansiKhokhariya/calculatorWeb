import React, { useState } from 'react';

const ElectricResistanceConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('Ohm');
    const [toUnit, setToUnit] = useState('Ohm');
    const [result, setResult] = useState('');

    const conversionFactors = {
        Ohm: 1,
        Kilohm: 0.001,
        Megohm: 1e-6,
    };

    const convertResistance = () => {
        const value = parseFloat(inputValue);
        const convertedResult = value * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
        setResult(`${convertedResult} ${toUnit}`);
    };

    return (
        <div className="conversion" id="electric-resistance">
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
            <div className='percentage-button green-button' onClick={convertResistance}>
                Calculate
            </div>
            <div className='result-value'>
                Result : <span className='result-value-span-green'>{result}</span>
            </div>
        </div>
    );
};

export default ElectricResistanceConverter;
