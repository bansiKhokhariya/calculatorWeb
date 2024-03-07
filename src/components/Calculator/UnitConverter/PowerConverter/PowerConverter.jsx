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
        if (fromPower === toPower) {
            setResult(`${value.toFixed(2)} ${toPower}`);
        } else {
            const convertedResult = conversionFactors[fromPower][toPower](value);
            setResult(`${convertedResult.toFixed(2)} ${toPower}`);
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
            <label className='card-text text-center mt-2 mb-2 ms-1'>To</label>
            <select className="form-select form-select-sm" id="conversionType"
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
            <div className='mt-3 mb-2'>
                <button className='btn btn-sm btn-success' onClick={convertPower}>Convert</button>
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

export default PowerConverter;
