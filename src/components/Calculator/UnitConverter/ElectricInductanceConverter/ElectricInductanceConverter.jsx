import React, { useState } from 'react';

const ElectricInductanceConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('Henry');
    const [toUnit, setToUnit] = useState('Henry');
    const [result, setResult] = useState('');

    const conversionFactors = {
        Henry: 1,
        Millihenry: 1000,
        Microhenry: 1e6,
    };

    const convertInductance = () => {
        const value = parseFloat(inputValue);
        const convertedResult = value * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
        setResult(`${convertedResult} ${toUnit}`);
    };

    return (
        <div className="conversion" id="electric-inductance">
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
            <div className='percentage-button green-button' onClick={convertInductance}>
                Calculate
            </div>
            <div className='result-value'>
                Result : <span className='result-value-span-green'>{result}</span>
            </div>
        </div>
    );
};

export default ElectricInductanceConverter;
