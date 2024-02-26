import React, { useState } from 'react';
import './UnitConverter.css';
import AreaConverter from './AreaConverter/AreaConverter'
import TemperatureConverter from './TemperatureConverter/TemperatureConverter'
import WeightConverter from './WeightConverter/WeightConverter'
import LengthConverter from './LengthConverter/LengthConverter'
import TimeConverter from './TimeConverter/TimeConverter'
import AngleConverter from './AngleConverter/AngleConverter'
import PowerConverter from './PowerConverter/PowerConverter'
import EnergyConverter from './EnergyConverter/EnergyConverter'
import PressureConverter from './PressureConverter/PressureConverter'
import VelocityConverter from './VelocityConverter/VelocityConverter'
import VolumeConverter from './VolumeConverter/VolumeConverter'

const UnitConverter = () => {
    const [conversionType, setConversionType] = useState('length');

    const handleConversionChange = (e) => {
        setConversionType(e.target.value);
    };

    return (
        <div className='percentage-caculator-section-main'>
            <div className="percentage-caculator-section">
                <h2 className='percentage-caculator-title'>Unit Converter</h2>
                <div className='unitConversion-input-box'>
                    <label className='unitConversion-label' htmlFor="conversionType">Select Conversion Type:</label>
                    <select className='unitConversion-input' id="conversionType" value={conversionType} onChange={handleConversionChange}>
                        <option value="angle">Angle</option>
                        <option value="area">Area</option>
                        <option value="energy">Energy</option>
                        <option value="length">Length</option>
                        <option value="power">Power</option>
                        <option value="pressure">Pressure</option>
                        <option value="temperature">Temperature</option>
                        <option value="time">Time</option>
                        <option value="velocity">Velocity</option>
                        <option value="volume">Volume</option>
                        <option value="weightMass">Weight/Mass</option>
                    </select>
                </div>


                {/* Render different converters based on the selected conversion type */}
                {conversionType === 'angle' && <AngleConverter />}
                {conversionType === 'area' && <AreaConverter />}
                {conversionType === 'energy' && <EnergyConverter />}
                {conversionType === 'temperature' && <TemperatureConverter />}
                {conversionType === 'weightMass' && <WeightConverter />}
                {conversionType === 'length' && <LengthConverter />}
                {conversionType === 'time' && <TimeConverter />}
                {conversionType === 'power' && <PowerConverter />}
                {conversionType === 'pressure' && <PressureConverter />}
                {conversionType === 'velocity' && <VelocityConverter />}
                {conversionType === 'volume' && <VolumeConverter />}
            </div>
        </div>
    );
};


export default UnitConverter;
