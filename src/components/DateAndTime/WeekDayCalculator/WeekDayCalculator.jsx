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

    return (
        <div className='percentage-caculator-section-main'>
            <div className="percentage-caculator-section">
                <h2 className='percentage-caculator-title'>WeekDay Calculator</h2>
                <div className='percentage-caculator-main-box'>
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="todayDate">Enter a Date:</label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input
                                className='percentage-caculator-input'
                                type="date"
                                id="todayDate"
                                value={enterDate}
                                onChange={(e) => setEnterDate(e.target.value)}
                            />
                            &nbsp;
                            &nbsp;
                        </div>
                    </div>
                    <div className='percentage-button-section'>
                        <div className='percentage-button green-button' onClick={calculateValues}>
                            Calculate
                        </div>
                    </div>
                    <div className='percentage-result-section'>
                        <div className='result-value'>
                            Day Number in Month: <span className='result-value-span-green'>{result.dayNumberInMonth}</span>
                        </div>
                        <div className='result-value'>
                            Total days in the Month: <span className='result-value-span-green'>{result.totalDaysInMonth}</span>
                        </div>
                        <div className='result-value'>
                            Day Number in the Year: <span className='result-value-span-green'>{result.dayNumberInYear}</span>
                        </div>
                        <div className='result-value'>
                            Total Days in the Year:  <span className='result-value-span-green'>{result.totalDaysInYear}</span>
                        </div>
                        <div className='result-value'>
                            Month Number in the Year:  <span className='result-value-span-green'>{result.monthNumberInYear}</span>
                        </div>
                        <div className='result-value'>
                            Week Number in the Year:  <span className='result-value-span-green'>{result.weekNumberInYear}</span>
                        </div>
                        <div className='result-value'>
                            Week Number in the Month:  <span className='result-value-span-green'>{result.weekNumberInMonth}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeekDayCalculator;
