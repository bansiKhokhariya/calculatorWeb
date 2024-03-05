// import React, { useRef } from 'react';
// import { Modal, Table } from 'react-bootstrap';
// import { Doughnut } from 'react-chartjs-2';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';

// const FullReportModal = ({ show, handleClose, amortizationSchedule, pieChartData }) => {
//     const modalContentRef = useRef(null);

//     const handleShareClick = async () => {
//         try {
//             const modalContent = modalContentRef.current;

//             // Get the dimensions of the modal content
//             const { width, height } = modalContent.getBoundingClientRect();

//             // Create a new jsPDF instance
//             const pdf = new jsPDF('p', 'pt', [width, height]);

//             // Render modal content to canvas
//             const canvas = await html2canvas(modalContent, { scale: 1 });

//             // Convert canvas to image data
//             const imageData = canvas.toDataURL('image/jpeg');

//             // Add captured image to PDF
//             pdf.addImage(imageData, 'JPEG', 0, 0, width, height);

//             // Save the PDF
//             pdf.save('full_report.pdf');
//         } catch (error) {
//             console.error('Error generating PDF:', error);
//             // Handle error (e.g., show error message to user)
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-centered modal-lg modal-dialog-scrollable">
//             <Modal.Header closeButton>
//                 <Modal.Title>Amortization Schedule</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div ref={modalContentRef}>
//                     <div className='pieChart-box'>
//                         <Doughnut data={pieChartData} />
//                     </div>
//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th>No.</th>
//                                 <th>Monthly Payment</th>
//                                 <th>Principal Payment</th>
//                                 <th>Interest Payment</th>
//                                 <th>Balance</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {amortizationSchedule.map((entry, index) => (
//                                 <tr key={index}>
//                                     <td>{entry.month}</td>
//                                     <td>{entry.monthlyPayment}</td>
//                                     <td>{entry.principalPayment}</td>
//                                     <td>{entry.interestPayment}</td>
//                                     <td>{entry.remainingBalance}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//                 <button onClick={handleShareClick}>Share as PDF</button>
//                 <button onClick={handleClose}>Close</button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default FullReportModal;



import React , {useRef} from 'react';
import { Modal, Table } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const FullReportModal = ({ show, handleClose, amortizationSchedule, pieChartData }) => {

    const modalContentRef = useRef(null);

    const handleShareClick = async () => {
        const modalContent = modalContentRef.current;

        // Get the dimensions of the modal content
        const { width, height } = modalContent.getBoundingClientRect();

        // Create a new jsPDF instance
        const pdf = new jsPDF('p', 'pt', [width, height]);

        // Render modal content to canvas
        const canvas = await html2canvas(modalContent, { scale: 1 });

        // Convert canvas to image data
        const imageData = canvas.toDataURL('image/jpeg');

        // Add captured image to PDF
        pdf.addImage(imageData, 'JPEG', 0, 0, width, height);


        // Save the PDF
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        try {
            // Check for Web Share API support
            if (navigator.share) {
                // Browser supports native share API
                await navigator.share({
                    files: [new File([pdfBlob], "full_report.pdf", { type: "application/pdf" })],
                    title: "Full Report PDF"
                });
                console.log('Thanks for sharing!');
            } else {
                // Fallback: Provide the PDF file URL for manual sharing
                alert("Your browser does not support the share function. Please manually share the PDF file.");
                console.log("Full report PDF file URL:", pdfUrl);
            }
        } catch (error) {
            console.error('Error sharing PDF:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-centered modal-lg modal-dialog-scrollable">
            <Modal.Header closeButton>
                <Modal.Title>Amortization Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body id="fullReportModalContent">
                <div  ref={modalContentRef}>
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
            <Modal.Footer>
                <button onClick={handleShareClick}>Share as PDF</button>
                <button onClick={handleClose}>Close</button>
            </Modal.Footer>
        </Modal>
    );
};

export default FullReportModal;
