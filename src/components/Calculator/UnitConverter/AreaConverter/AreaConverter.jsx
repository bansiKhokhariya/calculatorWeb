import React, { useState } from 'react';

const AreaConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('sqMeter');
  const [toUnit, setToUnit] = useState('sqMeter');
  const [result, setResult] = useState('');

  const conversionFactors = {
    sqMeter: 1,
    sqKilometer: 0.000001,
    sqCentimeter: 10000,
    sqMillimeter: 1000000,
    acre: 0.000247105,
    hectare: 0.0001,
    sqMile: 3.861e-7,
    sqYard: 1.19599,
    sqFoot: 10.7639,
    sqInch: 1550.0031
  };

  const convertArea = () => {
    const value = parseFloat(inputValue);
    const convertedResult = value * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
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
        <button className='btn btn-sm btn-success' onClick={convertArea}>Convert</button>
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

export default AreaConverter;

