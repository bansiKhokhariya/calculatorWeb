import React, { useState } from 'react';

const PowerConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromPower, setFromPower] = useState('watt');
    const [toPower, setToPower] = useState('horsepower');
    const [result, setResult] = useState('');

    const conversionFactors = {
        watt: {
            horsepower: (power) => power * 0.00134102,
            kilowatt: (power) => power * 0.001,
            megawatt: (power) => power * 1e-6,
            btuPerMinute: (power) => power * 3.412142,
            footPoundPerMinute: (power) => power * 44.25373
        },
        horsepower: {
            watt: (power) => power * 745.7,
            kilowatt: (power) => power * 0.7457,
            megawatt: (power) => power * 0.0007457,
            btuPerMinute: (power) => power * 2544.433576,
            footPoundPerMinute: (power) => power * 33000
        },
        kilowatt: {
            watt: (power) => power * 1000,
            horsepower: (power) => power * 1.34102,
            megawatt: (power) => power * 0.001,
            btuPerMinute: (power) => power * 3412.142,
            footPoundPerMinute: (power) => power * 44253.73
        },
        megawatt: {
            watt: (power) => power * 1e6,
            horsepower: (power) => power * 1341.02,
            kilowatt: (power) => power * 1000,
            btuPerMinute: (power) => power * 3412142,
            footPoundPerMinute: (power) => power * 44253730
        },
        btuPerMinute: {
            watt: (power) => power * 0.293071,
            horsepower: (power) => power * 0.000372506,
            kilowatt: (power) => power * 0.000293071,
            megawatt: (power) => power * 2.93071e-7,
            footPoundPerMinute: (power) => power * 12.0000052
        },
        footPoundPerMinute: {
            watt: (power) => power * 0.022597,
            horsepower: (power) => power * 0.000030867,
            kilowatt: (power) => power * 0.000022597,
            megawatt: (power) => power * 2.2597e-8,
            btuPerMinute: (power) => power * 0.0833333
        }
    };

    const convertPower = () => {
        const value = parseFloat(inputValue);
        const convertedResult = conversionFactors[fromPower][toPower](value);
        setResult(`${convertedResult.toFixed(2)} ${toPower}`);
    };

    return (
        <div className="conversion" id="power">
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
                value={fromPower}
                onChange={(e) => setFromPower(e.target.value)}
            >
                <option value="watt">Watt</option>
                <option value="horsepower">Horsepower</option>
                <option value="kilowatt">Kilowatt</option>
                <option value="megawatt">Megawatt</option>
                <option value="btuPerMinute">BTU/Minute</option>
                <option value="footPoundPerMinute">Foot-pound/Minute</option>
            </select>
            <label className='unitConversion-label'>To</label>
            <select
                className='unitConversion-input'
                value={toPower}
                onChange={(e) => setToPower(e.target.value)}
            >
                <option value="watt">Watt</option>
                <option value="horsepower">Horsepower</option>
                <option value="kilowatt">Kilowatt</option>
                <option value="megawatt">Megawatt</option>
                <option value="btuPerMinute">BTU/Minute</option>
                <option value="footPoundPerMinute">Foot-pound/Minute</option>
            </select>
            <div className='percentage-button green-button' onClick={convertPower}>
                Calculate
            </div>
            <div className='result-value'>
                Result: <span className='result-value-span-green'>{result}</span>
            </div>
        </div>
    );
};

export default PowerConverter;
