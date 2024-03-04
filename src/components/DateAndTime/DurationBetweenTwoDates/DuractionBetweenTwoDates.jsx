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

    // Date period
    var result = durationDate(start, end)
    const durationString = `${result.years} years ${result.months} months ${result.days} days`;
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

  function durationDate(since, until) {

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

  const resetInputs = () => {
    setStartDate('');
    setEndDate('');
    setDuration('');
    setExcludingDuration('');
    setDurationString('');
  };

  return (
    <div className='bootstrap-card-section'>
      <div className="card bootstrap-card">
        <div className="card-header text-center card-text">
          <h1>
            Duration Between Two Dates
          </h1>
        </div>
        <div className="card-body card-text">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Start Date</span>
            </div>
            <input type="date" className="form-control" placeholder="Enter Value"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">End Date</span>
            </div>
            <input type="date" className="form-control" placeholder="Enter Value"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <button className='btn btn-sm btn-success' onClick={calculateDuration}>Calculate</button>
            <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs}>Reset</button>
          </div>
          <div >
            <div>
              <strong>
                Date Period =
                <span className='text-success'>
                  &nbsp; {durationString}
                </span>
              </strong>
            </div>
            <div>
              <strong>
                Difference in days =
                <span className='text-success'>
                  &nbsp; {duration} days
                </span>
              </strong>
            </div>
            <div>
              <strong>
                Difference in days (Excluding Weekends) =
                <span className='text-success'>
                  &nbsp; {excludingDuration} days
                </span>
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default DuractionBetweenTwoDates;
