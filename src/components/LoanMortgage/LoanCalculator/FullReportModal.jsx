import React, { useRef } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';

const FullReportModal = ({ show, handleClose, amortizationSchedule, pieChartData, loanAmount, interestRate, loanTermYears, result }) => {

    const modalContentRef = useRef(null);

    const handleShareClick = async () => {
        const pdf = new jsPDF();
        let y = 20;

        pdf.setFontSize(30);
        pdf.text("Loan Calculator", 10, y);
        y += 20;

        pdf.setFontSize(20);
        pdf.text("Inputs", 10, y);
        y += 10;

        pdf.setFontSize(14);
        pdf.text("Loan Amount: " + loanAmount, 10, y);
        y += 7;
        pdf.text("Interest Rate: " + interestRate + "%", 10, y);
        y += 7;
        pdf.text("Loan Term: " + loanTermYears + " years", 10, y);
        y += 7;

        // Draw horizontal line after input details
        pdf.line(10, y, 200, y);
        y += 10;

        pdf.setFontSize(20);
        pdf.text("Results", 10, y);
        y += 10;

        pdf.setFontSize(14);
        pdf.text("Monthly Payment: " + result.monthlyPayment, 10, y);
        y += 7;
        pdf.text("Total Payment: " + result.totalPayment, 10, y);
        y += 7;
        pdf.text("Total Interest: " + result.totalInterest, 10, y);
        y += 7;
        pdf.text("Annual Payment: " + result.annualPayment, 10, y);
        y += 7;

        pdf.line(10, y, 200, y);
        y += 10;

        pdf.setFontSize(20);
        pdf.text("Amortization Schedule", 10, y);
        y += 10;

        // Set up table headers
        const headers = [['No.', 'Monthly Payment', 'Principal Payment', 'Interest Payment', 'Balance']];

        // Set up table data
        const data = amortizationSchedule.map(entry => [
            entry.month,
            entry.monthlyPayment,
            entry.principalPayment,
            entry.interestPayment,
            entry.remainingBalance
        ]);

        // AutoTable configuration
        const options = {
            margin: { top: 10 },
        };

        // Add table to PDF
        pdf.autoTable({
            head: headers,
            body: data,
            startY: y, // Start y position after the details
            didDrawPage: function (data) {
                // Add footer with page number
                pdf.text('Page ' + pdf.internal.getNumberOfPages(), data.settings.margin.left, pdf.internal.pageSize.height - 10);
            },
            ...options
        });

        // Save the PDF
        pdf.save('amortization_schedule.pdf');
    };


    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-centered modal-lg modal-dialog-scrollable">
            <Modal.Header closeButton>
                <Modal.Title>Full Report</Modal.Title>
            </Modal.Header>
            <Modal.Body id="fullReportModalContent">
                <div ref={modalContentRef}>
                    <div className='mb-3'>
                        <h3>Inputs</h3>
                        <div>
                            <div><strong>Loan Amount : {loanAmount}</strong></div>
                            <div><strong>Interest Rate : {interestRate}</strong></div>
                            <div><strong>Loan Term Years : {loanTermYears} years</strong></div>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <h3>Results</h3>
                        <div>
                            <div><strong>Monthly Payment : {result.monthlyPayment}</strong></div>
                            <div><strong>Total Payment : {result.totalPayment}</strong></div>
                            <div><strong>Total Interest  : {result.totalInterest} </strong></div>
                            <div><strong>Annual Payment  : {result.annualPayment} </strong></div>
                        </div>
                    </div>
                    <div className='pieChart-box'>
                        <Doughnut data={pieChartData} />
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Monthly Payment</th>
                                <th>Principal Payment</th>
                                <th>Interest Payment</th>
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
                </div>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <button className='btn btn-success btn-sm' onClick={handleShareClick}>Share as PDF</button>
            </Modal.Footer>
        </Modal>
    );
};

export default FullReportModal;

