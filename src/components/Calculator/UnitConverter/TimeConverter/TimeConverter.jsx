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
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
            >
                {Object.keys(conversionFactors).map(time => (
                    <option key={time} value={time}>{time}</option>
                ))}
            </select>
            <label className='card-text text-center mt-2 mb-2 ms-1'>To</label>
            <select className="form-select form-select-sm" id="conversionType"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
            >
                {Object.keys(conversionFactors).map(time => (
                    <option key={time} value={time}>{time}</option>
                ))}
            </select>
            <div className='mt-3 mb-2'>
                <button className='btn btn-sm btn-success' onClick={convertTime}>Convert</button>
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
    )
}

export default TimeConverter