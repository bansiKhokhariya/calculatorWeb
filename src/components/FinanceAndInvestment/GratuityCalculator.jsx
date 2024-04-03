import React, { useState } from 'react';

const GratuityCalculator = () => {
    const [salary, setSalary] = useState('');
    const [yearsOfService, setYearsOfService] = useState('');
    const [gratuity, setGratuity] = useState('');
    const minYearsOfService = 5;

    const calculateGratuity = () => {
        const basicSalary = parseFloat(salary.replace(/,/g, ''));
        const years = parseInt(yearsOfService);

        // Validate input values
        if (isNaN(basicSalary) || isNaN(years)) {
            alert('Please enter valid numeric values.');
            return;
        }

        // Check if the minimum years of service condition is met
        if (years < minYearsOfService) {
            alert(`Minimum years of service required is ${minYearsOfService}.`);
            return;
        }

        // Calculate gratuity
        const gratuity = (basicSalary * 15 / 26) * years
        setGratuity(gratuity.toFixed(2))

    };

    const resetFields = () => {
        setSalary('');
        setYearsOfService('');
        setGratuity('');
    };

    return (
        <div className="bootstrap-card-section">
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>Gratuity Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Salary (Basic Pay + D.A)</span>
                        <input type="number" className="form-control" value={salary} onChange={(e) => setSalary(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">No. of Years of Service</span>
                        <input type="number" className="form-control" value={yearsOfService} onChange={(e) => setYearsOfService(e.target.value)} />
                    </div>
                    <div>
                        <button className="btn btn-success btn-sm" onClick={calculateGratuity}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>
                    {gratuity &&
                        <div>
                            <hr />
                            <strong>Total Gratuity Payable To You : <span className='text-success'> {gratuity}</span></strong>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default GratuityCalculator;
