import React, { useState } from 'react'

const BMICalculator = () => {

    const [heightValue, setHeightValue] = useState('');
    const [weightValue, setWeightValue] = useState('');
    const [bmiValue, setBmiValue] = useState('');
    const [bmiMessage, setBmiMessage] = useState('');

    const calculateBmi = () => {
        if (heightValue && weightValue) {
            const heightInMeters = heightValue / 100;
            const bmi = (weightValue / (heightInMeters * heightInMeters)).toFixed(2);
            setBmiValue(bmi);

            let message = '';
            if (bmi < 18.5) {
                message = 'You are Underweight';
            } else if (bmi >= 18.5 && bmi < 25) {
                message = 'You are Normal weight';
            } else if (bmi >= 25 && bmi < 30) {
                message = 'You are Overweight';
            } else {
                message = 'You are Obese';
            }
            setBmiMessage(message);
        } else {
            setBmiValue('');
            setBmiMessage('');
        }
    };

    return (
        <div className='percentage-caculator-section-main'>
            <div className="percentage-caculator-section">
                <h2 className='percentage-caculator-title'>BMI Calculator</h2>
                <div className='percentage-caculator-main-box' >
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="height">Height (cm):</label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input
                                className='percentage-caculator-input'
                                type="text"
                                name=""
                                id="height"
                                value={heightValue}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\D/g, ''); // Remove any non-numeric characters
                                    setHeightValue(input);
                                }}
                            />
                            &nbsp;
                            &nbsp;
                        </div>
                    </div>
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="weight">Weight (kg):</label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input
                                className='percentage-caculator-input'
                                type="text"
                                name=""
                                id="weight"
                                value={weightValue}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\D/g, '');
                                    setWeightValue(input);
                                }}
                            />
                            &nbsp;
                            &nbsp;
                        </div>
                    </div>
                    <div className='percentage-button-section'>
                        <div className='percentage-button green-button' onClick={calculateBmi}>
                            Calculate
                        </div>
                    </div>
                    <div className='percentage-result-section'>
                        <div className='result-value'>
                            Your BMI :  <span className='result-value-span-green'>{bmiValue}</span>
                        </div>
                        <div className='result-value'>
                            Result :  <span className='result-value-span-green'>{bmiMessage}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BMICalculator