import React, { useState, useEffect } from 'react';
import { Dropdown, Modal, Button, Table } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import FullReportModal from './FullReportModal'

ChartJS.register(ArcElement, Tooltip, Legend);


function LoanCalculator(props) {

    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [loanTermYears, setLoanTermYears] = useState(0);
    const [result, setResult] = useState({});
    const [showSaveLoanModal, setShowSaveLoanModal] = useState(false);
    const [showLoanDataModal, setShowLoanDataModal] = useState(false);
    const [showFullReportModal, setShowFullReportModal] = useState(false);
    const [loanName, setLoanName] = useState('');
    const [savedLoans, setSavedLoans] = useState([]);
    const [amortizationSchedule, setAmortizationSchedule] = useState([]);
    const [pieChartData, setPieChartData] = useState({});


    // Function to retrieve saved loan data from local storage
    useEffect(() => {
        try {
            const savedData = JSON.parse(localStorage.getItem(props.historyName)) || [];
            setSavedLoans(savedData);
        } catch (error) {
            setSavedLoans([]);
        }
    }, [props.isModalOpen]);

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

        handleSave();

    };

    // Function to handle Save Loan
    const handleSave = () => {
        const newLoanDetails = {
            // name: loanName,
            amount: loanAmount,
            interestRate,
            termYears: loanTermYears
        };
        const existingLoans = JSON.parse(localStorage.getItem(props.historyName)) || [];
        const updatedLoans = [...existingLoans, newLoanDetails];
        localStorage.setItem(props.historyName, JSON.stringify(updatedLoans));
        setShowSaveLoanModal(false);
    };

    // Function to handle deleting a saved loan
    const handleDelete = (index) => {
        const updatedLoans = savedLoans.filter((loan, i) => i !== index);
        setSavedLoans(updatedLoans);
        localStorage.setItem(props.historyName, JSON.stringify(updatedLoans));
    };

    const generateAmortizationSchedule = () => {

        const loanAmountNum = parseFloat(loanAmount);
        const interestRateNum = parseFloat(interestRate) / 100 / 12;
        const loanTermMonthsNum = parseInt(loanTermYears) * 12;

        // Calculate monthly payment
        const x = Math.pow(1 + interestRateNum, loanTermMonthsNum);
        const monthlyPayment = (loanAmountNum * x * interestRateNum) / (x - 1);

        // Initialize arrays to store the schedule data
        const schedule = [];
        let remainingBalance = loanAmountNum;

        // Calculate payment details for each month
        for (let month = 1; month <= loanTermMonthsNum; month++) {
            const interestPayment = remainingBalance * interestRateNum;
            const principalPayment = monthlyPayment - interestPayment;
            remainingBalance -= principalPayment;

            // Store payment details for the current month
            schedule.push({
                month,
                monthlyPayment: monthlyPayment.toFixed(2),
                principalPayment: principalPayment.toFixed(2),
                interestPayment: interestPayment.toFixed(2),
                remainingBalance: remainingBalance.toFixed(2)
            });
        }
        setAmortizationSchedule(schedule);

        // Calculate total interest and principal payments
        let totalInterest = 0;
        let totalPrincipal = 0;
        for (let i = 0; i < schedule.length; i++) {
            totalInterest += parseFloat((schedule[i].interestPayment));
            totalPrincipal += parseFloat(schedule[i].principalPayment);
        }

        // Set state for amortization schedule and pie chart data
        setAmortizationSchedule(schedule);
        setPieChartData({
            labels: [`Interest (${totalInterest.toFixed(2)})`, `Principal (${totalPrincipal.toFixed(2)})`],
            datasets: [{
                data: [totalInterest, totalPrincipal],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
                hoverBackgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)']
            }]
        });
    };

    // const handleShareClick = () => {
    //     generateAmortizationSchedule();

    //     // Create a new jsPDF instance
    //     const pdf = new jsPDF();

    //     // Add title to the PDF
    //     pdf.text("Amortization Schedule", 10, 10);

    //     // Convert amortization schedule data to an array of arrays for the table
    //     const tableData = amortizationSchedule.map(entry => [
    //         entry.month,
    //         entry.monthlyPayment,
    //         entry.principalPayment,
    //         entry.interestPayment,
    //         entry.remainingBalance
    //     ]);

    //     // Add the table to the PDF
    //     pdf.autoTable({
    //         head: [['No.', 'Monthly Payment', 'Principal Payment', 'Interest Payment', 'Balance']],
    //         body: tableData
    //     });

    //     // Save the PDF as a Blob
    //     const pdfBlob = pdf.output('blob');

    //     // Create a URL for the Blob object
    //     const pdfUrl = window.URL.createObjectURL(pdfBlob);

    //     // Check for Web Share API support
    //     if (navigator.share) {
    //         // Browser supports native share API
    //         navigator.share({
    //             files: [new File([pdfBlob], "amortization_schedule.pdf", { type: "application/pdf" })],
    //             title: "Amortization Schedule"
    //         }).then(() => {
    //             console.log('Thanks for sharing!');
    //         }).catch((err) => {
    //             console.error(err);
    //         });
    //     } else {
    //         // Fallback: Provide the PDF file URL for manual sharing
    //         alert("Your browser does not support the share function. Please manually share the PDF file.");
    //         console.log("Amortization schedule PDF file URL:", pdfUrl);
    //     }
    // };


    // const handleShareClick = () => {
    //     generateAmortizationSchedule();

    //     // Create a new jsPDF instance
    //     const pdf = new jsPDF();

    //     // Add title to the PDF
    //     pdf.text("Amortization Schedule", 10, 10);

    //     // Convert amortization schedule data to an array of arrays for the table
    //     const tableData = amortizationSchedule.map(entry => [
    //         entry.month,
    //         entry.monthlyPayment,
    //         entry.principalPayment,
    //         entry.interestPayment,
    //         entry.remainingBalance
    //     ]);

    //     // Add the table to the PDF
    //     pdf.autoTable({
    //         head: [['No.', 'Monthly Payment', 'Principal Payment', 'Interest Payment', 'Balance']],
    //         body: tableData
    //     });

    //     // Generate data for the pie chart
    //     const labels = ['Principal Payment', 'Interest Payment'];
    //     const data = [
    //         amortizationSchedule.reduce((total, entry) => total + entry.principalPayment, 0),
    //         amortizationSchedule.reduce((total, entry) => total + entry.interestPayment, 0)
    //     ];

    //     // Create a canvas element
    //     const canvas = document.createElement('canvas');
    //     canvas.width = 400;
    //     canvas.height = 200;
    //     const ctx = canvas.getContext('2d');

    //     // Draw the pie chart using Chart.js
    //     new ChartJS(ctx, {
    //         type: 'pie',
    //         data: {
    //             labels,
    //             datasets: [{
    //                 data,
    //                 backgroundColor: ['#FF6384', '#36A2EB'],
    //                 hoverBackgroundColor: ['#FF6384', '#36A2EB']
    //             }]
    //         },
    //         options: {
    //             responsive: false
    //         }
    //     });

    //     // Convert the canvas to a PNG image
    //     const imageData = canvas.toDataURL('image/png');

    //     // Create a temporary image element
    //     const img = new Image();
    //     img.onload = () => {
    //         // Add the image to the PDF
    //         pdf.addImage(img, 'PNG', 10, 40, 200, 100);

    //         // Save the PDF
    //         pdf.save('amortization_schedule.pdf');
    //     };
    //     img.src = imageData;
    // };



    const resetInputs = () => {
        setLoanAmount('');
        setInterestRate('');
        setLoanTermYears('');
        setResult({});
    };

    return (
        <>
            <div className='bootstrap-card-section'>
                <div className="card bootstrap-card">
                    <div className="card-header text-center card-text">
                        <h1>
                            Loan Calculator
                        </h1>
                    </div>
                    <div className="card-body card-text">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Loan Amount</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Enter Amount"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value.replace(/\D/g, ''))}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Interest Rate(%) </span>
                            </div>
                            <input type="text" className="form-control" placeholder="Enter Interest Rate"
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value.replace(/\D/g, ''))}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Years To Pay </span>
                            </div>
                            <input type="text" className="form-control" placeholder="Enter Year"
                                value={loanTermYears}
                                onChange={(e) => setLoanTermYears(e.target.value.replace(/\D/g, ''))}
                            />
                        </div>

                        <div className='mb-3'>
                            <button className='btn btn-sm btn-success' onClick={calculateLoan}>Calculate</button>
                            <button className='btn btn-sm btn-primary ms-2' onClick={resetInputs}>Reset</button>
                        </div>
                        <div >
                            <div>
                                <strong>
                                    Total Payment =
                                    <span className='text-success'>
                                        &nbsp; {result.totalPayment}
                                    </span>
                                </strong>
                            </div>
                            <div>
                                <strong>
                                    Annual Payment =
                                    <span className='text-success'>
                                        &nbsp; {result.annualPayment}
                                    </span>
                                </strong>
                            </div>
                            <div>
                                <strong>
                                    Monthly Payment =
                                    <span className='text-success'>
                                        &nbsp; {result.monthlyPayment}
                                    </span>
                                </strong>
                            </div>
                            <div>
                                <strong>
                                    Total Interest =
                                    <span className='text-success'>
                                        &nbsp; {result.totalInterest}
                                    </span>
                                </strong>
                            </div>
                            <div>
                                <strong>
                                    Mortgage Constant =
                                    <span className='text-success'>
                                        &nbsp; {result.mortgageConstant}
                                    </span>
                                </strong>
                            </div>
                        </div>
                        {result.totalPayment && (
                            <div className='mt-3'>
                                <button className='btn btn-sm btn-outline-primary'
                                    onClick={() => {
                                        generateAmortizationSchedule(),
                                            setShowFullReportModal(true)
                                    }}>
                                    View Full Report
                                </button>
                                {/* <button className='btn btn-outline-success btn-sm ms-2'
                                    onClick={handleShareClick}>
                                    Share
                                </button> */}
                            </div>
                        )}

                        {/* view Loan Data */}
                        <Modal show={props.isModalOpen} onHide={props.closeModal} dialogClassName="modal-dialog-centered modal-lg modal-dialog-scrollable">
                            <Modal.Header closeButton>
                                <Modal.Title>{savedLoans.length > 0 ? 'My Loans' : 'Save Loan'}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {savedLoans.length > 0 ? (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                {/* <th>Name</th> */}
                                                <th>Amount</th>
                                                <th>Interest Rate</th>
                                                <th>Term (Years)</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {savedLoans.map((loan, index) => (
                                                <tr key={index}>
                                                    {/* <td>{loan.name}</td> */}
                                                    <td>{loan.amount}</td>
                                                    <td>{loan.interestRate}</td>
                                                    <td>{loan.termYears}</td>
                                                    <td>
                                                        <Button variant="danger" className='btn btn-sm' onClick={() => handleDelete(index)}>Delete</Button>
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

                        {/* modal full report */}

                        <FullReportModal
                            show={showFullReportModal}
                            handleClose={() => setShowFullReportModal(false)}
                            amortizationSchedule={amortizationSchedule}
                            pieChartData={pieChartData}
                        />

                        {/* <Modal show={showFullReportModal} onHide={() => setShowFullReportModal(false)} dialogClassName="modal-dialog-centered modal-lg modal-dialog-scrollable">
                            <Modal.Header closeButton>
                                <Modal.Title>Amortization Schedule</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='pieChart-box'>
                                    <Doughnut data={pieChartData} />
                                </div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Monthly Payment</th>
                                            <th>principal Payment</th>
                                            <th>interest Payment</th>
                                            <th>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {amortizationSchedule.map((entry, index) => (
                                            <tr key={index}>
                                                <td>{entry.month}</td>
                                                <td>{entry.monthlyPayment}</td>
                                                <td>{entry.principalPayment}</td>
                                                <td>{entry.interestPayment}</td>
                                                <td>{entry.remainingBalance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Modal.Body>
                        </Modal> */}
                    </div>
                </div>
            </div >
        </>
    );
}

export default LoanCalculator;
