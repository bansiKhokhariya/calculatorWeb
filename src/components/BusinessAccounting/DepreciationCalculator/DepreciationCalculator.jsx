// import React, { useState } from 'react';

// const DepreciationCalculator = () => {
//   // State variables to store input values and result
//   const [startingBookValue, setStartingBookValue] = useState('');
//   const [endBookValue, setEndBookValue] = useState('');
//   const [depreciationYear, setDepreciationYear] = useState('');
//   const [depreciationMethod, setDepreciationMethod] = useState('Straight Line'); // Default to Straight Line
//   const [partialYearDepreciation, setPartialYearDepreciation] = useState(false);
//   const [depreciationResult, setDepreciationResult] = useState(null);
//   const [depreciationFactor, setDepreciationFactor] = useState(2);


//   const calculateDepreciation = () => {
//     // Convert input values to numbers
//     const startValue = parseFloat(startingBookValue);
//     const endValue = parseFloat(endBookValue);
//     const years = parseInt(depreciationYear);

//     // Check if all required inputs are valid
//     if (isNaN(startValue) || isNaN(endValue) || isNaN(years)) {
//       alert('Please enter valid numeric values for starting book value, end book value, and depreciation year.');
//       return;
//     }

//     // Calculate the depreciation based on the selected method
//     let annualDepreciation;
//     let totalDepreciation = 0;
//     let currentValue = startValue;
//     let endValue12 = startValue;
//     const depreciationData = [];
//     // Initialize variables for accumulated depreciation and depreciation data
//     let accumulatedDepreciation = 0;

//     for (let i = 1; i <= years; i++) {
//       let depreciation;
//       if (depreciationMethod === 'Straight Line') {
//         depreciation = (currentValue - endValue) / (years - i + 1);
//       } else if (depreciationMethod === 'Double Declining Balance') {
//         depreciation = (2 / years) * (startValue - accumulatedDepreciation);
//       } else {
//         alert('Selected depreciation method is not yet implemented.');
//         return;
//       }

//       annualDepreciation = depreciation.toFixed(2);
//       totalDepreciation += parseFloat(annualDepreciation);
//       endValue12 -= parseFloat(annualDepreciation);

//       depreciationData.push({
//         year: i,
//         startValue: currentValue.toFixed(2),
//         depreciation: `${((annualDepreciation / currentValue) * 100).toFixed(2)} %`,
//         annualDepreciation,
//         totalDepreciation: totalDepreciation.toFixed(2),
//         endValue: endValue12.toFixed(2)
//       });

//       currentValue -= parseFloat(annualDepreciation);
//     }

//     setDepreciationResult(depreciationData);
//   };

//   // Function to reset input values and result
//   const resetCalculator = () => {
//     setStartingBookValue('');
//     setEndBookValue('');
//     setDepreciationYear('');
//     setDepreciationMethod('Straight Line');
//     setPartialYearDepreciation(false);
//     setDepreciationResult(null);
//   };

//   return (
//     <div className='bootstrap-card-section'>
//       <div className="card bootstrap-card">
//         <div className="card-header text-center card-text">
//           <h1>
//             Depreciation Calculator
//           </h1>
//         </div>
//         <div className="card-body card-text">
//           <div className="input-group mb-3">
//             <div className="input-group-prepend">
//               <span className="input-group-text">Starting Book Value</span>
//             </div>
//             <input type="text" className="form-control" placeholder="Enter Value" value={startingBookValue} onChange={(e) => setStartingBookValue(e.target.value)} />
//           </div>
//           <div className="input-group mb-3">
//             <div className="input-group-prepend">
//               <span className="input-group-text">End Book Value</span>
//             </div>
//             <input type="text" className="form-control" placeholder="Enter Value" value={endBookValue} onChange={(e) => setEndBookValue(e.target.value)} />
//           </div>
//           <div className="input-group mb-3">
//             <div className="input-group-prepend">
//               <span className="input-group-text">Depreciation Year</span>
//             </div>
//             <input type="text" className="form-control" placeholder="Enter Value" value={depreciationYear} onChange={(e) => setDepreciationYear(e.target.value)} />
//           </div>
//           <div className="input-group mb-3">
//             <div className="input-group-prepend">
//               <label className="input-group-text" htmlFor="depreciationMethod">Depreciation Method</label>
//             </div>
//             <select className="form-select" id="depreciationMethod" value={depreciationMethod} onChange={(e) => setDepreciationMethod(e.target.value)}>
//               <option value="Straight Line">Straight Line</option>
//               <option value="Double Declining Balance">Double Declining Balance</option>
//               <option value="Double Declining Balance">Sum of Years's Digits</option>
//             </select>
//           </div>
//           {depreciationMethod === 'Double Declining Balance' &&
//             <div className="input-group mb-3">
//               <div className="input-group-prepend">
//                 <span className="input-group-text">Depreciation Factor</span>
//               </div>
//               <input type="text" className="form-control" placeholder="Enter Value" value={depreciationFactor} onChange={(e) => setDepreciationFactor(e.target.value)} />
//             </div>
//           }

