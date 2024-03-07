import React, { useState, useEffect } from 'react';
import Finance from 'tvm-financejs';
import AmortizationModal from './AmortizationModal';
import { Dropdown, Modal, Button, Table, Form } from 'react-bootstrap';

const TvmCalculator = (props) => {
    const [activeButton, setActiveButton] = useState('PV');
    const [presentValue, setPresentValue] = useState('');
    const [payments, setPayments] = useState('');
    const [futureValue, setFutureValue] = useState('');
    const [annualRate, setAnnualRate] = useState('');
    const [periods, setPeriods] = useState('');
    const [mode, setMode] = useState(0);
    const [result, setResult] = useState('');
    const [buttonParams, setButtonParams] = useState('PV');
    const [showAmortizationModal, setShowAmortizationModal] = useState(false);
    const [savedTVMHistory, setSavedTVMHistory] = useState([]);
    const [editMode, setEditMode] = useState(false); // Track whether edit mode is active
    const [editedNote, setEditedNote] = useState(''); // Store the edited note
    const [editIndex, setEditIndex] = useState(-1);

    // Function to retrieve saved tvm data from local storage
    useEffect(() => {
        try {
            const savedData = JSON.parse(localStorage.getItem(props.historyName)) || [];
            setSavedTVMHistory(savedData);
        } catch (error) {
            setSavedTVMHistory([]);
        }
    }, [props.isModalOpen]);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        setButtonParams(buttonName);
        setResult('')
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


        const newCalculation = {
            PV: presentValue,
            PMT: payments,
            FV: futureValue,
            RATE: annualRate,
            PERIOD: periods,
            mode: mode === 0 ? 'End' : 'Beginning',
            timestamp: new Date()
        };

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

        setResult(calculatedValue.toFixed(2));
    };

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
        const tvmHistory = JSON.parse(localStorage.getItem('tvmHistory')) || [];
        const newCalculation = {
            PV: presentValue,
            PMT: payments,
            FV: futureValue,
            RATE: annualRate,
            PERIOD: periods,
            note: '',
            timestamp: formatDate(new Date()) // Format the date
        };
        tvmHistory.push(newCalculation);
        localStorage.setItem('tvmHistory', JSON.stringify(tvmHistory));
    }

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

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>TVM Calculator</h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <div className="d-flex justify-content-center mb-3">
                            <button className='btn btn-sm btn-primary me-1' onClick={() => handleButtonClick('PV')}>PV</button>
                            <button className='btn btn-sm btn-primary me-1' onClick={() => handleButtonClick('PMT')}>PMT</button>
                            <button className='btn btn-sm btn-primary me-1' onClick={() => handleButtonClick('FV')}>FV</button>
                            <button className='btn btn-sm btn-primary me-1' onClick={() => handleButtonClick('RATE')}>RATE</button>
                            <button className='btn btn-sm btn-primary me-1' onClick={() => handleButtonClick('PERIOD')}>PERIOD</button>
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
                            </div>
                        }
                        <div>
                            <button className='btn btn-sm btn-success' onClick={() => handleCalculate(activeButton)}>Calculate</button>
                            <button className='btn btn-sm btn-primary ms-2' onClick={() => handleResetField()}>Reset</button>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <p className='card-text'><strong>{activeButton} =<span className='text-success'> {result}</span></strong></p>

                    {result &&
                        <div>
                            <button className='btn btn-sm btn-primary' onClick={() => setShowAmortizationModal(true)}>Amortization</button>
                            <button className='btn btn-sm btn-success ms-2' onClick={() => handlesaveHistory(true)}>Save</button>
                        </div>
                    }
                </div>

                {/* view TVM Data */}
                <Modal show={props.isModalOpen} onHide={props.closeModal} dialogClassName="modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <Modal.Header closeButton>
                        <Modal.Title>{savedTVMHistory.length > 0 ? 'My TVM' : 'Save TVM'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {savedTVMHistory.length > 0 ? (
                            <>
                                <button className='btn btn-danger mb-2 btn-sm' onClick={handleDeleteHistory}>Clear All history</button>
                                <Table striped bordered hover>
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
                                                <td>{tvm.note}
                                                    <Button variant="primary" className='btn btn-sm ms-2' onClick={() => handleEditNote(index)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" /></svg>
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button variant="danger" className='btn btn-sm' onClick={() => handleDelete(index)}>🗑</Button>
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
                <Modal show={editMode} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formNote">
                            <Form.Label>Note</Form.Label>
                            <Form.Control type="text" value={editedNote} onChange={(e) => setEditedNote(e.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleSaveNote}>Save</Button>
                    </Modal.Footer>
                </Modal>

                <AmortizationModal
                    show={showAmortizationModal}
                    handleClose={() => setShowAmortizationModal(false)}
                    presentValue={presentValue}
                    payments={payments}
                    futureValue={futureValue}
                    periods={periods}
                    annualRate={annualRate}
                />
            </div>
        </div>
    );
};

export default TvmCalculator;
