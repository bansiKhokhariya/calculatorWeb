import React, { useState } from 'react';
import './PercentageCalculator.css';

const PercentageCalculator = () => {
    const [originalValue1, setOriginalValue1] = useState('');
    const [percentage1, setPercentage1] = useState('');
    const [result1, setResult1] = useState('');

    const [originalValue2, setOriginalValue2] = useState('');
    const [percentage2, setPercentage2] = useState('');
    const [result2, setResult2] = useState('');

    const handleChangeOriginalValue1 = (event) => {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setOriginalValue1(value);
        }
    };

    const handleChangePercentage1 = (event) => {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setPercentage1(value);
        }
    };

    const calculatePercentage1 = () => {
        if (originalValue1.trim() !== '' && percentage1.trim() !== '') {
            const resultValue = (parseFloat(originalValue1) * parseFloat(percentage1)) / 100;
            setResult1(resultValue.toFixed(2));
        }
    };

    const resetInputs1 = () => {
        setOriginalValue1('');
        setPercentage1('');
        setResult1('');
    };

    const handleChangeOriginalValue2 = (event) => {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setOriginalValue2(value);
        }
    };

    const handleChangePercentage2 = (event) => {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setPercentage2(value);
        }
    };

    const calculatePercentage2 = () => {
        if (originalValue2.trim() !== '' && percentage2.trim() !== '') {
            const resultValue = (parseFloat(originalValue2) / parseFloat(percentage2)) * 100;
            setResult2(resultValue.toFixed(2));
        }
    };

    const resetInputs2 = () => {
        setOriginalValue2('');
        setPercentage2('');
        setResult2('');
    };

    return (
        <div className='basic-caculator-section'>
            <div className='percentage-caculator-main-section'>
                <div className="percentage-caculator-section" style={{ textAlign: 'center' }}>
                    <h2 className='percentage-caculator-title'>Percentage Calculator</h2>
                    <div className='percentage-caculator-main-box' >
                        <h4 className='percentage-caculator-innerTitle'>Original value to percentage value</h4>
                        <div className='percentage-input-box'>
                            <label className='percentage-caculator-lable' htmlFor="originalValue1">Original Value : </label>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                <input
                                    className='percentage-caculator-input'
                                    type="text"
                                    name=""
                                    id="originalValue1"
                                    value={originalValue1}
                                    onChange={handleChangeOriginalValue1}
                                />
                                &nbsp;
                                &nbsp;
                            </div>
                        </div>
                        <div className='percentage-input-box'>
                            <label className='percentage-caculator-lable' htmlFor="percentage1">Percentage : </label>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                <input
                                    className='percentage-caculator-input'
                                    type="text"
                                    name=""
                                    id="percentage1"
                                    value={percentage1}
                                    onChange={handleChangePercentage1}
                                />
                                <div style={{ fontWeight: '600' }}>
                                    %
                                </div>
                            </div>
                        </div>
                        <div className='percentage-button-section'>
                            <div className='percentage-button green-button' onClick={calculatePercentage1}>
                                Calculate
                            </div>
                            <div className='percentage-button blue-button' onClick={resetInputs1}>
                                Reset
                            </div>
                        </div>
                        <div className='percentage-result-section'>
                            <div className='result-value'>
                                original value : <span className='result-value-span'>{originalValue1}</span>
                            </div>
                            <div className='result-value'>
                                Percentage :  <span className='result-value-span'>{percentage1}</span>
                            </div>
                            <div className='result-value'>
                                Result :  <span className='result-value-span-green'>{result1}</span>
                            </div>
                        </div>
                    </div>
                    <div className='percentage-caculator-main-box' >
                        <h4 className='percentage-caculator-innerTitle'>Percentage value to percentage</h4>
                        <div className='percentage-input-box'>
                            <label className='percentage-caculator-lable' htmlFor="originalValue2">Original Value : </label>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                <input
                                    className='percentage-caculator-input'
                                    type="text"
                                    name=""
                                    id="originalValue2"
                                    value={originalValue2}
                                    onChange={handleChangeOriginalValue2}
                                />
                                &nbsp;
                                &nbsp;
                            </div>
                        </div>
                        <div className='percentage-input-box'>
                            <label className='percentage-caculator-lable' htmlFor="percentage2">Percentage Value : </label>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                <input
                                    className='percentage-caculator-input'
                                    type="text"
                                    name=""
                                    id="percentage2"
                                    value={percentage2}
                                    onChange={handleChangePercentage2}
                                />
                                &nbsp;
                                &nbsp;
                            </div>
                        </div>
                        <div className='percentage-button-section'>
                            <div className='percentage-button green-button' onClick={calculatePercentage2}>
                                Calculate
                            </div>
                            <div className='percentage-button blue-button' onClick={resetInputs2}>
                                Reset
                            </div>
                        </div>
                        <div className='percentage-result-section'>
                            <div className='result-value'>
                                original value : <span className='result-value-span'>{originalValue2}</span>
                            </div>
                            <div className='result-value'>
                                Percentage :  <span className='result-value-span'>{percentage2}</span>
                            </div>
                            <div className='result-value'>
                                Result :  <span className='result-value-span-green'>{result2}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PercentageCalculator;
