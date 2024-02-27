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
import FrequencyConverter from './FrequencyConverter/FrequencyConverter'
import ElectricChargeConverter from './ElectricChargeConverter/ElectricChargeConverter'
import ElectricCurrentConverter from './ElectricCurrentConverter/ElectricCurrentConverter'
import ElectricPotentialConverter from './ElectricPotentialConverter/ElectricPotentialConverter'
import ElectricResistanceConverter from './ElectricResistanceConverter/ElectricResistanceConverter'
import ElectricConductanceConverter from './ElectricConductanceConverter/ElectricConductanceConverter'
import ElectricCapacitancecConverter from './ElectricCapacitancecConverter/ElectricCapacitancecConverter'
import ElectricInductanceConverter from './ElectricInductanceConverter/ElectricInductanceConverter'
import IlluminanceConverter from './IlluminanceConverter/IlluminanceConverter'
import ForceConverter from './ForceConverter/ForceConverter'
import SoundConverter from './SoundConverter/SoundConverter'
import DataStorageConverter from './DataStorageConverter/DataStorageConverter'

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
                        <option value="frequency">Frequency</option>
                        <option value="electricCharge">Electric Charge</option>
                        <option value="electricCurrent">Electric Current</option>
                        <option value="electricPotential">Electric Potential</option>
                        <option value="electricResistance">Electric Resistance</option>
                        <option value="electricConductance">Electric Conductance</option>
                        <option value="electricCapacitance">Electric Capacitancec</option>
                        <option value="electricInductance">Electric Inductance</option>
                        {/* <option value="luminousIntensity">Luminous Intensity</option> */}
                        <option value="illuminance">Illuminance</option>
                        <option value="force">Force</option>
                        <option value="sound">Sound</option>
                        <option value="dataStorage">Data Storage</option>
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
                {conversionType === 'frequency' && <FrequencyConverter />}
                {conversionType === 'electricCharge' && <ElectricChargeConverter />}
                {conversionType === 'electricCurrent' && <ElectricCurrentConverter />}
                {conversionType === 'electricPotential' && <ElectricPotentialConverter />}
                {conversionType === 'electricResistance' && <ElectricResistanceConverter />}
                {conversionType === 'electricConductance' && <ElectricConductanceConverter />}
                {conversionType === 'electricCapacitance' && <ElectricCapacitancecConverter />}
                {conversionType === 'electricInductance' && <ElectricInductanceConverter />}
                {conversionType === 'illuminance' && <IlluminanceConverter />}
                {conversionType === 'force' && <ForceConverter />}
                {conversionType === 'sound' && <SoundConverter />}
                {conversionType === 'dataStorage' && <DataStorageConverter />}
            </div>
        </div>
    );
};


export default UnitConverter;
