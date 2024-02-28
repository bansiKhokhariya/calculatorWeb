import React, { useState, useEffect } from 'react';
import { Dropdown, Modal, Button, Table } from 'react-bootstrap';


function LoanCalculator() {

    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [loanTermYears, setLoanTermYears] = useState(0);
    const [result, setResult] = useState({});
    const [showSaveLoanModal, setShowSaveLoanModal] = useState(false);
    const [showLoanDataModal, SetShowLoanDataModal] = useState(false);
    const [loanName, setLoanName] = useState('');
    const [savedLoans, setSavedLoans] = useState([]);


    // Function to retrieve saved loan data from local storage
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('savedLoans')) || [];
        setSavedLoans(savedData);
    }, [showLoanDataModal]);

    // Function to handle loan calculation
    const calculateLoan = () => {
        const loanAmountNum = parseFloat(loanAmount);
        const interestRateNum = parseFloat(interestRate) / 100 / 12;
        const loanTermMonthsNum = parseInt(loanTermYears) * 12;

        // mortgage constant Calculations
        const mortgageConstant = (interestRateNum * Math.pow(1 + interestRateNum, loanTermMonthsNum)) /
            (Math.pow(1 + interestRateNum, loanTermMonthsNum) - 1) * 12;

        // monthly payment Calculations
        var x = Math.pow(1 + interestRateNum, loanTermMonthsNum);
        var monthlyPayment = (loanAmountNum * x * interestRateNum) / (x - 1);

        setResult({
            mortgageConstant: (mortgageConstant * 100).toFixed(2) + '%',
            monthlyPayment: (monthlyPayment.toFixed(2)),
            annualPayment: (monthlyPayment * 12).toFixed(2),
            totalPayment: (monthlyPayment * loanTermMonthsNum).toFixed(2),
            totalInterest: ((monthlyPayment * loanTermMonthsNum) - loanAmountNum).toFixed(2)
        })

    };

    // Function to handle Save Loan
    const handleSave = () => {
        const newLoanDetails = {
            name: loanName,
            amount: loanAmount,
            interestRate,
            termYears: loanTermYears
        };
        const existingLoans = JSON.parse(localStorage.getItem('savedLoans')) || [];
        const updatedLoans = [...existingLoans, newLoanDetails];
        localStorage.setItem('savedLoans', JSON.stringify(updatedLoans));
        setShowSaveLoanModal(false);
    };

    // Function to handle deleting a saved loan
    const handleDelete = (index) => {
        const updatedLoans = savedLoans.filter((loan, i) => i !== index);
        setSavedLoans(updatedLoans);
        localStorage.setItem('savedLoans', JSON.stringify(updatedLoans));
    };

    return (
        <>
            <div className='percentage-caculator-section-main'>
                <div className="percentage-caculator-section">
                    <h2 className='percentage-caculator-title'>Loan Calculator</h2>
                    <div className='percentage-caculator-main-box' >
                        <div className="conversion">

                            <div className='percentage-button-section'>
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Action
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setShowSaveLoanModal(true)}>Save</Dropdown.Item>
                                        <Dropdown.Item onClick={() => SetShowLoanDataModal(true)}>My Loans</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <div className='percentage-input-box'>
                                <label className='percentage-caculator-lable' htmlFor="loanamount">Loan Amount : </label>
                                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                    <input
                                        className='percentage-caculator-input'
                                        type="text"
                                        name=""
                                        id="loanamount"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(e.target.value.replace(/\D/g, ''))}
                                    />
                                    &nbsp;
                                    &nbsp;
                                </div>
                            </div>
                            <div className='percentage-input-box'>
                                <label className='percentage-caculator-lable' htmlFor="interestRate">Interest Rate :</label>
                                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                    <input
                                        className='percentage-caculator-input'
                                        type="text"
                                        name=""
                                        id="interestRate"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(e.target.value.replace(/\D/g, ''))}
                                    />
                                    <div style={{ fontWeight: '600' }}>
                                        %
                                    </div>
                                </div>
                            </div>
                            <div className='percentage-input-box'>
                                <label className='percentage-caculator-lable' htmlFor="loanTermYears">Years To Pay :</label>
                                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                    <input
                                        className='percentage-caculator-input'
                                        type="text"
                                        name=""
                                        id="loanTermYears"
                                        value={loanTermYears}
                                        onChange={(e) => setLoanTermYears(e.target.value.replace(/\D/g, ''))}
                                    />
                                    &nbsp;
                                    &nbsp;
                                </div>
                            </div>

                            <div className='percentage-button-section'>
                                <div className='percentage-button green-button' onClick={calculateLoan}>
                                    Calculate
                                </div>
                            </div>

                            <div className='percentage-result-section'>
                                <div className='result-value'>
                                    Total Payment  :  <span className='result-value-span-green'> {result.totalPayment}</span>
                                </div>
                                <div className='result-value'>
                                    Annual Payment  :  <span className='result-value-span-green'> {result.annualPayment}</span>
                                </div>
                                <div className='result-value'>
                                    Monthly Payment  :  <span className='result-value-span-green'> {result.monthlyPayment}</span>
                                </div>
                                <div className='result-value'>
                                    Total Interest  :  <span className='result-value-span-green'> {result.totalInterest}</span>
                                </div>
                                <div className='result-value'>
                                    Mortgage Constant  :  <span className='result-value-span-green'> {result.mortgageConstant}</span>
                                </div>
                            </div>

                            {result.totalPayment && (
                                <div className='percentage-button-section'>
                                    <div className='percentage-button blue-button'>
                                        View Full Report
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>


                    {/* view Loan Data */}
                    <Modal show={showLoanDataModal} onHide={() => SetShowLoanDataModal(false)} dialogClassName="modal-dialog-centered modal-lg modal-dialog-scrollable">
                        <Modal.Header closeButton>
                            <Modal.Title>{savedLoans.length > 0 ? 'My Loans' : 'Save Loan'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {savedLoans.length > 0 ? (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Amount</th>
                                            <th>Interest Rate</th>
                                            <th>Term (Years)</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {savedLoans.map((loan, index) => (
                                            <tr key={index}>
                                                <td>{loan.name}</td>
                                                <td>{loan.amount}</td>
                                                <td>{loan.interestRate}</td>
                                                <td>{loan.termYears}</td>
                                                <td>
                                                    <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p>No saved loans.</p>
                            )}
                        </Modal.Body>
                    </Modal>

                    {/* Modal for saving loan details */}
                    <Modal show={showSaveLoanModal} onHide={() => setShowSaveLoanModal(false)} dialogClassName="modal-dialog-centered  bd-example-modal-sm">
                        <Modal.Header closeButton>
                            <Modal.Title>Save Loan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Loan Name:</label>
                            <input type="text" value={loanName} onChange={(e) => setLoanName(e.target.value)} />
                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="primary" onClick={handleSave}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div >
        </>
    );
}

export default LoanCalculator;
