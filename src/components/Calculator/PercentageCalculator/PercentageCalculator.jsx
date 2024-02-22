// import React from 'react'
// import './PercentageCalculator.css'

// const PercentageCalculator = () => {
//     return (
//         <div className='basic-caculator-section'>
//             <div>
//                 <div className="percentage-caculator-section" style={{ textAlign: "center" }}>
//                     <h2 className='percentage-caculator-title'>Percentage Calculator</h2>
//                     <div className='percentage-input-box'>
//                         <label className='percentage-caculator-lable' htmlFor="originalValue">Original Value : </label>
//                         <input className='percentage-caculator-input' type="text" name="" id="originalValue" />
//                         &nbsp;
//                     </div>
//                     <div className='percentage-input-box'>
//                         <label className='percentage-caculator-lable' htmlFor="percentage">Percentage : </label>
//                         <input className='percentage-caculator-input' type="text" name="" id="percentage" />
//                         <div style={{ fontWeight: "600" }}>
//                             %
//                         </div>
//                     </div>
//                     <div className='percentage-button-section'>
//                         <div className='percentage-button green-button'>
//                             Calculate
//                         </div>
//                         <div className='percentage-button blue-button'>
//                             Reset
//                         </div>
//                     </div>
//                     <div className='percentage-result-section'>
//                         <div className='result-value'>
//                             original value : <span className='result-value-span'>1200px</span>
//                         </div>
//                         <div className='result-value'>
//                             Percentage :  <span className='result-value-span'>1200px</span>
//                         </div>
//                         <div className='result-value'>
//                             Result :  <span className='result-value-span-green'>1200px</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default PercentageCalculator


import React, { useState } from 'react';
import './PercentageCalculator.css';

const PercentageCalculator = () => {
    const [originalValue, setOriginalValue] = useState('');
    const [percentage, setPercentage] = useState('');
    const [result, setResult] = useState('');

    const handleChangeOriginalValue = (event) => {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) { // Check if the entered value is a number or a valid float
            setOriginalValue(value);
        }
    };

    const handleChangePercentage = (event) => {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) { // Check if the entered value is a number or a valid float
            setPercentage(value);
        }
    };

    const calculatePercentage = () => {
        if (originalValue.trim() !== '' && percentage.trim() !== '') {
            const resultValue = (parseFloat(originalValue) * parseFloat(percentage)) / 100;
            setResult(resultValue.toFixed(2)); // Round the result to 2 decimal places
        }
    };

    const resetInputs = () => {
        setOriginalValue('');
        setPercentage('');
        setResult('');
    };

    return (
        <div className='basic-caculator-section'>
            <div>
                <div className="percentage-caculator-section" style={{ textAlign: 'center' }}>
                    <h2 className='percentage-caculator-title'>Percentage Calculator</h2>
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="originalValue">Original Value : </label>
                        <input
                            className='percentage-caculator-input'
                            type="text"
                            name=""
                            id="originalValue"
                            value={originalValue}
                            onChange={handleChangeOriginalValue}
                        />
                        &nbsp;
                    </div>
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="percentage">Percentage : </label>
                        <input
                            className='percentage-caculator-input'
                            type="text"
                            name=""
                            id="percentage"
                            value={percentage}
                            onChange={handleChangePercentage}
                        />
                        <div style={{ fontWeight: '600' }}>
                            %
                        </div>
                    </div>
                    <div className='percentage-button-section'>
                        <div className='percentage-button green-button' onClick={calculatePercentage}>
                            Calculate
                        </div>
                        <div className='percentage-button blue-button' onClick={resetInputs}>
                            Reset
                        </div>
                    </div>
                    <div className='percentage-result-section'>
                        <div className='result-value'>
                            original value : <span className='result-value-span'>{originalValue}</span>
                        </div>
                        <div className='result-value'>
                            Percentage :  <span className='result-value-span'>{percentage}</span>
                        </div>
                        <div className='result-value'>
                            Result :  <span className='result-value-span-green'>{result}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PercentageCalculator;
