import React, { useState, useEffect } from 'react';
import { Modal, Table } from 'react-bootstrap';
import jsPDF from 'jspdf';

const AmortizationModal = ({ show, handleClose, presentValue, payments, futureValue, periods, annualRate }) => {
    const [amortizationSchedule, setAmortizationSchedule] = useState([]);

    useEffect(() => {
        const calculateAmortization = () => {
            // Convert input values to numbers
            const PMT = parseFloat(payments);
            const n = parseInt(periods);
            const r = parseFloat(annualRate) / 100; // Convert annual rate to a decimal

            // Initialize variables
            let balance = parseFloat(presentValue); // Start with the initial present value
            let period = 1;

            // Array to store the amortization schedule
            const amortizationSchedule = [];

            // Calculate PV and FV for each period
            while (period <= n) {
                // Calculate interest for the period
                const interest = balance * r;

                const FV1 = balance + interest;
                const FV = FV1 + PMT;
                const absoluteFV = Math.abs(FV);

                amortizationSchedule.push({
                    period: period,
                    PV: balance.toFixed(2),
                    PMT: PMT.toFixed(2),
                    FV: absoluteFV.toFixed(2),
                });

                // Update balance (PV) for the next period
                balance = FV1 + PMT;

                // Increment period counter
                period++;
            }

            return amortizationSchedule;
        };
        const schedule = calculateAmortization();
        setAmortizationSchedule(schedule);
    }, [presentValue, payments, futureValue, periods]);

    const sharePDF = () => {
        const doc = new jsPDF();
        doc.text("Amortization Schedule", 10, 10);
        doc.autoTable({ html: '#amortizationTable' });

        const pdfData = doc.output();
        const blob = new Blob([pdfData], { type: "application/pdf" });

        if (navigator.share) {
            navigator.share({
                files: [new File([blob], "tvm_amortization_schedule.pdf", { type: "application/pdf" })],
                title: "TVM Amortization Schedule"
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

    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-centered modal-lg modal-dialog-scrollable">
            <Modal.Header closeButton>
                <Modal.Title>Amortization Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table id="amortizationTable" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>Present Value (PV)</th>
                            <th>Payment (PMT)</th>
                            <th>Future Value (FV)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {amortizationSchedule.map((row, index) => (
                            <tr key={index}>
                                <td>{row.period}</td>
                                <td>{row.PV}</td>
                                <td>{row.PMT}</td>
                                <td>{row.FV}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <button className='btn btn-success btn-sm' onClick={sharePDF}>Share as PDF</button>
            </Modal.Footer>
        </Modal>
    );
};

export default AmortizationModal;
