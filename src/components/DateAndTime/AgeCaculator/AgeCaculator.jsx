import React, { useState } from 'react';

const AgeCalculator = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(new Date().toISOString().substr(0, 10)); // Default to today's date
    const [age, setAge] = useState('');
    const [totalDays, setTotalDays] = useState('');
    const [totalMonths, setTotalMonths] = useState('');
    const [comingBirthday, setComingBirthday] = useState('');

    const calculateAge = () => {
        const dob = new Date(startDate);
        const today = new Date(endDate);

        var gapBetweenBithdateOrToday = duration(dob, today);

        const ageInMilliseconds = today - dob;
        const ageInDays = ageInMilliseconds / (1000 * 60 * 60 * 24);
        const ageInYears = Math.floor(ageInDays / 365);
        const remainingDays = ageInDays % 365;
        const ageInMonths = Math.floor(remainingDays / 30);

        const ageString = `${gapBetweenBithdateOrToday.years} years ${gapBetweenBithdateOrToday.months} months ${gapBetweenBithdateOrToday.days} days`;

        const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

        var nextBirthdayMonthDay = duration(today, nextBirthday);

        if (nextBirthday < today || nextBirthday.getTime() === today.getTime()) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }

        const comingBirthdayString = formatDate(nextBirthday);

        setAge(ageString);
        setTotalDays(ageInDays.toString());
        setTotalMonths((ageInYears * 12 + ageInMonths).toString());
        setComingBirthday(`${comingBirthdayString} / ${nextBirthdayMonthDay.months} months ${nextBirthdayMonthDay.days} days`);
    };

    function duration(since, until) {
        // Swap the dates if since is greater than until
        if (since > until) {
            var temp = since;
            since = until;
            until = temp;
        }

        var years = until.getFullYear() - since.getFullYear();
        var months = until.getMonth() - since.getMonth();
        var days = until.getDate() - since.getDate();

        // Adjust months and years based on days
        if (days < 0) {
            var prevMonthLastDay = new Date(until.getFullYear(), until.getMonth(), 0).getDate();
            months--;
            days = prevMonthLastDay - since.getDate() + until.getDate();
        }

        // Adjust years if the months difference is negative
        if (months < 0) {
            years--;
            months += 12;
        }

        return {
            "years": years,
            "months": months,
            "days": days
        };
    }

    const formatDate = (date) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleCalculate = () => {
        calculateAge();
    };

    return (
        <div className='percentage-caculator-section-main'>
            <div className="percentage-caculator-section">
                <h2 className='percentage-caculator-title'>Age Calculator</h2>
                <div className='percentage-caculator-main-box'>
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="dateOfBirth">Date of Birth:</label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input
                                className='percentage-caculator-input'
                                type="date"
                                id="dateOfBirth"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            &nbsp;
                            &nbsp;
                        </div>
                    </div>
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="todayDate">Today's Date:</label>
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
                    <div className='percentage-button-section'>
                        <div className='percentage-button green-button' onClick={handleCalculate}>
                            Calculate
                        </div>
                    </div>
                    <div className='percentage-result-section'>
                        <div className='result-value'>
                            Age: <span className='result-value-span-green'>{age}</span>
                        </div>
                        <div className='result-value'>
                            Total in days: <span className='result-value-span-green'>{isNaN(totalDays) ? 'NaN' : totalDays}</span>
                        </div>
                        <div className='result-value'>
                            Total in Months: <span className='result-value-span-green'>{isNaN(totalMonths) ? 'NaN' : totalMonths}</span>
                        </div>
                        <div className='result-value'>
                            Coming Birthday: <span className='result-value-span-green'>{comingBirthday}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default { AgeCalculator };
