import React, { useState } from 'react';

const EnergyConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromEnergy, setFromEnergy] = useState('joule');
    const [toEnergy, setToEnergy] = useState('calorie');
    const [result, setResult] = useState('');

    const conversionFactors = {
        joule: {
            calorie: (energy) => energy * 0.239006,
            kilojoule: (energy) => energy * 0.001,
            kilocalorie: (energy) => energy * 0.000239006,
            electronVolt: (energy) => energy * 6.242e+18,
            britishThermalUnit: (energy) => energy * 0.000947817,
            footPound: (energy) => energy * 0.737562
        },
        calorie: {
            joule: (energy) => energy * 4.184,
            kilojoule: (energy) => energy * 0.004184,
            kilocalorie: (energy) => energy * 0.001,
            electronVolt: (energy) => energy * 2.611e+19,
            britishThermalUnit: (energy) => energy * 0.00396567,
            footPound: (energy) => energy * 3.088025
        },
        kilojoule: {
            joule: (energy) => energy * 1000,
            calorie: (energy) => energy * 239.006,
            kilocalorie: (energy) => energy * 0.239006,
            electronVolt: (energy) => energy * 6.242e+21,
            britishThermalUnit: (energy) => energy * 0.947817,
            footPound: (energy) => energy * 737.562
        },
        kilocalorie: {
            joule: (energy) => energy * 4184,
            calorie: (energy) => energy * 1000,
            kilojoule: (energy) => energy * 4.184,
            electronVolt: (energy) => energy * 2.611e+22,
            britishThermalUnit: (energy) => energy * 3.96567,
            footPound: (energy) => energy * 3088.025
        },
        electronVolt: {
            joule: (energy) => energy * 1.602e-19,
            calorie: (energy) => energy * 3.8293e-20,
            kilojoule: (energy) => energy * 1.602e-22,
            kilocalorie: (energy) => energy * 3.8293e-23,
            britishThermalUnit: (energy) => energy * 3.8293e-23,
            footPound: (energy) => energy * 2.373e-19
        },
        britishThermalUnit: {
            joule: (energy) => energy * 1055.06,
            calorie: (energy) => energy * 252.164,
            kilojoule: (energy) => energy * 1.05506,
            kilocalorie: (energy) => energy * 0.252164,
            electronVolt: (energy) => energy * 2.613e+22,
            footPound: (energy) => energy * 778.169
        },
        footPound: {
            joule: (energy) => energy * 1.35582,
            calorie: (energy) => energy * 0.323831,
            kilojoule: (energy) => energy * 0.00135582,
            kilocalorie: (energy) => energy * 0.000323831,
            electronVolt: (energy) => energy * 4.214e+18,
            britishThermalUnit: (energy) => energy * 0.00128507
        }
    };

    const convertEnergy = () => {
        const value = parseFloat(inputValue);
        if (fromEnergy === toEnergy) {
            setResult(`${value.toFixed(2)} ${toEnergy}`);
        } else {
            const convertedResult = conversionFactors[fromEnergy][toEnergy](value);
            setResult(`${convertedResult} ${toEnergy}`);
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
                value={fromEnergy}
                onChange={(e) => setFromEnergy(e.target.value)}
            >
                <option value="joule">Joule</option>
                <option value="calorie">Calorie</option>
                <option value="kilojoule">Kilojoule</option>
                <option value="kilocalorie">Kilocalorie</option>
                <option value="electronVolt">Electron Volt</option>
                <option value="britishThermalUnit">British Thermal Unit</option>
                <option value="footPound">Foot-pound</option>
            </select>
            <label className='card-text text-center mt-2 mb-2 ms-1'>To</label>
            <select className="form-select form-select-sm" id="conversionType"
                value={toEnergy}
                onChange={(e) => setToEnergy(e.target.value)}
            >
                <option value="joule">Joule</option>
                <option value="calorie">Calorie</option>
                <option value="kilojoule">Kilojoule</option>
                <option value="kilocalorie">Kilocalorie</option>
                <option value="electronVolt">Electron Volt</option>
                <option value="britishThermalUnit">British Thermal Unit</option>
                <option value="footPound">Foot-pound</option>
            </select>
            <div className='mt-3 mb-2'>
                <button className='btn btn-sm btn-success' onClick={convertEnergy}>Convert</button>
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

export default EnergyConverter;
