// import React, { useState } from 'react';

// const BMICalculator = () => {
//     const [heightValue, setHeightValue] = useState('');
//     const [weightValue, setWeightValue] = useState('');
//     const [bmiValue, setBmiValue] = useState('');
//     const [bmiMessage, setBmiMessage] = useState('');

//     const calculateBmi = () => {
//         const heightWithoutCommas = heightValue.replace(/,/g, '');
//         const weightWithoutCommas = weightValue.replace(/,/g, '');
    
//         if (heightWithoutCommas && weightWithoutCommas) {
//             const heightInMeters = heightWithoutCommas / 100;
//             const bmi = (weightWithoutCommas / (heightInMeters * heightInMeters)).toFixed(2);
//             setBmiValue(bmi);
    
//             let message = '';
//             if (bmi < 18.5) {
//                 message = 'You are Underweight';
//             } else if (bmi >= 18.5 && bmi < 25) {
//                 message = 'You are Normal weight';
//             } else if (bmi >= 25 && bmi < 30) {
//                 message = 'You are Overweight';
//             } else {
//                 message = 'You are Obese';
//             }
//             setBmiMessage(message);
//         } else {
//             setBmiValue('');
//             setBmiMessage('');
//         }
//     };
    

//     const resetInputs = () => {
//         setWeightValue('');
//         setHeightValue('');
//         setBmiMessage('');
//         setBmiValue('');
//     };

//     return (
//         <div className='bootstrap-card-section'>
//             <div className="card bootstrap-card">
//                 <div className="card-header text-center card-text">
//                     <h1>
//                         BMI Calculator
//                     </h1>
//                 </div>
//                 <div className="card-body card-text">
//                     <div className="input-group mb-3">
//                         <div className="input-group-prepend">
//                             <span className="input-group-text">Height (cm)</span>
//                         </div>
//                         <input type="text" className="form-control" placeholder="Enter Value"
//                             value={heightValue}
//                             onChange={(e) => {
//                                 let input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
//                                 input = input.substring(0, 6); // Limit to 6 digits
//                                 const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
//                                 setHeightValue(formattedInput);
//                                 inputMode='numeric'
//                             }}
//                         />
//                     </div>
//                     <div className="input-group mb-3">
//                         <div className="input-group-prepend">
//                             <span className="input-group-text">Weight (kg)</span>
//                         </div>
//                         <input type="text" className="form-control" placeholder="Enter Value"
//                             value={weightValue}
//                             onChange={(e) => {
//                                 let input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
//                                 input = input.substring(0, 6); // Limit to 6 digits
//                                 const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
//                                 setWeightValue(formattedInput);
//                                 inputMode='numeric'
//                             }}
//                         />
//                     </div>
//                     <div className='mb-3'>
//                         <button className='btn btn-sm btn-success' onClick={calculateBmi}>Calculate</button>
//                         <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs}>Reset</button>
//                     </div>
//                     <div >
//                         <div>
//                             <strong>
//                                 Your BMI =
//                                 <span className='text-success'>
//                                     &nbsp; {bmiValue}
//                                 </span>
//                             </strong>
//                         </div>
//                         <div>
//                             <strong>
//                                 Result =
//                                 <span className='text-success'>
//                                     &nbsp; {bmiMessage}
//                                 </span>
//                             </strong>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default BMICalculator;


import React, { useState } from 'react';

const BMICalculator = () => {
    const [heightValue, setHeightValue] = useState('');
    const [weightValue, setWeightValue] = useState('');
    const [bmiValue, setBmiValue] = useState('');
    const [bmiMessage, setBmiMessage] = useState('');

    const calculateBmi = () => {
        const heightWithoutCommas = heightValue.replace(/,/g, '');
        const weightWithoutCommas = weightValue.replace(/,/g, '');
    
        if (heightWithoutCommas && weightWithoutCommas) {
            const heightInMeters = heightWithoutCommas / 100;
            const bmi = (weightWithoutCommas / (heightInMeters * heightInMeters)).toFixed(2);
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
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={heightValue}
                            onChange={(e) => {
                                let input = e.target.value.replace(/[^\d.]/g, ''); // Remove non-numeric characters except '.'
                                input = input.substring(0, 9); // Limit to 9 characters
                                const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
                                setHeightValue(formattedInput);
                            }}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Weight (kg)</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Value"
                            value={weightValue}
                            onChange={(e) => {
                                let input = e.target.value.replace(/[^\d.]/g, ''); // Remove non-numeric characters except '.'
                                input = input.substring(0, 9); // Limit to 9 characters
                                const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
                                setWeightValue(formattedInput);
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-sm btn-success' onClick={calculateBmi}>Calculate</button>
                        <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs}>Reset</button>
                    </div>
                    <div >
                        <div>
                            <strong>
                                Your BMI =
                                <span className='text-success'>
                                    &nbsp; {bmiValue}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Result =
                                <span className='text-success'>
                                    &nbsp; {bmiMessage}
                                </span>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BMICalculator;

