import React, { useState } from 'react';

const DuractionBetweenTwoDates = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState('');
  const [excludingDuration, setExcludingDuration] = useState('');
  const [durationString, setDurationString] = useState('');

  const calculateDuration = () => {

    const start = new Date(startDate);
    const end = new Date(endDate);

    // total Days With Out Excluding
    let Difference_In_Time =
      end.getTime() - start.getTime();
    let Difference_In_Days =
      Math.round
        (Difference_In_Time / (1000 * 3600 * 24));

    setDuration(Difference_In_Days)

    // Calculate years, months, and days separately
    const years = Math.floor(Difference_In_Days / 365);
    const months = Math.floor((Difference_In_Days % 365) / 30);
    const days = (Difference_In_Days % 30);

    const durationString = `${years} years ${months} months ${days} days`;
    setDurationString(durationString)

    //  total Days With Excluding

    let totalDaysWithExcluding = 0;
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        totalDaysWithExcluding++;
      }
    }
    setExcludingDuration(totalDaysWithExcluding - 1);

  };


  return (
    <div className='percentage-caculator-section-main'>
      <div className="percentage-caculator-section">
        <h2 className='percentage-caculator-title'>Duration Between Two Dates</h2>
        <div className='percentage-caculator-main-box' >
          <div className='percentage-input-box'>
            <label className='percentage-caculator-lable' htmlFor="startDate">Start Date:</label>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <input
                className='percentage-caculator-input'
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              &nbsp;
              &nbsp;
            </div>
          </div>
          <div className='percentage-input-box'>
            <label className='percentage-caculator-lable' htmlFor="endDate">End Date :</label>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <input
                className='percentage-caculator-input'
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              &nbsp;
              &nbsp;
            </div>
          </div>
          <div className='percentage-button-section'>
            <div className='percentage-button green-button' onClick={calculateDuration}>
              Calculate
            </div>
          </div>
          <div className='percentage-result-section'>
            <div className='result-value'>
              Date Period:  <span className='result-value-span-green'>{durationString}</span>
            </div>
            <div className='result-value'>
              Difference in days:  <span className='result-value-span-green'>{duration} days</span>
            </div>
            <div className='result-value'>
              Difference in days (Excluding Weekends):  <span className='result-value-span-green'>{excludingDuration} days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DuractionBetweenTwoDates;
