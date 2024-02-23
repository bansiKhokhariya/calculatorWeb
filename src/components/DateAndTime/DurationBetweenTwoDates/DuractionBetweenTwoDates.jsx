import React, { useState } from 'react';

const DuractionBetweenTwoDates = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState('');

  const calculateDuration = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let totalDays = 0;
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Exclude weekends
        totalDays++;
      }
    }
    setDuration(totalDays);


    // const diffTime = Math.abs(start - end);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffTime + " milliseconds");
    // console.log(diffDays + " days");
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
            {/* <div className='result-value'>
              Difference in days:  <span className='result-value-span-green'>{duration} days</span>
            </div> */}
            <div className='result-value'>
              Difference in days (Excluding Weekends):  <span className='result-value-span-green'>{duration} days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DuractionBetweenTwoDates;
