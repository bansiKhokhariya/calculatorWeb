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
    // setResult(`Result: ${convertedResult.toFixed(2)} ${toUnit}`);
    setResult(`${convertedResult} ${toUnit}`);
  };

  return (
    <div className="conversion" id="area">
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
        value={fromUnit}
        onChange={(e) => setFromUnit(e.target.value)}
      >
        {Object.keys(conversionFactors).map(unit => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </select>
      <label className='unitConversion-label'>To</label>
      <select
        className='unitConversion-input'
        value={toUnit}
        onChange={(e) => setToUnit(e.target.value)}
      >
        {Object.keys(conversionFactors).map(unit => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </select>
      <div className='percentage-button green-button' onClick={convertArea}>
        Calculate
      </div>
      <div className='result-value'>
        Result : <span className='result-value-span-green'>{result}</span>
      </div>
    </div>
  );
};

export default AreaConverter;

