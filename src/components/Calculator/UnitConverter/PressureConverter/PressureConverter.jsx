import React, { useState } from 'react';

const PressureConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromPressure, setFromPressure] = useState('pascal');
    const [toPressure, setToPressure] = useState('atmosphere');
    const [result, setResult] = useState('');

    const conversionFactors = {
        pascal: {
            atmosphere: (pressure) => pressure * 9.86923e-6,
            bar: (pressure) => pressure * 1e-5,
            psi: (pressure) => pressure * 0.000145038,
            mmHg: (pressure) => pressure * 0.00750062,
            kPa: (pressure) => pressure * 0.001
        },
        atmosphere: {
            pascal: (pressure) => pressure * 101325,
            bar: (pressure) => pressure * 1.01325,
            psi: (pressure) => pressure * 14.6959,
            mmHg: (pressure) => pressure * 760,
            kPa: (pressure) => pressure * 101.325
        },
        bar: {
            pascal: (pressure) => pressure * 100000,
            atmosphere: (pressure) => pressure * 0.986923,
            psi: (pressure) => pressure * 14.5038,
            mmHg: (pressure) => pressure * 750.062,
            kPa: (pressure) => pressure * 100
        },
        psi: {
            pascal: (pressure) => pressure * 6894.76,
            atmosphere: (pressure) => pressure * 0.068046,
            bar: (pressure) => pressure * 0.0689476,
            mmHg: (pressure) => pressure * 51.7149,
            kPa: (pressure) => pressure * 6.89476
        },
        mmHg: {
            pascal: (pressure) => pressure * 133.322,
            atmosphere: (pressure) => pressure * 0.00131579,
            bar: (pressure) => pressure * 0.00133322,
            psi: (pressure) => pressure * 0.0193368,
            kPa: (pressure) => pressure * 0.133322
        },
        kPa: {
            pascal: (pressure) => pressure * 1000,
            atmosphere: (pressure) => pressure * 0.00986923,
            bar: (pressure) => pressure * 0.01,
            psi: (pressure) => pressure * 0.145038,
            mmHg: (pressure) => pressure * 7.50062
        }
    };

    const convertPressure = () => {
        const value = parseFloat(inputValue);
        const convertedResult = conversionFactors[fromPressure][toPressure](value);
        setResult(`${convertedResult.toFixed(2)} ${toPressure}`);
    };

    return (
        <div className="conversion" id="pressure">
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
                value={fromPressure}
                onChange={(e) => setFromPressure(e.target.value)}
            >
                <option value="pascal">Pascal</option>
                <option value="atmosphere">Atmosphere</option>
                <option value="bar">Bar</option>
                <option value="psi">Psi</option>
                <option value="mmHg">mmHg</option>
                <option value="kPa">kPa</option>
            </select>
            <label className='unitConversion-label'>To</label>
            <select
                className='unitConversion-input'
                value={toPressure}
                onChange={(e) => setToPressure(e.target.value)}
            >
                <option value="pascal">Pascal</option>
                <option value="atmosphere">Atmosphere</option>
                <option value="bar">Bar</option>
                <option value="psi">Pound per square inch (PSI)</option>
                <option value="mmHg">Milimeter of mercury</option>
                <option value="kPa">Kilo Pascal</option>
            </select>
            <div className='percentage-button green-button' onClick={convertPressure}>
                Calculate
            </div>
            <div className='result-value'>
                Result: <span className='result-value-span-green'>{result}</span>
            </div>
        </div>
    );
};

export default PressureConverter;