//           <div className="form-check mb-3">
//             <input className="form-check-input" type="checkbox" id="partialYearDepreciation" checked={partialYearDepreciation} onChange={(e) => setPartialYearDepreciation(e.target.checked)} />
//             <label className="form-check-label" htmlFor="partialYearDepreciation">Partial Year Depreciation</label>
//           </div>
//           <div className='mb-3'>
//             <button className='btn btn-sm btn-success' onClick={calculateDepreciation}>Calculate</button>
//             <button className='btn btn-sm btn-primary ms-2' onClick={resetCalculator}>Reset</button>
//           </div>
//           {depreciationResult && (
//             <table className="table">
// <thead>
//   <tr>
//     <th>Year</th>
//     <th>Starting Book Value</th>
//     <th>End Book Value</th>
//     <th>Depreciation</th>
//     <th>Annual Depreciation</th>
//     <th>Total Depreciation</th>
//   </tr>
// </thead>
// <tbody>
//   {depreciationResult.map((data, index) => (
//     <tr key={index}>
//       <td>{data.year}</td>
//       <td>{data.startValue}</td>
//       <td>{data.endValue}</td>
//       <td>{data.depreciation}</td>
//       <td>{data.annualDepreciation}</td>
//       <td>{data.totalDepreciation}</td>
//     </tr>
//   ))}
// </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DepreciationCalculator;


import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

const DepreciationCalculator = () => {
  // State variables to store input values and result
  const [startingBookValue, setStartingBookValue] = useState('');
  const [endBookValue, setEndBookValue] = useState('');
  const [depreciationYear, setDepreciationYear] = useState('');
  const [depreciationMethod, setDepreciationMethod] = useState('Straight Line'); // Default to Straight Line
  const [partialYearDepreciation, setPartialYearDepreciation] = useState(false);
  const [depreciationResult, setDepreciationResult] = useState(null);
  const [depreciationFactor, setDepreciationFactor] = useState(2);


  const calculateDepreciation = () => {
    // Convert input values to numbers
    const startValue = parseFloat(startingBookValue);
    const endValue = parseFloat(endBookValue);
    const years = parseInt(depreciationYear);

    // Check if all required inputs are valid
    if (isNaN(startValue) || isNaN(endValue) || isNaN(years)) {
      alert('Please enter valid numeric values for starting book value, end book value, and depreciation year.');
      return;
    }

    let annualDepreciation;
    let totalDepreciation = 0;
    let currentValue = startValue;
    let endValue12 = startValue;
    const depreciationData = [];

    for (let i = 1; i <= years; i++) {
      let depreciation;
      if (depreciationMethod === 'Straight Line') {
        depreciation = (currentValue - endValue) / (years - i + 1);
      } else {
        alert('Selected depreciation method is not yet implemented.');
        return;
      }

      annualDepreciation = depreciation.toFixed(2);
      totalDepreciation += parseFloat(annualDepreciation);
      endValue12 -= parseFloat(annualDepreciation);

      depreciationData.push({
        year: i,
        startValue: currentValue.toFixed(2),
        depreciation: `${((annualDepreciation / currentValue) * 100).toFixed(2)} %`,
        annualDepreciation,
        totalDepreciation: totalDepreciation.toFixed(2),
        endValue: endValue12.toFixed(2)
      });
      currentValue -= parseFloat(annualDepreciation);
    }

    setDepreciationResult(depreciationData);
  };

  // Function to reset input values and result
  const resetCalculator = () => {
    setStartingBookValue('');
    setEndBookValue('');
    setDepreciationYear('');
    setDepreciationMethod('Straight Line');
    setPartialYearDepreciation(false);
    setDepreciationResult(null);
  };

  return (
    <div className='bootstrap-card-section'>
      <div className="card bootstrap-card">
        <div className="card-header text-center card-text">
          <h1>
            Depreciation Calculator
          </h1>
        </div>
        <div className="card-body card-text">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Starting Book Value</span>
            </div>
            <input type="text" className="form-control" placeholder="Enter Value" value={startingBookValue} onChange={(e) => setStartingBookValue(e.target.value)} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">End Book Value</span>
            </div>
            <input type="text" className="form-control" placeholder="Enter Value" value={endBookValue} onChange={(e) => setEndBookValue(e.target.value)} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Depreciation Year</span>
            </div>
            <input type="text" className="form-control" placeholder="Enter Value" value={depreciationYear} onChange={(e) => setDepreciationYear(e.target.value)} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="depreciationMethod">Depreciation Method</label>
            </div>
            <select className="form-select" id="depreciationMethod" value={depreciationMethod} onChange={(e) => setDepreciationMethod(e.target.value)}>
              <option value="Straight Line">Straight Line</option>
              {/* <option value="Double Declining Balance">Double Declining Balance</option> */}
              {/* <option value="Double Declining Balance">Sum of Years's Digits</option> */}
            </select>
          </div>
          {depreciationMethod === 'Double Declining Balance' &&
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Depreciation Factor</span>
              </div>
              <input type="text" className="form-control" placeholder="Enter Value" value={depreciationFactor} onChange={(e) => setDepreciationFactor(e.target.value)} />
            </div>
          }

          {/* <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="partialYearDepreciation" checked={partialYearDepreciation} onChange={(e) => setPartialYearDepreciation(e.target.checked)} />
            <label className="form-check-label" htmlFor="partialYearDepreciation">Partial Year Depreciation</label>
          </div> */}

          <div className='mb-3'>
            <button className='btn btn-sm btn-success' onClick={calculateDepreciation}>Calculate</button>
            <button className='btn btn-sm btn-primary ms-2' onClick={resetCalculator}>Reset</button>
          </div>
          {depreciationResult && (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Starting Book Value</th>
                    <th>End Book Value</th>
                    <th>Depreciation</th>
                    <th>Annual Depreciation</th>
                    <th>Total Depreciation</th>
                  </tr>
                </thead>
                <tbody>
                  {depreciationResult.map((data, index) => (
                    <tr key={index}>
                      <td>{data.year}</td>
                      <td>{data.startValue}</td>
                      <td>{data.endValue}</td>
                      <td>{data.depreciation}</td>
                      <td>{data.annualDepreciation}</td>
                      <td>{data.totalDepreciation}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepreciationCalculator;

