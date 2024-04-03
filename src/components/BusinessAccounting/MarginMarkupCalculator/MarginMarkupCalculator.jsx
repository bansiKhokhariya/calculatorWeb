import React, { useState } from 'react';

const MarginMarkupCalculator = () => {
    const [selectedOption, setSelectedOption] = useState('Cost and Revenue');
    const [revenue, setRevenue] = useState('');
    const [cost, setCost] = useState('');
    const [profit, setProfit] = useState('');
    const [margin, setMargin] = useState('');
    const [markup, setMarkup] = useState('');

    const [result, setResult] = useState({
        cost: '',
        grossProfit: '',
        revenue: '',
        markup: '',
        margin: ''
    });

    // Function to calculate result based on the selected known values and their corresponding inputs
    const calculateResult = () => {

        let resultValue = {
            cost: '',
            grossProfit: '',
            revenue: '',
            markup: '',
            margin: ''
        };

        // Calculate the result based on the selected option
        switch (selectedOption) {
            case 'Cost and Revenue':
                resultValue.cost = cost;
                resultValue.revenue = revenue;
                resultValue.grossProfit = revenue - cost;
                resultValue.markup = ((revenue - cost) / cost) * 100;
                resultValue.margin = (resultValue.grossProfit / revenue) * 100;
                break;
            case 'Cost and Profit':
                resultValue.cost = cost;
                resultValue.revenue = parseFloat(cost) + parseFloat(profit);
                resultValue.grossProfit = profit;
                resultValue.markup = (profit / cost) * 100;
                resultValue.margin = (profit / resultValue.revenue) * 100;
                break;
            case 'Cost and Margin':
                resultValue.cost = cost;
                resultValue.margin = margin;
                resultValue.revenue = cost / (1 - margin / 100);
                resultValue.grossProfit = resultValue.revenue - cost;
                resultValue.markup = (resultValue.grossProfit / cost) * 100;
                break;
            case 'Cost and Markup':
                resultValue.cost = cost;
                resultValue.markup = markup;
                resultValue.revenue = cost * (1 + markup / 100);
                resultValue.grossProfit = resultValue.revenue - cost;
                resultValue.margin = (resultValue.grossProfit / resultValue.revenue) * 100;
                break;
            case 'Revenue and Profit':
                resultValue.revenue = revenue;
                resultValue.cost = resultValue.revenue - profit;
                resultValue.grossProfit = profit;
                resultValue.margin = (resultValue.grossProfit / resultValue.revenue) * 100;
                resultValue.markup = (resultValue.grossProfit / resultValue.cost) * 100;
                break;
            case 'Revenue and Markup':
                resultValue.revenue = revenue;
                resultValue.markup = markup;
                resultValue.cost = resultValue.revenue / (1 + resultValue.markup / 100);
                resultValue.grossProfit = resultValue.revenue - resultValue.cost;
                resultValue.margin = (resultValue.grossProfit / resultValue.revenue) * 100;
                break;
            case 'Revenue and Margin':
                resultValue.revenue = revenue;
                resultValue.margin = margin;
                resultValue.cost = resultValue.revenue - (resultValue.revenue * resultValue.margin / 100);
                resultValue.grossProfit = resultValue.revenue - resultValue.cost;
                resultValue.markup = (resultValue.grossProfit / resultValue.cost) * 100;
                break;
            case 'Profit and Margin':
                resultValue.margin = margin;
                resultValue.revenue = 100 * profit / margin;
                resultValue.grossProfit = profit;
                resultValue.cost = resultValue.revenue - margin * resultValue.revenue / 100
                resultValue.markup = (resultValue.grossProfit / resultValue.cost) * 100;
                break;
            case 'Profit and Markup':
                resultValue.markup = markup;
                resultValue.grossProfit = profit;
                resultValue.cost = (profit / markup) * 100;
                resultValue.revenue = Number(resultValue.grossProfit) + Number(resultValue.cost);
                resultValue.margin = ((resultValue.revenue - resultValue.cost) / resultValue.revenue) * 100;
                break;
            default:
                break;
        }

        setResult(resultValue);
    };

    const handleSelection = (selection) => {
        setSelectedOption(selection)
        setRevenue("")
        setCost("")
        setProfit("")
        setMargin("")
        setMarkup("")
        setResult({
            cost: '',
            grossProfit: '',
            revenue: '',
            markup: '',
            margin: ''
        })
    }

    const calculationShare = () => {
        if (result.cost) {
            const [key1, key2] = selectedOption.split(' and ');
            let value1;
            switch (key1 || key2) {
                case ('Profit'):
                    value1 = profit;
                    break;
                case ('Cost'):
                    value1 = cost;
                    break;
                case ('Revenue'):
                    value1 = revenue;
                    break;
                case ('Margin'):
                    value1 = margin;
                    break;
                case ('Markup'):
                    value1 = markup;
                    break;
                default:
                    break;
            }

            let value2;
            switch (key2) {
                case ('Profit'):
                    value2 = profit;
                    break;
                case ('Cost'):
                    value2 = cost;
                    break;
                case ('Revenue'):
                    value2 = revenue;
                    break;
                case ('Margin'):
                    value2 = margin;
                    break;
                case ('Markup'):
                    value2 = markup;
                    break;
                default:
                    break;
            }

            if (navigator.share) {
                navigator.share({
                    title: "Calculation",
                    text: `Known Values: ${selectedOption}\n${key1}: ${value1}\n${key2}: ${value2}\n\nCalculation Result:\n\nCost: ${result.cost}\nGross Profit: ${result.grossProfit}\nRevenue: ${result.revenue}\nMarkup: ${result.markup}%\nMargin: ${result.margin}% \n\n`
                }).then(() => {
                    console.log('Thanks for sharing!');
                }).catch((err) => {
                    console.error(err);
                });
            } else {
                alert("Your browser does not support the share function. Please manually share the calculation.");
            }
        } else {
            alert('Calculation not available');
        }
    };

    const resetFields = () => {
        setSelectedOption('Cost and Revenue');
        setRevenue('');
        setCost('');
        setProfit('');
        setMargin('');
        setMarkup('');
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>Margin and Markup Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text">Known Values</label>
                        </div>
                        <select className="form-select" value={selectedOption} onChange={(e) => handleSelection(e.target.value)}>
                            <option value="Cost and Revenue">Cost and Revenue</option>
                            <option value="Cost and Profit">Cost and Profit</option>
                            <option value="Cost and Margin">Cost and Margin</option>
                            <option value="Cost and Markup">Cost and Markup</option>
                            <option value="Revenue and Profit">Revenue and Profit</option>
                            <option value="Revenue and Markup">Revenue and Markup</option>
                            <option value="Revenue and Margin">Revenue and Margin</option>
                            <option value="Profit and Margin">Profit and Margin</option>
                            <option value="Profit and Markup">Profit and Markup</option>
                        </select>
                    </div>
                    {selectedOption.includes('Cost') &&
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Cost</label>
                            </div>
                            <input type="number" inputMode='numeric' className="form-control" value={cost} onChange={(e) => setCost(e.target.value)} />
                        </div>
                    }
                    {selectedOption.includes('Revenue') &&
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Revenue</label>
                            </div>
                            <input type="number" inputMode='numeric' className="form-control" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
                        </div>
                    }
                    {selectedOption.includes('Profit') &&
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Profit</label>
                            </div>
                            <input type="number" inputMode='numeric' className="form-control" value={profit} onChange={(e) => setProfit(e.target.value)} />
                        </div>
                    }
                    {selectedOption.includes('Markup') &&
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Markup (%)</label>
                            </div>
                            <input type="number" inputMode='numeric' className="form-control" value={markup} onChange={(e) => setMarkup(e.target.value)} />
                        </div>
                    }
                    {selectedOption.includes('Margin') &&
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Margin (%)</label>
                            </div>
                            <input type="number" inputMode='numeric' className="form-control" value={margin} onChange={(e) => setMargin(e.target.value)} />
                        </div>
                    }

                    <div>
                        <button className='btn btn-sm btn-success mb-2' onClick={(e) => calculateResult()}>Calculate</button>
                        <button className="btn btn-primary btn-sm ms-2" onClick={resetFields}>Reset</button>
                    </div>

                    {result.cost &&
                        <>
                            <hr />
                            <div>
                                <strong>
                                    Cost = <span className='text-success'>{result.cost}</span>
                                </strong>
                                <br />
                                <strong>
                                    Gross Profit = <span className='text-success'>{result.grossProfit}</span>
                                </strong>
                                <br />
                                <strong>
                                    Revenue = <span className='text-success'>{result.revenue}</span>
                                </strong>
                                <br />
                                <strong>
                                    Markup = <span className='text-success'>{result.markup} %</span>
                                </strong>
                                <br />
                                <strong>
                                    Margin = <span className='text-success'>{result.margin} %</span>
                                </strong>
                            </div>
                            <div>
                                <button className='btn btn-sm btn-primary mt-2' onClick={() => calculationShare()}>Email</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default MarginMarkupCalculator;
