import React, { useState } from 'react';

const WeekDayCalculator = () => {
    const [enterDate, setEnterDate] = useState(new Date().toISOString().substr(0, 10)); // Default to today's date
    const [result, setResult] = useState({})

    const calculateValues = () => {
        const date = new Date(enterDate);

        // Day Number in Month
        const dayNumberInMonth = date.getDate();

        // Total days in the Month
        const totalDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        // Day Number in the Year
        const startOfYear = new Date(date.getFullYear(), 0, 0);
        const diff = date - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayNumberInYear = Math.floor(diff / oneDay);

        // Total Days in the Year
        const totalDaysInYear = date.getFullYear() % 4 === 0 && (date.getFullYear() % 100 !== 0 || date.getFullYear() % 400 === 0) ? 366 : 365;

        // Month Number in the Year
        const monthNumberInYear = date.getMonth() + 1;

        // Week Number in the Year
        const startOfWeek = new Date(date.getFullYear(), 0, 1);
        const weekNumberInYear = Math.ceil((((date - startOfWeek) / oneDay) + startOfWeek.getDay() + 1) / 7);

        // Week Number in the Month
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const weekNumberInMonth = Math.ceil((date.getDate() + startOfMonth.getDay()) / 7);


        const finalResult = {
            dayNumberInMonth,
            totalDaysInMonth,
            dayNumberInYear,
            totalDaysInYear,
            monthNumberInYear,
            weekNumberInYear,
            weekNumberInMonth
        }

        setResult(finalResult)

    };

    const resetInputs = () => {
        setResult('');
        setEnterDate(new Date().toISOString().substr(0, 10))
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>
                        WeekDay Calculator
                    </h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Enter a Date</span>
                        </div>
                        <input type="date" className="form-control" placeholder="Enter Value"
                            value={enterDate}
                            onChange={(e) => setEnterDate(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-sm btn-success' onClick={calculateValues}>Calculate</button>
                        <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs}>Reset</button>
                    </div>
                    <div >
                        <div>
                            <strong>
                                Day Number in Month =
                                <span className='text-success'>
                                    &nbsp; {result.dayNumberInMonth}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Total days in the Month =
                                <span className='text-success'>
                                    &nbsp; {result.totalDaysInMonth}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Day Number in the Year =
                                <span className='text-success'>
                                    &nbsp; {result.dayNumberInYear}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Total Days in the Year =
                                <span className='text-success'>
                                    &nbsp; {result.totalDaysInYear}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Month Number in the Year =
                                <span className='text-success'>
                                    &nbsp; {result.monthNumberInYear}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Week Number in the Year =
                                <span className='text-success'>
                                    &nbsp; {result.weekNumberInYear}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Week Number in the Month =
                                <span className='text-success'>
                                    &nbsp; {result.weekNumberInMonth}
                                </span>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default WeekDayCalculator;
