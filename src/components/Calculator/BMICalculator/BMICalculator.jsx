import React, { useState } from 'react';

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


    const resetInputs = () => {
        setWeightValue('');
        setHeightValue('');
        setBmiMessage('');
        setBmiValue('');
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>
                        BMI Calculator
                    </h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Height (cm)</span>
                        </div>
                        <input type="number" className="form-control" placeholder="Enter Value"
                            value={heightValue}
                            onChange={(e) => setHeightValue(e.target.value)} inputMode='numeric'
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Weight (kg)</span>
                        </div>
                        <input type="number" className="form-control" placeholder="Enter Value"
                            value={weightValue}
                            onChange={(e) => setWeightValue(e.target.value)} inputMode='numeric'
                        />
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-sm btn-success' onClick={calculateBmi}>Calculate</button>
                        <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs}>Reset</button>
                    </div>
                    {bmiValue &&
                        <div >
                            <strong>
                                Your BMI =
                                <span className='text-success'>
                                    &nbsp; {bmiValue}
                                </span>
                            </strong>
                            <br />
                            <strong>
                                Result =
                                <span className='text-success'>
                                    &nbsp; {bmiMessage}
                                </span>
                            </strong>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default BMICalculator;

