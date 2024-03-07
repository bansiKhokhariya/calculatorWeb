import React, { useState } from 'react';

const DateAddSubtract = () => {
    const [endDate, setEndDate] = useState(new Date().toISOString().substr(0, 10)); // Default to today's date
    const [operation, setOperation] = useState('add');
    const [yearValue, setYearValue] = useState(0);
    const [monthValue, setMonthValue] = useState(0);
    const [weekValue, setWeekValue] = useState(0);
    const [dayValue, setDayValue] = useState(0);
    const [resultDate, setResultDate] = useState('');

    const handleOperationChange = (e) => {
        setOperation(e.target.value);
        if (e.target.value === 'add') {
            if (yearValue < 0) setYearValue(0);
            if (monthValue < 0) setMonthValue(0);
            if (weekValue < 0) setWeekValue(0);
            if (dayValue < 0) setDayValue(0);
        } else {
            if (yearValue > 0) setYearValue(0);
            if (monthValue > 0) setMonthValue(0);
            if (weekValue > 0) setWeekValue(0);
            if (dayValue > 0) setDayValue(0);
        }
    };

    const handleYearChange = (e) => {
        setYearValue(Math.max(0, parseInt(e.target.value)));
    };

    const handleMonthChange = (e) => {
        setMonthValue(Math.max(0, parseInt(e.target.value)));
    };

    const handleWeekChange = (e) => {
        setWeekValue(Math.max(0, parseInt(e.target.value)));
    };

    const handleDayChange = (e) => {
        setDayValue(Math.max(0, parseInt(e.target.value)));
    };

    const handleIncrement = (field) => {
        switch (field) {
            case 'year':
                setYearValue(yearValue + 1);
                break;
            case 'month':
                setMonthValue(monthValue + 1);
                break;
            case 'week':
                setWeekValue(weekValue + 1);
                break;
            case 'day':
                setDayValue(dayValue + 1);
                break;
            default:
                break;
        }
    };

    const handleDecrement = (field) => {
        switch (field) {
            case 'year':
                setYearValue(Math.max(0, yearValue - 1));
                break;
            case 'month':
                setMonthValue(Math.max(0, monthValue - 1));
                break;
            case 'week':
                setWeekValue(Math.max(0, weekValue - 1));
                break;
            case 'day':
                setDayValue(Math.max(0, dayValue - 1));
                break;
            default:
                break;
        }
    };


    const handleCalculate = () => {
        const date = new Date(endDate);
        let multiplier = operation === 'add' ? 1 : -1;

        date.setFullYear(date.getFullYear() + multiplier * yearValue);
        date.setMonth(date.getMonth() + multiplier * monthValue);
        date.setDate(date.getDate() + multiplier * weekValue * 7 + multiplier * dayValue);
        setResultDate(date.toISOString().substr(0, 10));
    };

    const resetInputs = () => {
        setResultDate('');
        setYearValue(0);
        setMonthValue(0);
        setWeekValue(0);
        setDayValue(0);
        setEndDate(new Date().toISOString().substr(0, 10))
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>
                        Date Add and Subtract
                    </h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Select a Date</span>
                        </div>
                        <input type="date" className="form-control" placeholder="Enter Value"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className=' mb-3'>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id='add' value="add"
                                checked={operation === 'add'}
                                onChange={() => setOperation('add')} />
                            <label className="form-check-label" htmlFor="add">Add</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="subtract"
                                value="subtract"
                                checked={operation === 'subtract'}
                                onChange={() => setOperation('subtract')} />
                            <label className="form-check-label" htmlFor="subtract">Subtract</label>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Year(s)</span>
                        </div>
                        <input type="number" className="form-control" placeholder="Enter Value"
                            value={yearValue} onChange={handleYearChange}
                        />
                        <button className='btn btn-sm btn-danger card-text' style={{ width: "40px" }} onClick={() => handleDecrement('year')}>-</button>
                        <button className='btn btn-sm btn-success' style={{ width: "40px" }} onClick={() => handleIncrement('year')}>+</button>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Month(s)</span>
                        </div>
                        <input type="number" className="form-control" placeholder="Enter Value"
                            value={monthValue} onChange={handleMonthChange}
                        />
                        <button className='btn btn-sm btn-danger card-text' style={{ width: "40px" }} onClick={() => handleDecrement('month')}>-</button>
                        <button className='btn btn-sm btn-success' style={{ width: "40px" }} onClick={() => handleIncrement('month')}>+</button>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Week(s)</span>
                        </div>
                        <input type="number" className="form-control" placeholder="Enter Value"
                            value={weekValue} onChange={handleWeekChange}
                        />
                        <button className='btn btn-sm btn-danger card-text' style={{ width: "40px" }} onClick={() => handleDecrement('week')}>-</button>
                        <button className='btn btn-sm btn-success' style={{ width: "40px" }} onClick={() => handleIncrement('week')}>+</button>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Day(s)</span>
                        </div>
                        <input type="number" className="form-control" placeholder="Enter Value"
                            value={dayValue} onChange={handleDayChange}
                        />
                        <button className='btn btn-sm btn-danger card-text' style={{ width: "40px" }} onClick={() => handleDecrement('day')}>-</button>
                        <button className='btn btn-sm btn-success' style={{ width: "40px" }} onClick={() => handleIncrement('day')}>+</button>
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-sm btn-success' onClick={handleCalculate}>Calculate</button>
                        <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs}>Reset</button>
                    </div>
                    <div>
                        <div>
                            <strong>
                                Result Date =
                                <span className='text-success'>
                                    &nbsp; {resultDate}
                                </span>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default DateAddSubtract;
