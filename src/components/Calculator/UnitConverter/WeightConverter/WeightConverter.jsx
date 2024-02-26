import React, { useState } from 'react'

const WeightConverter = () => {

    const [inputValue, setInputValue] = useState('');
    const [fromWeight, setFromWeight] = useState('gram');
    const [toWeight, setToWeight] = useState('gram');
    const [result, setResult] = useState('');

    const conversionFactors = {
        gram: 1,
        kilogram: 0.001,
        milligram: 1000,
        metricTon: 0.000001,
        longTon: 0.000984207,
        shortTon: 0.00110231,
        pound: 0.00220462,
        ounce: 0.03527396,
        carat: 5,
        centigram: 100,
        decigram: 10,
        dekagram: 0.1,
        hectogram: 0.01,
        stone: 0.000157473,
        tonne: 1e-6,
        troyOunce: 0.0321507,
    };

    const convertWeight = () => {
        const value = parseFloat(inputValue);
        const convertedResult = value * (conversionFactors[toWeight] / conversionFactors[fromWeight]);
        setResult(`${convertedResult.toFixed(2)} ${toWeight}`);
    };


    return (
        <div className="conversion" id="area">
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
                value={fromWeight}
                onChange={(e) => setFromWeight(e.target.value)}
            >
                {Object.keys(conversionFactors).map(weight => (
                    <option key={weight} value={weight}>{weight}</option>
                ))}
            </select>
            <label className='unitConversion-label'>To</label>
            <select
                className='unitConversion-input'
                value={toWeight}
                onChange={(e) => setToWeight(e.target.value)}
            >
                {Object.keys(conversionFactors).map(weight => (
                    <option key={weight} value={weight}>{weight}</option>
                ))}
            </select>
            <div className='percentage-button green-button' onClick={convertWeight}>
                Calculate
            </div>
            <div className='result-value'>
                Result : <span className='result-value-span-green'>{result}</span>
            </div>
        </div>
    )
}

export default WeightConverter