import React, { useState } from 'react'

const LengthConverter = () => {

  const [inputValue, setInputValue] = useState('');
  const [fromLength, setFromLength] = useState('meter');
  const [toLength, setToLength] = useState('meter');
  const [result, setResult] = useState('');

  const conversionFactors = {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    micrometer: 1000000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701,
    angstrom: 1e10,
    chain: 0.0497097,
    fathom: 0.546807,
    hand: 9.84252,
    link: 4.97097,
    microns: 1e6,
    nanometers: 1e9,
    nauticalMiles: 0.000539957,
    pica: 236.22,
    rods: 0.19884,
    span: 2.95276
  };

  const convertLength = () => {
    const value = parseFloat(inputValue);
    const convertedResult = value * (conversionFactors[toLength] / conversionFactors[fromLength]);
    setResult(`${convertedResult.toFixed(2)} ${toLength}`);
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
        value={fromLength}
        onChange={(e) => setFromLength(e.target.value)}
      >
        {Object.keys(conversionFactors).map(Length => (
          <option key={Length} value={Length}>{Length}</option>
        ))}
      </select>
      <label className='card-text text-center mt-2 mb-2 ms-1'>To</label>
      <select className="form-select form-select-sm" id="conversionType"
        value={toLength}
        onChange={(e) => setToLength(e.target.value)}
      >
        {Object.keys(conversionFactors).map(Length => (
          <option key={Length} value={Length}>{Length}</option>
        ))}
      </select>
      <div className='mt-3 mb-2'>
        <button className='btn btn-sm btn-success' onClick={convertLength}>Convert</button>
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

export default LengthConverter
