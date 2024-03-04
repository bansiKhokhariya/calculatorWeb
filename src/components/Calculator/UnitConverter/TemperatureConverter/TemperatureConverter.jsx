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
                value={fromTemperature}
                onChange={(e) => setFromTemperature(e.target.value)}
            >
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
            </select>
            <label className='card-text text-center mt-2 mb-2 ms-1'>To</label>
            <select className="form-select form-select-sm" id="conversionType"
                value={toTemperature}
                onChange={(e) => setToTemperature(e.target.value)}
            >
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
            </select>
            <div className='mt-3 mb-2'>
                <button className='btn btn-sm btn-success' onClick={convertTemperature}>Convert</button>
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

export default TemperatureConverter;