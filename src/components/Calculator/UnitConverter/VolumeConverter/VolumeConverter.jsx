import React, { useState } from 'react';

const VolumeConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [fromVolume, setFromVolume] = useState('cubicMeter');
    const [toVolume, setToVolume] = useState('cubicCentimeter');
    const [result, setResult] = useState('');

    const conversionFactors = {
        milliliter: {
            cubicMeter: (volume) => volume * 1e6,
            cubicCentimeter: (volume) => volume,
            cubicFeet: (volume) => volume * 28316.8,
            cubicInch: (volume) => volume * 16.3871,
            cubicYard: (volume) => volume * 764554.857984,
            fluidOunceUK: (volume) => volume * 28.4131,
            fluidOunceUS: (volume) => volume * 29.5735,
            gallonUS: (volume) => volume * 3785.41,
            gallonUK: (volume) => volume * 4546.09,
            liter: (volume) => volume * 1000,
            pintUS: (volume) => volume * 473.176,
            pintUK: (volume) => volume * 568.261,
            quartUS: (volume) => volume * 946.353,
            quartUK: (volume) => volume * 1136.52,
            cupUS: (volume) => volume * 236.588,
            tablespoonUS: (volume) => volume * 14.7868,
            teaspoonUS: (volume) => volume * 4.92892,
        },
        cubicCentimeter: {
            cubicMeter: (volume) => volume * 1e-6,
            cubicFeet: (volume) => volume * 3.53147e-5,
            cubicInch: (volume) => volume * 0.0610237,
            cubicYard: (volume) => volume * 1.308e-6,
            fluidOunceUK: (volume) => volume * 0.0351951,
            fluidOunceUS: (volume) => volume * 0.033814,
            gallonUS: (volume) => volume * 0.000264172,
            gallonUK: (volume) => volume * 0.000219969,
            liter: (volume) => volume * 0.001,
            milliliter: (volume) => volume,
            pintUS: (volume) => volume * 0.00211338,
            pintUK: (volume) => volume * 0.00175975,
            quartUS: (volume) => volume * 0.00105669,
            quartUK: (volume) => volume * 0.000879877,
            cupUS: (volume) => volume * 0.00416667,
            tablespoonUS: (volume) => volume * 0.067628,
            teaspoonUS: (volume) => volume * 0.202884,
        },
        cubicFeet: {
            cubicMeter: (volume) => volume * 28.3168,
            cubicCentimeter: (volume) => volume * 28316846.6,
            cubicInch: (volume) => volume * 1728,
            cubicYard: (volume) => volume * 0.037037,
            fluidOunceUK: (volume) => volume * 996.613,
            fluidOunceUS: (volume) => volume * 957.506,
            gallonUS: (volume) => volume * 7.48052,
            gallonUK: (volume) => volume * 6.22884,
            liter: (volume) => volume * 28.3168,
            milliliter: (volume) => volume * 28316.8,
            pintUS: (volume) => volume * 59.8442,
            pintUK: (volume) => volume * 49.8317,
            quartUS: (volume) => volume * 29.9221,
            quartUK: (volume) => volume * 24.9159,
            cupUS: (volume) => volume * 119.688,
            tablespoonUS: (volume) => volume * 1930.48,
            teaspoonUS: (volume) => volume * 5767.48,
        },
        cubicInch: {
            cubicMeter: (volume) => volume * 1.63871e-5,
            cubicCentimeter: (volume) => volume * 16.3871,
            cubicFeet: (volume) => volume * 0.000578704,
            cubicYard: (volume) => volume * 2.14335e-5,
            fluidOunceUK: (volume) => volume * 0.554113,
            fluidOunceUS: (volume) => volume * 0.554113,
            gallonUS: (volume) => volume * 0.004329,
            gallonUK: (volume) => volume * 0.00360465,
            liter: (volume) => volume * 0.0163871,
            milliliter: (volume) => volume * 16.3871,
            pintUS: (volume) => volume * 0.034632,
            pintUK: (volume) => volume * 0.0288413,
            quartUS: (volume) => volume * 0.017316,
            quartUK: (volume) => volume * 0.0144202,
            cupUS: (volume) => volume * 0.0692641,
            tablespoonUS: (volume) => volume * 1.10823,
            teaspoonUS: (volume) => volume * 3.32468,
        },
        cubicMeter: {
            cubicCentimeter: (volume) => volume * 1e6,
            cubicFeet: (volume) => volume * 35.3147,
            cubicInch: (volume) => volume * 61023.7,
            cubicYard: (volume) => volume * 1.30795,
            fluidOunceUK: (volume) => volume * 35195.1,
            fluidOunceUS: (volume) => volume * 33814,
            gallonUS: (volume) => volume * 264.172,
            gallonUK: (volume) => volume * 219.969,
            liter: (volume) => volume * 1000,
            milliliter: (volume) => volume * 1e6,
            pintUS: (volume) => volume * 2113.38,
            pintUK: (volume) => volume * 1759.75,
            quartUS: (volume) => volume * 1056.69,
            quartUK: (volume) => volume * 879.877,
            cupUS: (volume) => volume * 4166.67,
            tablespoonUS: (volume) => volume * 67628,
            teaspoonUS: (volume) => volume * 202884,
        },
        cubicYard: {
            cubicMeter: (volume) => volume * 0.764554857984,
            cubicCentimeter: (volume) => volume * 764554.857984,
            cubicFeet: (volume) => volume * 27,
            cubicInch: (volume) => volume * 46656,
            fluidOunceUK: (volume) => volume * 15898.1,
            fluidOunceUS: (volume) => volume * 15288.1,
            gallonUS: (volume) => volume * 201.974,
            gallonUK: (volume) => volume * 168.178,
            liter: (volume) => volume * 764.555,
            milliliter: (volume) => volume * 764554.857984,
            pintUS: (volume) => volume * 1615.79,
            pintUK: (volume) => volume * 1340.64,
            quartUS: (volume) => volume * 807.896,
            quartUK: (volume) => volume * 670.321,
            cupUS: (volume) => volume * 3231.58,
            tablespoonUS: (volume) => volume * 52200,
            teaspoonUS: (volume) => volume * 156600,
        },
        fluidOunceUK: {
            cubicMeter: (volume) => volume * 0.0000284131,
            cubicCentimeter: (volume) => volume * 28.4131,
            cubicFeet: (volume) => volume * 0.001,
            cubicInch: (volume) => volume * 1.73387,
            cubicYard: (volume) => volume * 0.000105,
            fluidOunceUS: (volume) => volume * 0.961039,
            gallonUS: (volume) => volume * 0.00625,
            gallonUK: (volume) => volume * 0.00520833,
            liter: (volume) => volume * 0.0284131,
            milliliter: (volume) => volume * 28.4131,
            pintUS: (volume) => volume * 0.06,
            pintUK: (volume) => volume * 0.05,
            quartUS: (volume) => volume * 0.03,
            quartUK: (volume) => volume * 0.025,
            cupUS: (volume) => volume * 0.12,
            tablespoonUS: (volume) => volume * 1.92208,
            teaspoonUS: (volume) => volume * 5.76615,
        },
        fluidOunceUS: {
            cubicMeter: (volume) => volume * 2.95735e-5,
            cubicCentimeter: (volume) => volume * 29.5735,
            cubicFeet: (volume) => volume * 0.001,
            cubicInch: (volume) => volume * 1.80469,
            cubicYard: (volume) => volume * 6.94628e-5,
            fluidOunceUK: (volume) => volume * 1.04084,
            gallonUS: (volume) => volume * 0.0078125,
            gallonUK: (volume) => volume * 0.00650526,
            liter: (volume) => volume * 0.0295735,
            milliliter: (volume) => volume * 29.5735,
            pintUS: (volume) => volume * 0.0625,
            pintUK: (volume) => volume * 0.0520421,
            quartUS: (volume) => volume * 0.03125,
            quartUK: (volume) => volume * 0.0260211,
            cupUS: (volume) => volume * 0.125,
            tablespoonUS: (volume) => volume * 2,
            teaspoonUS: (volume) => volume * 6,
        },
        gallonUS: {
            cubicMeter: (volume) => volume * 0.00378541,
            cubicCentimeter: (volume) => volume * 3785.41,
            cubicFeet: (volume) => volume * 0.133681,
            cubicInch: (volume) => volume * 231,
            cubicYard: (volume) => volume * 0.00495113,
            fluidOunceUK: (volume) => volume * 160,
            fluidOunceUS: (volume) => volume * 128,
            gallonUK: (volume) => volume * 0.832674,
            liter: (volume) => volume * 3.78541,
            milliliter: (volume) => volume * 3785.41,
            pintUS: (volume) => volume * 8,
            pintUK: (volume) => volume * 6.66139,
            quartUS: (volume) => volume * 4,
            quartUK: (volume) => volume * 3.3307,
            cupUS: (volume) => volume * 16,
            tablespoonUS: (volume) => volume * 256,
            teaspoonUS: (volume) => volume * 768,
        },
        gallonUK: {
            cubicMeter: (volume) => volume * 0.00454609,
            cubicCentimeter: (volume) => volume * 4546.09,
            cubicFeet: (volume) => volume * 0.160544,
            cubicInch: (volume) => volume * 277.419,
            cubicYard: (volume) => volume * 0.00622884,
            fluidOunceUK: (volume) => volume * 160,
            fluidOunceUS: (volume) => volume * 153.722,
            gallonUS: (volume) => volume * 1.20095,
            liter: (volume) => volume * 4.54609,
            milliliter: (volume) => volume * 4546.09,
            pintUS: (volume) => volume * 9.6076,
            pintUK: (volume) => volume * 8,
            quartUS: (volume) => volume * 4.8038,
            quartUK: (volume) => volume * 4,
            cupUS: (volume) => volume * 19.2152,
            tablespoonUS: (volume) => volume * 307.443,
            teaspoonUS: (volume) => volume * 922.329,
        },
        liter: {
            cubicMeter: (volume) => volume * 0.001,
            cubicCentimeter: (volume) => volume * 1000,
            cubicFeet: (volume) => volume * 0.0353147,
            cubicInch: (volume) => volume * 61.0237,
            cubicYard: (volume) => volume * 0.00130795,
            fluidOunceUK: (volume) => volume * 35.1951,
            fluidOunceUS: (volume) => volume * 33.814,
            gallonUS: (volume) => volume * 0.264172,
            gallonUK: (volume) => volume * 0.219969,
            milliliter: (volume) => volume * 1000,
            pintUS: (volume) => volume * 2.11338,
            pintUK: (volume) => volume * 1.75975,
            quartUS: (volume) => volume * 1.05669,
            quartUK: (volume) => volume * 0.879877,
            cupUS: (volume) => volume * 4.16667,
            tablespoonUS: (volume) => volume * 67.628,
            teaspoonUS: (volume) => volume * 202.884,
        },
        pintUS: {
            cubicMeter: (volume) => volume * 0.000473176,
            cubicCentimeter: (volume) => volume * 473.176,
            cubicFeet: (volume) => volume * 0.0167101,
            cubicInch: (volume) => volume * 28.875,
            cubicYard: (volume) => volume * 0.000621926,
            fluidOunceUK: (volume) => volume * 16,
            fluidOunceUS: (volume) => volume * 16,
            gallonUS: (volume) => volume * 0.125,
            gallonUK: (volume) => volume * 0.104084,
            liter: (volume) => volume * 0.473176,
            milliliter: (volume) => volume * 473.176,
            pintUK: (volume) => volume * 0.832674,
            quartUS: (volume) => volume * 0.5,
            quartUK: (volume) => volume * 0.416337,
            cupUS: (volume) => volume * 2,
            tablespoonUS: (volume) => volume * 32,
            teaspoonUS: (volume) => volume * 96,
        },
        pintUK: {
            cubicMeter: (volume) => volume * 0.000568261,
            cubicCentimeter: (volume) => volume * 568.261,
            cubicFeet: (volume) => volume * 0.0200625,
            cubicInch: (volume) => volume * 34.6774,
            cubicYard: (volume) => volume * 0.000747308,
            fluidOunceUK: (volume) => volume * 20,
            fluidOunceUS: (volume) => volume * 19.2152,
            gallonUS: (volume) => volume * 0.150119,
            gallonUK: (volume) => volume * 0.125,
            liter: (volume) => volume * 0.568261,
            milliliter: (volume) => volume * 568.261,
            pintUS: (volume) => volume * 1.20095,
            quartUS: (volume) => volume * 0.600475,
            quartUK: (volume) => volume * 0.5,
            cupUS: (volume) => volume * 2.40189,
            tablespoonUS: (volume) => volume * 38.4304,
            teaspoonUS: (volume) => volume * 115.291,
        },
        quartUS: {
            cubicMeter: (volume) => volume * 0.000946353,
            cubicCentimeter: (volume) => volume * 946.353,
            cubicFeet: (volume) => volume * 0.0334201,
            cubicInch: (volume) => volume * 57.75,
            cubicYard: (volume) => volume * 0.00124385,
            fluidOunceUK: (volume) => volume * 32,
            fluidOunceUS: (volume) => volume * 32,
            gallonUS: (volume) => volume * 0.25,
            gallonUK: (volume) => volume * 0.208168,
            liter: (volume) => volume * 0.946353,
            milliliter: (volume) => volume * 946.353,
            pintUS: (volume) => volume * 2,
            pintUK: (volume) => volume * 1.66535,
            quartUK: (volume) => volume * 0.832674,
            cupUS: (volume) => volume * 4,
            tablespoonUS: (volume) => volume * 64,
            teaspoonUS: (volume) => volume * 192,
        },
        quartUK: {
            cubicMeter: (volume) => volume * 0.00113652,
            cubicCentimeter: (volume) => volume * 1136.52,
            cubicFeet: (volume) => volume * 0.040125,
            cubicInch: (volume) => volume * 69.3549,
            cubicYard: (volume) => volume * 0.00149462,
            fluidOunceUK: (volume) => volume * 40,
            fluidOunceUS: (volume) => volume * 38.4304,
            gallonUS: (volume) => volume * 0.300238,
            gallonUK: (volume) => volume * 0.25,
            liter: (volume) => volume * 1.13652,
            milliliter: (volume) => volume * 1136.52,
            pintUS: (volume) => volume * 2.40189,
            pintUK: (volume) => volume * 1.20095,
            cupUS: (volume) => volume * 4.80378,
            tablespoonUS: (volume) => volume * 76.8608,
            teaspoonUS: (volume) => volume * 230.582,
        },
        cupUS: {
            cubicMeter: (volume) => volume * 0.000236588,
            cubicCentimeter: (volume) => volume * 236.588,
            cubicFeet: (volume) => volume * 0.00835503,
            cubicInch: (volume) => volume * 14.4375,
            cubicYard: (volume) => volume * 0.00031103,
            fluidOunceUK: (volume) => volume * 8.11537,
            fluidOunceUS: (volume) => volume * 8,
            gallonUS: (volume) => volume * 0.0625,
            gallonUK: (volume) => volume * 0.0520421,
            liter: (volume) => volume * 0.236588,
            milliliter: (volume) => volume * 236.588,
            pintUS: (volume) => volume * 0.5,
            pintUK: (volume) => volume * 0.416337,
            quartUS: (volume) => volume * 0.25,
            quartUK: (volume) => volume * 0.208168,
            tablespoonUS: (volume) => volume * 16,
            teaspoonUS: (volume) => volume * 48,
        },
        tablespoonUS: {
            cubicMeter: (volume) => volume * 1.47868e-5,
            cubicCentimeter: (volume) => volume * 14.7868,
            cubicFeet: (volume) => volume * 0.000522189,
            cubicInch: (volume) => volume * 0.902344,
            cubicYard: (volume) => volume * 1.94905e-5,
            fluidOunceUK: (volume) => volume * 0.521587,
            fluidOunceUS: (volume) => volume * 0.5,
            gallonUS: (volume) => volume * 0.00390625,
            gallonUK: (volume) => volume * 0.00325263,
            liter: (volume) => volume * 0.0147868,
            milliliter: (volume) => volume * 14.7868,
            pintUS: (volume) => volume * 0.03125,
            pintUK: (volume) => volume * 0.0260211,
            quartUS: (volume) => volume * 0.015625,
            quartUK: (volume) => volume * 0.0130105,
            cupUS: (volume) => volume * 0.0625,
            teaspoonUS: (volume) => volume * 3,
        },
        teaspoonUS: {
            cubicMeter: (volume) => volume * 4.92892e-6,
            cubicCentimeter: (volume) => volume * 4.92892,
            cubicFeet: (volume) => volume * 0.000174063,
            cubicInch: (volume) => volume * 0.300781,
            cubicYard: (volume) => volume * 6.49684e-6,
            fluidOunceUK: (volume) => volume * 0.173695,
            fluidOunceUS: (volume) => volume * 0.166667,
            gallonUS: (volume) => volume * 0.00130208,
            gallonUK: (volume) => volume * 0.00108507,
            liter: (volume) => volume * 0.00492892,
            milliliter: (volume) => volume * 4.92892,
            pintUS: (volume) => volume * 0.0104167,
            pintUK: (volume) => volume * 0.00867351,
            quartUS: (volume) => volume * 0.00520833,
            quartUK: (volume) => volume * 0.00433676,
            cupUS: (volume) => volume * 0.0208333,
            tablespoonUS: (volume) => volume * 0.333333,
        },
    };

    const convertVolume = () => {
        const value = parseFloat(inputValue);
        if (fromVolume === toVolume) {
            setResult(`${value.toFixed(2)} ${toVolume}`);
        } else {
            const convertedResult = conversionFactors[fromVolume][toVolume](value);
            setResult(`${convertedResult.toFixed(2)} ${toVolume}`);
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
                value={fromVolume}
                onChange={(e) => setFromVolume(e.target.value)}
            >
                <option value="cubicMeter">Cubic Meter</option>
                <option value="cubicCentimeter">Cubic Centimeter</option>
                <option value="cubicFeet">Cubic Feet</option>
                <option value="cubicInch">Cubic Inch</option>
                <option value="cubicYard">Cubic Yard</option>
                <option value="fluidOunceUK">Fluid Ounce (UK)</option>
                <option value="fluidOunceUS">Fluid Ounce (US)</option>
                <option value="gallonUS">Gallon (US)</option>
                <option value="gallonUK">Gallon (UK)</option>
                <option value="liter">Liter</option>
                <option value="milliliter">Milliliter</option>
                <option value="pintUS">Pint (US)</option>
                <option value="pintUK">Pint (UK)</option>
                <option value="quartUS">Quart (US)</option>
                <option value="quartUK">Quart (UK)</option>
                <option value="cupUS">US Cup</option>
                <option value="tablespoonUS">US Tablespoon</option>
                <option value="teaspoonUS">US Teaspoon</option>
            </select>
            <label className='card-text text-center mt-2 mb-2 ms-1'>To</label>
            <select className="form-select form-select-sm" id="conversionType"
                value={toVolume}
                onChange={(e) => setToVolume(e.target.value)}
            >
                <option value="cubicMeter">Cubic Meter</option>
                <option value="cubicCentimeter">Cubic Centimeter</option>
                <option value="cubicFeet">Cubic Feet</option>
                <option value="cubicInch">Cubic Inch</option>
                <option value="cubicYard">Cubic Yard</option>
                <option value="fluidOunceUK">Fluid Ounce (UK)</option>
                <option value="fluidOunceUS">Fluid Ounce (US)</option>
                <option value="gallonUS">Gallon (US)</option>
                <option value="gallonUK">Gallon (UK)</option>
                <option value="liter">Liter</option>
                <option value="milliliter">Milliliter</option>
                <option value="pintUS">Pint (US)</option>
                <option value="pintUK">Pint (UK)</option>
                <option value="quartUS">Quart (US)</option>
                <option value="quartUK">Quart (UK)</option>
                <option value="cupUS">US Cup</option>
                <option value="tablespoonUS">US Tablespoon</option>
                <option value="teaspoonUS">US Teaspoon</option>
            </select>
            <div className='mt-3 mb-2'>
                <button className='btn btn-sm btn-success' onClick={convertVolume}>Convert</button>
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

export default VolumeConverter;

