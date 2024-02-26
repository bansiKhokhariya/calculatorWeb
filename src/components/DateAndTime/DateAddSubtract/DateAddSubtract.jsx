import React, { useState } from 'react';
import './DateAddSubtract.css'

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

    return (
        <div className='percentage-caculator-section-main'>
            <div className="percentage-caculator-section">
                <h2 className='percentage-caculator-title'>Date Add and Subtract</h2>
                <div className='percentage-caculator-main-box'>
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="todayDate">Select a Date :</label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input
                                className='percentage-caculator-input'
                                type="date"
                                id="todayDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            &nbsp;
                            &nbsp;
                        </div>
                    </div>
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="todayDate">Date :</label>
                        <div className='input-radio-section'>
                            <div>
                                <input
                                    className='input-radio-box'
                                    type="radio"
                                    id="add"
                                    value="add"
                                    checked={operation === 'add'}
                                    onChange={() => setOperation('add')}
                                />
                                &nbsp;
                                <label className='input-radio-box-label' htmlFor="add">Add</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="subtract"
                                    value="subtract"
                                    checked={operation === 'subtract'}
                                    onChange={() => setOperation('subtract')}
                                />
                                &nbsp;
                                <label className='input-radio-box-label' htmlFor="subtract">Subtract</label>
                            </div>
                        </div>
                    </div>
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="year">Year(s) :</label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input className='dateAddSubtractNumberInput' type="number" id="year" value={yearValue} onChange={handleYearChange} />
                            &nbsp;
                            &nbsp;
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className='dateAddSubtractButton' style={{ paddingBottom: "5px", backgroundColor: "#FF4433" }} onClick={() => handleDecrement('year')}>-</button>
                            <button className='dateAddSubtractButton' onClick={() => handleIncrement('year')}>+</button>
                        </div>
                    </div>
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="month">Month(s) :</label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input className='dateAddSubtractNumberInput' type="number" id="month" value={monthValue} onChange={handleMonthChange} />
                            &nbsp;
                            &nbsp;
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className='dateAddSubtractButton' style={{ paddingBottom: "5px", backgroundColor: "#FF4433" }} onClick={() => handleDecrement('month')}>-</button>
                            <button className='dateAddSubtractButton' onClick={() => handleIncrement('month')}>+</button>
                        </div>
                    </div>

                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="week">Week(s) :</label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input className='dateAddSubtractNumberInput' type="number" id="week" value={weekValue} onChange={handleWeekChange} />
                            &nbsp;
                            &nbsp;
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className='dateAddSubtractButton' style={{ paddingBottom: "5px", backgroundColor: "#FF4433" }} onClick={() => handleDecrement('week')}>-</button>
                            <button className='dateAddSubtractButton' onClick={() => handleIncrement('week')}>+</button>
                        </div>
                    </div>

                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="day">Day(s) :</label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input className='dateAddSubtractNumberInput' type="number" id="day" value={dayValue} onChange={handleDayChange} />
                            &nbsp;
                            &nbsp;
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className='dateAddSubtractButton' style={{ paddingBottom: "5px", backgroundColor: "#FF4433" }} onClick={() => handleDecrement('day')}>-</button>
                            <button className='dateAddSubtractButton' onClick={() => handleIncrement('day')}>+</button>
                        </div>
                    </div>
                    <div className='percentage-button-section'>
                        <div className='percentage-button green-button' onClick={handleCalculate}>
                            Calculate
                        </div>
                    </div>
                    <div className='percentage-result-section'>
                        <div className='result-value'>
                            Result Date: <span className='result-value-span-green'>{resultDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DateAddSubtract;
