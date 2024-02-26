import React, { useState } from 'react'

const TimeConverter = () => {


    const [inputValue, setInputValue] = useState('');
    const [fromTime, setFromTime] = useState('second');
    const [toTime, setToTime] = useState('second');
    const [result, setResult] = useState('');

    const conversionFactors = {
        second: 1,
        millisecond: 1000,
        minute: 1 / 60,
        hour: 1 / 3600,
        day: 1 / 86400,
        week: 1 / 604800,
        month: 1 / 2628000,
        year: 1 / 31536000
    };

    const convertTime = () => {
        const value = parseFloat(inputValue);
        const convertedResult = value * (conversionFactors[toTime] / conversionFactors[fromTime]);
        setResult(`${convertedResult.toFixed(2)} ${toTime}`);
    };

    return (
        <div className="conversion" id="time">
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
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
            >
                {Object.keys(conversionFactors).map(time => (
                    <option key={time} value={time}>{time}</option>
                ))}
            </select>
            <label className='unitConversion-label'>To</label>
            <select
                className='unitConversion-input'
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
            >
                {Object.keys(conversionFactors).map(time => (
                    <option key={time} value={time}>{time}</option>
                ))}
            </select>
            <div className='percentage-button green-button' onClick={convertTime}>
                Calculate
            </div>
            <div className='result-value'>
                Result : <span className='result-value-span-green'>{result}</span>
            </div>
        </div>
    )
}

export default TimeConverter