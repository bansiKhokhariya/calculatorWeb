import React, { useState } from 'react';

const VelocityConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromVelocity, setFromVelocity] = useState('meterPerSecond');
    const [toVelocity, setToVelocity] = useState('kilometerPerHour');
    const [result, setResult] = useState('');

    const conversionFactors = {
        meterPerSecond: {
            kilometerPerHour: (velocity) => velocity * 3.6,
            milePerHour: (velocity) => velocity * 2.23694,
            knot: (velocity) => velocity * 1.94384,
            centimeterPerSecond: (velocity) => velocity * 100,
            feetPerSecond: (velocity) => velocity * 3.28084,
            machStandard: (velocity) => velocity * 0.0029385833333333,
            machAtmospheric: (velocity) => velocity * 0.002915452,
        },
        kilometerPerHour: {
            meterPerSecond: (velocity) => velocity * 0.277778,
            milePerHour: (velocity) => velocity * 0.621371,
            knot: (velocity) => velocity * 0.539957,
            centimeterPerSecond: (velocity) => velocity * 27.7778,
            feetPerSecond: (velocity) => velocity * 0.911344,
            machStandard: (velocity) => velocity * 0.00080531818181818,
            machAtmospheric: (velocity) => velocity * 0.00079703818181818,
        },
        milePerHour: {
            meterPerSecond: (velocity) => velocity * 0.44704,
            kilometerPerHour: (velocity) => velocity * 1.60934,
            knot: (velocity) => velocity * 0.868976,
            centimeterPerSecond: (velocity) => velocity * 44.704,
            feetPerSecond: (velocity) => velocity * 1.46667,
            machStandard: (velocity) => velocity * 0.0012937363636364,
            machAtmospheric: (velocity) => velocity * 0.0012824536363636,
        },
        knot: {
            meterPerSecond: (velocity) => velocity * 0.514444,
            kilometerPerHour: (velocity) => velocity * 1.852,
            milePerHour: (velocity) => velocity * 1.15078,
            centimeterPerSecond: (velocity) => velocity * 51.4444,
            feetPerSecond: (velocity) => velocity * 1.68781,
            machStandard: (velocity) => velocity * 0.0014886636363636,
            machAtmospheric: (velocity) => velocity * 0.0014768363636364,
        },
        centimeterPerSecond: {
            meterPerSecond: (velocity) => velocity * 0.01,
            kilometerPerHour: (velocity) => velocity * 0.036,
            milePerHour: (velocity) => velocity * 0.0223694,
            knot: (velocity) => velocity * 0.0194384,
            feetPerSecond: (velocity) => velocity * 0.0328084,
            machStandard: (velocity) => velocity * 0.000029385833333333,
            machAtmospheric: (velocity) => velocity * 0.00002915452,
        },
        feetPerSecond: {
            meterPerSecond: (velocity) => velocity * 0.3048,
            kilometerPerHour: (velocity) => velocity * 1.09728,
            milePerHour: (velocity) => velocity * 0.681818,
            knot: (velocity) => velocity * 0.592484,
            centimeterPerSecond: (velocity) => velocity * 30.48,
            machStandard: (velocity) => velocity * 0.00027225113636364,
            machAtmospheric: (velocity) => velocity * 0.00026943753096915,
        },
        machStandard: {
            meterPerSecond: (velocity) => velocity * 340.29,
            kilometerPerHour: (velocity) => velocity * 1225,
            milePerHour: (velocity) => velocity * 761.207,
            knot: (velocity) => velocity * 661.468,
            centimeterPerSecond: (velocity) => velocity * 34029,
            feetPerSecond: (velocity) => velocity * 366.007,
            machAtmospheric: (velocity) => velocity * 0.9874,
        },
        machAtmospheric: {
            meterPerSecond: (velocity) => velocity * 340.29,
            kilometerPerHour: (velocity) => velocity * 1225,
            milePerHour: (velocity) => velocity * 761.207,
            knot: (velocity) => velocity * 661.468,
            centimeterPerSecond: (velocity) => velocity * 34029,
            feetPerSecond: (velocity) => velocity * 366.007,
            machStandard: (velocity) => velocity * 1.01289,
        },
    };

    const convertVelocity = () => {
        const value = parseFloat(inputValue);
        if (fromVelocity === toVelocity) {
            setResult(`${value.toFixed(2)} ${toVelocity}`);
        } else {
            const convertedResult = conversionFactors[fromVelocity][toVelocity](value);
            setResult(`${convertedResult.toFixed(2)} ${toVelocity}`);
        }
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
                value={fromVelocity}
                onChange={(e) => setFromVelocity(e.target.value)}
            >
                <option value="meterPerSecond">Meter/Second</option>
                <option value="kilometerPerHour">Kilometer/Hour</option>
                <option value="milePerHour">Mile/Hour</option>
                <option value="knot">Knot</option>
                <option value="centimeterPerSecond">Centimeter/Second</option>
                <option value="feetPerSecond">Feet/Second</option>
                <option value="machStandard">Mach (Standard)</option>
                <option value="machAtmospheric">Mach (Atmospheric)</option>
            </select>
            <label className='card-text text-center mt-2 mb-2 ms-1'>To</label>
            <select className="form-select form-select-sm" id="conversionType"
                value={toVelocity}
                onChange={(e) => setToVelocity(e.target.value)}
            >
                <option value="meterPerSecond">Meter/Second</option>
                <option value="kilometerPerHour">Kilometer/Hour</option>
                <option value="milePerHour">Mile/Hour</option>
                <option value="knot">Knot</option>
                <option value="centimeterPerSecond">Centimeter/Second</option>
                <option value="feetPerSecond">Feet/Second</option>
                <option value="machStandard">Mach (Standard)</option>
                <option value="machAtmospheric">Mach (Atmospheric)</option>
            </select>
            <div className='mt-3 mb-2'>
                <button className='btn btn-sm btn-success' onClick={convertVelocity}>Convert</button>
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

export default VelocityConverter;
