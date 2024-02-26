import React, { useState } from 'react';

const AngleConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromAngle, setFromAngle] = useState('degree');
    const [toAngle, setToAngle] = useState('degree');
    const [result, setResult] = useState('');

    const conversionFactors = {
        degree: {
            radian: (angle) => angle * (Math.PI / 180),
            grad: (angle) => angle * (10 / 9),
            revolution: (angle) => angle / 360
        },
        radian: {
            degree: (angle) => angle * (180 / Math.PI),
            grad: (angle) => angle * (200 / Math.PI),
            revolution: (angle) => angle / (2 * Math.PI)
        },
        grad: {
            degree: (angle) => angle * (9 / 10),
            radian: (angle) => angle * (Math.PI / 200),
            revolution: (angle) => angle / 400
        },
        revolution: {
            degree: (angle) => angle * 360,
            radian: (angle) => angle * (2 * Math.PI),
            grad: (angle) => angle * 400
        }
    };

    const convertAngle = () => {
        const value = parseFloat(inputValue);
        const convertedResult = conversionFactors[fromAngle][toAngle](value);
        setResult(`${convertedResult.toFixed(2)} ${toAngle}`);
    };

    return (
        <div className="conversion" id="angle">
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
                value={fromAngle}
                onChange={(e) => setFromAngle(e.target.value)}
            >
                <option value="degree">Degree</option>
                <option value="radian">Radian</option>
                <option value="grad">Gradian</option>
                <option value="revolution">Revolution</option>
            </select>
            <label className='unitConversion-label'>To</label>
            <select
                className='unitConversion-input'
                value={toAngle}
                onChange={(e) => setToAngle(e.target.value)}
            >
                <option value="degree">Degree</option>
                <option value="radian">Radian</option>
                <option value="grad">Gradian</option>
                <option value="revolution">Revolution</option>
            </select>
            <div className='percentage-button green-button' onClick={convertAngle}>
                Calculate
            </div>
            <div className='result-value'>
                Result: <span className='result-value-span-green'>{result}</span>
            </div>
        </div>
    );
};

export default AngleConverter;
