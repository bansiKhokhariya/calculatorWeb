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

    const resetInputs = () => {
        setStartDate('');
        setEndDate(new Date().toISOString().substr(0, 10));
        setAge('');
        setTotalDays('');
        setTotalMonths('');
        setComingBirthday('');
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>
                        Age Calculator
                    </h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Date of Birth</span>
                        </div>
                        <input type="date" className="form-control" placeholder="Enter Value"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Today's Date</span>
                        </div>
                        <input type="date" className="form-control" placeholder="Enter Value"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-sm btn-success' onClick={handleCalculate}>Calculate</button>
                        <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs}>Reset</button>
                    </div>
                    <div >
                        <div>
                            <strong>
                                Age =
                                <span className='text-success'>
                                    &nbsp; {age}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Total in days =
                                <span className='text-success'>
                                    &nbsp; {isNaN(totalDays) ? 'NaN' : totalDays}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Total in Months =
                                <span className='text-success'>
                                    &nbsp; {isNaN(totalMonths) ? 'NaN' : totalMonths}
                                </span>
                            </strong>
                        </div>
                        <div>
                            <strong>
                                Coming Birthday =
                                <span className='text-success'>
                                    &nbsp; {comingBirthday}
                                </span>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AgeCalculator;
