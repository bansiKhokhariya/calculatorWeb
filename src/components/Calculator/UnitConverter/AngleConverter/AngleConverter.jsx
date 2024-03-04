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
            <select className="form-select form-select-sm" id="conversionType" value={fromAngle}
                onChange={(e) => setFromAngle(e.target.value)}>
                <option value="degree">Degree</option>
                <option value="radian">Radian</option>
                <option value="grad">Gradian</option>
                <option value="revolution">Revolution</option>
            </select>
            <label className='card-text text-center mt-2 mb-2 ms-1'>To</label>
            <select className="form-select form-select-sm" id="conversionType" value={toAngle}
                onChange={(e) => setToAngle(e.target.value)}>
                <option value="degree">Degree</option>
                <option value="radian">Radian</option>
                <option value="grad">Gradian</option>
                <option value="revolution">Revolution</option>
            </select>
            <div className='mt-3 mb-2'>
                <button className='btn btn-sm btn-success' onClick={convertAngle}>Convert</button>
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

export default AngleConverter;
