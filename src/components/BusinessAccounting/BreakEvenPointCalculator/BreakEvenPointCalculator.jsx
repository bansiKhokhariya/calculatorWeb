import React, { useState } from 'react';
const BreakEvenPointCalculator = () => {
  const [fixedCosts, setFixedCosts] = useState('1000000');
  const [costPerUnit, setCostPerUnit] = useState('300');
  const [salePricePerUnit, setSalePricePerUnit] = useState('500');
  const [breakEvenUnits, setBreakEvenUnits] = useState('5000');
  const [breakEvenSales, setBreakEvenSales] = useState('2500000');

  const handleInputChange = (event, setterFunction) => {
    const inputValue = event.target.value;
    if (/^\d*$/.test(inputValue) || event.keyCode === 8) {
      setterFunction(inputValue);
    }
  };
  // Function to handle calculation
  const calculateBreakEven = () => {
    // Convert input values to numbers
    const fixedCostsValue = parseFloat(fixedCosts);
    const costPerUnitValue = parseFloat(costPerUnit);
    const salePricePerUnitValue = parseFloat(salePricePerUnit);

    // Check if all input values are valid numbers
    if (!isNaN(fixedCostsValue) && !isNaN(costPerUnitValue) && !isNaN(salePricePerUnitValue)) {
      // Calculate break even units
      const breakEvenUnitsValue = fixedCostsValue / (salePricePerUnitValue - costPerUnitValue);
      // Calculate break even sales
      const breakEvenSalesValue = breakEvenUnitsValue * salePricePerUnitValue;

      // Update state with calculated values
      setBreakEvenUnits(breakEvenUnitsValue.toFixed(2));
      setBreakEvenSales(breakEvenSalesValue.toFixed(2));
    }
  };

  // Function to reset input values and calculated results
  const resetCalculator = () => {
    setFixedCosts('');
    setCostPerUnit('');
    setSalePricePerUnit('');
    setBreakEvenUnits('');
    setBreakEvenSales('');
  };

  const calculationShare = () => {
    if (breakEvenUnits) {

      const blob = new Blob([
        `Break Even Points Units:\n`,
        `${breakEvenUnits}\n`,
        `Break Even Points Sales:\n`,
        `${breakEvenSales}`
      ], { type: "text/plain" });


      if (navigator.share) {
        navigator.share({
          title: "Calculation",
          text: [
            `Total Fixed Costs : ${fixedCosts}\n Costs per Unit : ${costPerUnit} \n Sale Price per Unit : ${salePricePerUnit} \n\n Break Even Points Units : ${breakEvenUnits}\n Break Even Points Sales : ${breakEvenSales}\n\n`
          ]
        }).then(() => {
          console.log('Thanks for sharing!');
        }).catch((err) => {
          console.error(err);
        });
      } else {
        alert("Your browser does not support the share function. Please manually share the PDF file.");
        const pdfUrl = window.URL.createObjectURL(blob);
        console.log("History PDF file URL:", pdfUrl);
      }
    } else {
      alert('Calculation not available')
    }
  }

  return (
    <div className='bootstrap-card-section'>
      <div className="card bootstrap-card">
        <div className="card-header text-center card-text">
          <h1>
            Break Even Point Calculator
          </h1>
        </div>
        <div className="card-body card-text">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Total Fixed Costs</span>
            </div>
            <input type="number" className="form-control" placeholder="Enter Value" inputMode='numeric' value={fixedCosts} onChange={(e) => handleInputChange(e, setFixedCosts)} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Costs per Unit</span>
            </div>
            <input type="number" className="form-control" placeholder="Enter Value" inputMode='numeric' value={costPerUnit} onChange={(e) => handleInputChange(e, setCostPerUnit)} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Sale Price per Unit</span>
            </div>
            <input type="number" className="form-control" placeholder="Enter Value" inputMode='numeric' value={salePricePerUnit} onChange={(e) => handleInputChange(e, setSalePricePerUnit)} />
          </div>
          <div className='mb-3'>
            <button className='btn btn-sm btn-success' onClick={calculateBreakEven}>Calculate</button>
            <button className='btn btn-sm btn-primary ms-2' onClick={resetCalculator}>Reset</button>
          </div>
          {breakEvenUnits &&
            <div>
              <div>
                <hr />
                <strong>
                  Break Even Points Units = <span className='text-success'>&nbsp; {breakEvenUnits}</span>
                </strong>
                <br />
                <strong>
                  Break Even Points Sales = <span className='text-success'>&nbsp; {breakEvenSales}</span>
                </strong>
                <br />
                <button className='btn btn-sm btn-success mt-2' onClick={() => calculationShare()}>Email</button>
              </div>
            </div>
          }

        </div>
      </div>
    </div >
  );
};

export default BreakEvenPointCalculator;
