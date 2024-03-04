import React, { useState } from 'react'

const WeightConverter = () => {

    const [inputValue, setInputValue] = useState('');
    const [fromWeight, setFromWeight] = useState('gram');
    const [toWeight, setToWeight] = useState('gram');
    const [result, setResult] = useState('');

    const conversionFactors = {
        gram: 1,
        kilogram: 0.001,
        milligram: 1000,
        metricTon: 0.000001,
        longTon: 0.000984207,
        shortTon: 0.00110231,
        pound: 0.00220462,
        ounce: 0.03527396,
        carat: 5,
        centigram: 100,
        decigram: 10,
        dekagram: 0.1,
        hectogram: 0.01,
        stone: 0.000157473,
        tonne: 1e-6,
        troyOunce: 0.0321507,
    };

    const convertWeight = () => {
        const value = parseFloat(inputValue);
        const convertedResult = value * (conversionFactors[toWeight] / conversionFactors[fromWeight]);
        setResult(`${convertedResult.toFixed(2)} ${toWeight}`);
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
                value={fromWeight}
                onChange={(e) => setFromWeight(e.target.value)}
            >
                {Object.keys(conversionFactors).map(weight => (
                    <option key={weight} value={weight}>{weight}</option>
                ))}
            </select>
            <label className='card-text text-center mt-2 mb-2 ms-1'>To</label>
            <select className="form-select form-select-sm" id="conversionType"
                value={toWeight}
                onChange={(e) => setToWeight(e.target.value)}
            >
                {Object.keys(conversionFactors).map(weight => (
                    <option key={weight} value={weight}>{weight}</option>
                ))}
            </select>
            <div className='mt-3 mb-2'>
                <button className='btn btn-sm btn-success' onClick={convertWeight}>Convert</button>
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

export default WeightConverter