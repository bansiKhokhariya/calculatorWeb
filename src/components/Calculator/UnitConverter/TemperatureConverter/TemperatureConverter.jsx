import React, { useState } from 'react';

const TemperatureConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromTemperature, setFromTemperature] = useState('celsius');
    const [toTemperature, setToTemperature] = useState('fahrenheit');
    const [result, setResult] = useState('');

    const convertTemperature = () => {
        let convertedResult;

        if (fromTemperature === "celsius" && toTemperature === "fahrenheit") {
            convertedResult = (parseFloat(inputValue) * 9 / 5) + 32;
        } else if (fromTemperature === "celsius" && toTemperature === "kelvin") {
            convertedResult = parseFloat(inputValue) + 273.15;
        } else if (fromTemperature === "fahrenheit" && toTemperature === "celsius") {
            convertedResult = (parseFloat(inputValue) - 32) * 5 / 9;
        } else if (fromTemperature === "fahrenheit" && toTemperature === "kelvin") {
            convertedResult = (parseFloat(inputValue) - 32) * 5 / 9 + 273.15;
        } else if (fromTemperature === "kelvin" && toTemperature === "celsius") {
            convertedResult = parseFloat(inputValue) - 273.15;
        } else if (fromTemperature === "kelvin" && toTemperature === "fahrenheit") {
            convertedResult = (parseFloat(inputValue) - 273.15) * 9 / 5 + 32;
        } else {
            convertedResult = parseFloat(inputValue);
        }

        setResult(convertedResult.toFixed(2));
    };

    return (
        <div className="conversion" id="temperature">
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
                value={fromTemperature}
                onChange={(e) => setFromTemperature(e.target.value)}
            >
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
            </select>
            <label className='unitConversion-label'>To</label>
            <select
                className='unitConversion-input'
                value={toTemperature}
                onChange={(e) => setToTemperature(e.target.value)}
            >
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
            </select>
            <div className='percentage-button green-button' onClick={convertTemperature}>
                Calculate
            </div>
            <div className='result-value'>
                Result: <span className='result-value-span-green'>{result}</span>
            </div>
        </div>
    );
};

export default TemperatureConverter;