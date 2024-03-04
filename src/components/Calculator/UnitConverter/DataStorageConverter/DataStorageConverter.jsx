import React, { useState } from 'react';

const DataStorageConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('Bit');
    const [toUnit, setToUnit] = useState('Bit');
    const [result, setResult] = useState('');

    // const conversionFactors = {
    //     Bit: 1,
    //     Byte: 0.125,
    //     Kilobyte: 1e-6,
    //     Megabyte: 1e-9,
    //     Gigabyte: 1e-12,
    //     Terabyte: 1e-15,
    //     Petabyte: 1e-18,
    // };

    const conversionFactors = {
        Bit: 1,
        Byte: 8,
        Kilobyte: 8 * 1024,
        Megabyte: 8 * 1024 * 1024,
        Gigabyte: 8 * 1024 * 1024 * 1024,
        Terabyte: 8 * 1024 * 1024 * 1024 * 1024,
        Petabyte: 8 * 1024 * 1024 * 1024 * 1024 * 1024,
        Exabyte: 8 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
    };

    const convertDataStorage = () => {
        const value = parseFloat(inputValue);
        let convertedResult;

        if (fromUnit === toUnit) {
            convertedResult = value;
        } else if (fromUnit === 'Bit') {
            convertedResult = value / conversionFactors[toUnit];
        } else if (toUnit === 'Bit') {
            convertedResult = value * conversionFactors[fromUnit];
        } else {
            convertedResult = (value * conversionFactors[fromUnit]) / conversionFactors[toUnit];
        }

        setResult(`${convertedResult} ${toUnit}`);
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
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
            >
                {Object.keys(conversionFactors).map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                ))}
            </select>
            <label className='card-text text-center mt-2 mb-2 ms-1'>To</label>
            <select className="form-select form-select-sm" id="conversionType"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
            >
                {Object.keys(conversionFactors).map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                ))}
            </select>
            <div className='mt-3 mb-2'>
                <button className='btn btn-sm btn-success' onClick={convertDataStorage}>Convert</button>
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

export default DataStorageConverter;
