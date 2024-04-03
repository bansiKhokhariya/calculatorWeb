import React, { useState, useEffect } from 'react';
import Finance from 'tvm-financejs';
import {  Modal, Button, Table, Form } from 'react-bootstrap';

const TvmCalculatorAdvanced = (props) => {
    const [activeButton, setActiveButton] = useState('PV');
    const [presentValue, setPresentValue] = useState('');
    const [payments, setPayments] = useState('');
    const [futureValue, setFutureValue] = useState('');
    const [annualRate, setAnnualRate] = useState('');
    const [periods, setPeriods] = useState('');
    const [compoundingRate, setCompoundingRate] = useState('annually');
    const [compoundingPeriods, setCompoundingPeriods] = useState('monthly');
    const [mode, setMode] = useState(0);
    const [result, setResult] = useState('');
    const [buttonParams, setButtonParams] = useState('PV');
    const [savedTVMHistory, setSavedTVMHistory] = useState([]);
    const [editMode, setEditMode] = useState(false); // Track whether edit mode is active
    const [editedNote, setEditedNote] = useState(''); // Store the edited note
    const [editIndex, setEditIndex] = useState(-1);
    var selectedTheme = localStorage.getItem('selectedTheme');


    // Function to retrieve saved tvm data from local storage
    useEffect(() => {
        try {
            const savedData = JSON.parse(localStorage.getItem(props.historyName)) || [];
            setSavedTVMHistory(savedData);
        } catch (error) {
            setSavedTVMHistory([]);
        }
    }, [props.isModalOpen]);


    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}-${month}-${year} (${hours}:${minutes} ${ampm})`;
    };

    const handlesaveHistory = () => {
        const tvmHistory = JSON.parse(localStorage.getItem(props.historyName)) || [];
        const newCalculation = {
            PV: presentValue,
            PMT: payments,
            FV: futureValue,
            RATE: `${annualRate} (${compoundingRate})`,
            PERIOD: `${periods} (${compoundingPeriods})`,
            note: '',
            timestamp: formatDate(new Date()) // Format the date
        };
        tvmHistory.push(newCalculation);
        localStorage.setItem(props.historyName, JSON.stringify(tvmHistory));
    }

    // Function to handle deleting a saved tvm history
    const handleDelete = (index) => {
        const updatedLoans = savedTVMHistory.filter((loan, i) => i !== index);
        setSavedTVMHistory(updatedLoans);
        localStorage.setItem(props.historyName, JSON.stringify(updatedLoans));
    };
    const handleDeleteHistory = () => {
        localStorage.removeItem(props.historyName);
        setSavedTVMHistory([])
    };

    // Function to handle editing a note
    const handleEditNote = (index) => {
        setEditIndex(index);
        setEditedNote(savedTVMHistory[index].note);
        setEditMode(true);
    };

    // Function to save the edited note
    const handleSaveNote = () => {
        const updatedHistory = [...savedTVMHistory];
        updatedHistory[editIndex].note = editedNote;
        setSavedTVMHistory(updatedHistory);
        localStorage.setItem(props.historyName, JSON.stringify(updatedHistory));
        setEditMode(false);
    };

    // Function to handle closing the edit modal
    const handleCloseModal = () => {
        setEditMode(false);
        setEditedNote('');
        setEditIndex(-1);
    };

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        setButtonParams(buttonName);
    };

    const handleCalculate = () => {
        const finance = new Finance();
        let calculatedValue = '';

        const tvmParams = {
            PV: parseFloat(presentValue),
            RATE: parseFloat(annualRate) / 100,
            PERIOD: parseFloat(periods),
            PMT: parseFloat(payments),
            FV: parseFloat(futureValue)
        };

        // Adjust RATE calculation based on the compounding frequency
        switch (compoundingRate) {
            case 'monthly':
                tvmParams.RATE /= 12;
                break;
            case 'annually':
                tvmParams.RATE /= 1;
                break;
            case 'quarterly':
                tvmParams.RATE /= 4;
                break;  
            case 'semiannually':
                tvmParams.RATE /= 2;
                break;
            case 'semimonthly':
                tvmParams.RATE /= 24;
                break;
            case 'biweekly':
                tvmParams.RATE /= 26;
                break;
            case 'weekly':
                tvmParams.RATE /= 52;
                break;
            case 'daily':
                tvmParams.RATE /= 365;
                break;
            default:
                tvmParams.RATE /= 1;
                break;
        }

        // Adjust PERIODS calculation based on the compounding frequency
        switch (compoundingPeriods) {
            case 'monthly':
                tvmParams.PERIOD *= 12;
                break;
            case 'annually':
                tvmParams.PERIOD *= 1;
                break;
            case 'quarterly':
                tvmParams.PERIOD *= 4;
                break;
            case 'semiannually':
                tvmParams.PERIOD *= 2;
                break;
            case 'semimonthly':
                tvmParams.PERIOD *= 24;
                break;
            case 'biweekly':
                tvmParams.PERIOD *= 26;
                break;
            case 'weekly':
                tvmParams.PERIOD *= 52;
                break;
            case 'daily':
                tvmParams.PERIOD *= 365;
                break;
            default:
                tvmParams.PERIOD *= 12;
                break;
        }

        switch (activeButton) {
            case 'PV':
                calculatedValue = finance.PV(tvmParams.RATE, tvmParams.PERIOD, tvmParams.PMT, tvmParams.FV, mode);
                setPresentValue(calculatedValue.toFixed(2))
                break;
            case 'PMT':
                calculatedValue = finance.PMT(tvmParams.RATE, tvmParams.PERIOD, tvmParams.PV, tvmParams.FV, mode);
                setPayments(calculatedValue.toFixed(2))
                break;
            case 'FV':
                calculatedValue = finance.FV(tvmParams.RATE, tvmParams.PERIOD, tvmParams.PMT, tvmParams.PV, mode);
                setFutureValue(calculatedValue.toFixed(2))
                break;
            case 'RATE':
                calculatedValue = finance.RATE(tvmParams.PERIOD, tvmParams.PMT, tvmParams.PV, tvmParams.FV, mode);
                setAnnualRate(calculatedValue.toFixed(2))
                break;
            case 'PERIOD':
                calculatedValue = finance.NPER(tvmParams.RATE, tvmParams.PMT, tvmParams.PV, tvmParams.FV, mode);
                setPeriods(calculatedValue.toFixed(2))
                break;
            default:
                break;
        }

        setResult(calculatedValue);
    };

    const handleResetField = () => {
        setActiveButton('PV')
        setPresentValue('')
        setPayments('')
        setFutureValue('')
        setAnnualRate('')
        setPeriods('')
        setMode(0)
        setResult('')
        setButtonParams('PV')
        setCompoundingPeriods('monthly')
        setCompoundingRate('annually')
    }

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>TVM Advanced Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <div className="d-flex justify-content-center mb-3">
                            <button className='btn btn-sm btn-primary me-2' onClick={() => handleButtonClick('PV')}>PV</button>
                            <button className='btn btn-sm btn-primary me-2' onClick={() => handleButtonClick('PMT')}>PMT</button>
                            <button className='btn btn-sm btn-primary me-2' onClick={() => handleButtonClick('FV')}>FV</button>
                            <button className='btn btn-sm btn-primary me-2' onClick={() => handleButtonClick('RATE')}>RATE</button>
                            <button className='btn btn-sm btn-primary me-2' onClick={() => handleButtonClick('PERIOD')}>PERIOD</button>
                        </div>
                        {buttonParams !== 'PV' && <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Present Value</span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Value"
                                value={presentValue}
                                onChange={(e) => setPresentValue(e.target.value)}
                            />
                        </div>}
                        {buttonParams !== 'PMT' &&
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Payments</span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Value"
                                    value={payments}
                                    onChange={(e) => setPayments(e.target.value)}
                                />
                            </div>
                        }
                        {buttonParams !== 'FV' &&
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Future Value</span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Value"
                                    value={futureValue}
                                    onChange={(e) => setFutureValue(e.target.value)}
                                />
                            </div>
                        }
                        {buttonParams !== 'RATE' &&
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Annual Rate(%)</span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Value"
                                    value={annualRate}
                                    onChange={(e) => setAnnualRate(e.target.value)}
                                />
                                <select className="form-select form-select-sm" value={compoundingRate} onChange={(e) => setCompoundingRate(e.target.value)}>
                                    <option value="monthly">Monthly</option>
                                    <option value="annually">Annually</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="semiannually">Semiannually</option>
                                    <option value="semimonthly">Semimonthly</option>
                                    <option value="biweekly">Biweekly</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="daily">Daily</option>
                                </select>
                            </div>
                        }
                        {buttonParams !== 'PERIOD' &&
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Periods</span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Value"
                                    value={periods}
                                    onChange={(e) => setPeriods(e.target.value)}
                                />
                                <select className="form-select form-select-sm" value={compoundingPeriods} onChange={(e) => setCompoundingPeriods(e.target.value)}>
                                    <option value="monthly">Monthly</option>
                                    <option value="annually">Annually</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="semiannually">Semiannually</option>
                                    <option value="semimonthly">Semimonthly</option>
                                    <option value="biweekly">Biweekly</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="daily">Daily</option>
                                </select>
                            </div>
                        }
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Mode</span>
                            </div>
                            <div className="form-check form-check-inline ms-3 mt-2">
                                <input className="form-check-input" type="radio" name="mode" id="endMode" value="end" checked={mode === 0} onChange={() => setMode(0)} />
                                <label className="form-check-label" htmlFor="endMode">End</label>
                            </div>
                            <div className="form-check form-check-inline mt-2">
                                <input className="form-check-input" type="radio" name="mode" id="beginningMode" value="beginning" checked={mode === 1} onChange={() => setMode(1)} />
                                <label className="form-check-label" htmlFor="beginningMode">Beginning</label>
                            </div>
                        </div>
                        <div>
                            <button className='btn btn-sm btn-success' onClick={() => handleCalculate(activeButton)}>Calculate</button>
                            <button className='btn btn-sm btn-primary ms-2' onClick={() => handleResetField()}>Reset</button>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className='card-text'><strong>{activeButton} =<span className='text-success'> {result}</span></strong></div>
                    {result &&
                        <div className='mt-1'>
                            <button className='btn btn-sm btn-success' onClick={() => handlesaveHistory(true)}>Save</button>
                        </div>
                    }
                </div>

                {/* view TVM Data */}
                <Modal show={props.isModalOpen} onHide={props.closeModal} dialogClassName="modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <Modal.Header>
                        <Modal.Title>{savedTVMHistory.length > 0 ? 'My TVM' : 'Save TVM'}</Modal.Title>
                        <button className="btn card-text" onClick={props.closeModal}>
                            <span aria-hidden="true"><h1>&times;</h1></span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        {savedTVMHistory.length > 0 ? (
                            <>
                                <button className='btn btn-danger mb-2 btn-sm' onClick={handleDeleteHistory}>Clear All history</button>
                                <Table striped bordered hover className={`${selectedTheme === 'light' ? 'table-light' : 'table-dark'}`}>
                                    <thead>
                                        <tr>
                                            <th>PV</th>
                                            <th>PMT</th>
                                            <th>FV</th>
                                            <th>I(%)</th>
                                            <th>N</th>
                                            <th>Date</th>
                                            <th>Note</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {savedTVMHistory.map((tvm, index) => (
                                            <tr key={index}>
                                                <td>{tvm.PV}</td>
                                                <td>{tvm.PMT}</td>
                                                <td>{tvm.FV}</td>
                                                <td>{tvm.RATE}</td>
                                                <td>{tvm.PERIOD}</td>
                                                <td>{tvm.timestamp}</td>
                                                <td>

                                                    <Button variant="primary" className='btn btn-sm ms-2' onClick={() => handleEditNote(index)}>
                                                        <svg width="20" height="20" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_149_296)">
                                                                <path d="M316.187 85.996L34.4785 367.726C33.06 369.148 32.049 370.925 31.551 372.871L0.325322 498.201C-0.133929 500.061 -0.105785 502.008 0.407037 503.854C0.919858 505.699 1.90002 507.382 3.25286 508.738C5.3308 510.809 8.14425 511.973 11.078 511.976C11.983 511.975 12.8846 511.864 13.7623 511.643L139.092 480.413C141.041 479.923 142.82 478.913 144.238 477.49L425.972 195.78L316.187 85.996ZM495.763 47.5825L464.405 16.2248C443.446 -4.73375 406.917 -4.71296 385.983 16.2248L347.57 54.6383L457.351 164.418L495.763 126.005C506.232 115.541 511.999 101.611 511.999 86.7965C511.999 71.9821 506.232 58.0524 495.763 47.5825Z" fill="white" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_149_296">
                                                                    <rect width="512" height="512" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </Button>
                                                    &nbsp; &nbsp;
                                                    {tvm.note}
                                                </td>
                                                <td>
                                                    <Button variant="danger" className='btn btn-sm' onClick={() => handleDelete(index)}>
                                                        <svg width="20" height="20" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_149_299)">
                                                                <path d="M486.4 76.8H25.6C18.8105 76.8 12.299 79.4971 7.49807 84.2981C2.69713 89.099 0 95.6105 0 102.4C0 109.19 2.69713 115.701 7.49807 120.502C12.299 125.303 18.8105 128 25.6 128H76.8V435.2C76.8 455.569 84.8914 475.103 99.2942 489.506C113.697 503.909 133.231 512 153.6 512H358.4C378.769 512 398.303 503.909 412.706 489.506C427.109 475.103 435.2 455.569 435.2 435.2V128H486.4C493.19 128 499.701 125.303 504.502 120.502C509.303 115.701 512 109.19 512 102.4C512 95.6105 509.303 89.099 504.502 84.2981C499.701 79.4971 493.19 76.8 486.4 76.8ZM230.4 358.4C230.4 365.19 227.703 371.701 222.902 376.502C218.101 381.303 211.59 384 204.8 384C198.01 384 191.499 381.303 186.698 376.502C181.897 371.701 179.2 365.19 179.2 358.4V230.4C179.2 223.61 181.897 217.099 186.698 212.298C191.499 207.497 198.01 204.8 204.8 204.8C211.59 204.8 218.101 207.497 222.902 212.298C227.703 217.099 230.4 223.61 230.4 230.4V358.4ZM332.8 358.4C332.8 365.19 330.103 371.701 325.302 376.502C320.501 381.303 313.99 384 307.2 384C300.41 384 293.899 381.303 289.098 376.502C284.297 371.701 281.6 365.19 281.6 358.4V230.4C281.6 223.61 284.297 217.099 289.098 212.298C293.899 207.497 300.41 204.8 307.2 204.8C313.99 204.8 320.501 207.497 325.302 212.298C330.103 217.099 332.8 223.61 332.8 230.4V358.4ZM204.8 51.2H307.2C313.99 51.2 320.501 48.5029 325.302 43.7019C330.103 38.901 332.8 32.3895 332.8 25.6C332.8 18.8105 330.103 12.299 325.302 7.49807C320.501 2.69713 313.99 0 307.2 0H204.8C198.01 0 191.499 2.69713 186.698 7.49807C181.897 12.299 179.2 18.8105 179.2 25.6C179.2 32.3895 181.897 38.901 186.698 43.7019C191.499 48.5029 198.01 51.2 204.8 51.2Z" fill="white" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_149_299">
                                                                    <rect width="512" height="512" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </>
                        ) : (
                            <p>No saved TVM.</p>
                        )}
                    </Modal.Body>
                </Modal>

                {/* Modal for editing the note */}
                <Modal show={editMode} onHide={handleCloseModal} dialogClassName="modal-dialog-centered modal-dialog-scrollable">
                    <Modal.Header>
                        <Modal.Title>Edit Note</Modal.Title>
                        <button className="btn card-text" onClick={handleCloseModal}>
                            <span aria-hidden="true"><h1>&times;</h1></span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formNote">
                            <Form.Label>Note</Form.Label>
                            <Form.Control type="text" value={editedNote} onChange={(e) => setEditedNote(e.target.value)} />
                        </Form.Group>
                        <Button className='mt-3' variant="success" onClick={handleSaveNote}>Save</Button>
                    </Modal.Body>
                </Modal>

            </div>
        </div>
    );
};

export default TvmCalculatorAdvanced;
