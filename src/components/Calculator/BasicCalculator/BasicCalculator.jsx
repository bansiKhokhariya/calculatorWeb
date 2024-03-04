import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { jsPDF } from "jspdf";
import BasicCalculatorPdf from '../../PDF/BasicCalculatorPdf'
import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';

const BasicCalculator = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [equalPressed, setEqualPressed] = useState(false);
    const [savedResults, setSavedResults] = useState([]);
    const [showShareButton, setShowShareButton] = useState(false);
    const [currentCalculation, setCurrentCalculation] = useState('');

    useEffect(() => {
        try {
            const savedData = JSON.parse(localStorage.getItem('savedResults')) || [];
            setSavedResults(savedData);
        } catch (error) {
            setSavedResults([]);
        }
    }, [props.isModalOpen]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;
            if (/^[0-9+\-*/.%]$/.test(key)) {
                handleClick(key);
            } else if (key === 'Delete') {
                handleAC();
            } else if (key === 'Backspace') {
                handleDelete();
            } else if (key === 'Enter' || key === '=') {
                handleEqual();
            } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                handleClick(key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputValue]);

    const handleClick = (button) => {
        if (equalPressed) {
            setInputValue('');
            setEqualPressed(false);
        }
        setInputValue(inputValue + button);
    };

    const handleDelete = () => {
        setInputValue(inputValue.slice(0, -1));
    };

    const handleAC = () => {
        setInputValue('');
        setShowShareButton(false)
    };

    const handleEqual = () => {

        if (inputValue.trim() !== '') {
            let expression = inputValue;
            expression = expression.replace(/%/g, '/100*');
            if (/[+\-*/]$/.test(expression)) {
                expression = expression.slice(0, -1);
            }
            const result = eval(expression);
            setInputValue(result.toString());
            setEqualPressed(true);

            setShowShareButton(true)
            setCurrentCalculation(`${expression} = ${result.toString()}`)


            // Save the expression and result in local storage array
            const updatedResults = [`${expression} = ${result.toString()}`, ...savedResults];
            localStorage.setItem('savedResults', JSON.stringify(updatedResults));
            setSavedResults(updatedResults);
        }
    };

    const handleDeleteHistory = () => {
        localStorage.removeItem('savedResults');
        setSavedResults([]);
    };

    const handleShareClick = (savedResults) => {
        const doc = new jsPDF();
        let y = 20;
        doc.setFontSize(30);
        doc.text("My History", 10, y);
        y += 10;

        savedResults.forEach((result, index) => {
            y += 15;
            const x = 10;
            const width = 100;
            const height = 15;
            doc.rect(x, y, width, height);
            doc.setFontSize(12);
            doc.text(`Calculation ${index + 1}: ${result}`, x + 2, y + 5);
        });

        const pdfData = doc.output();
        const blob = new Blob([pdfData], { type: "application/pdf" });

        if (navigator.share) {
            navigator.share({
                files: [new File([blob], "history.pdf", { type: "application/pdf" })],
                title: "My History"
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

    const SingleCalculationShare = (current) => {
        if (navigator.share) {
            navigator.share({
                title: "Calculation",
                text: current
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
    }

    return (
        <div className='bootstrap-card-section'>
            <div>
                <div className="main-container border">
                    <div>
                        {showShareButton && <button className='btn btn-sm bg-success card-text mb-3' onClick={() => SingleCalculationShare(currentCalculation)}>Share Current Calculation</button>}
                        <input type="text" placeholder="0" className="container__input bg-light card-text border-0" value={inputValue} readOnly />
                        <div className="calculator-buttons">
                            <button className="btn btn-sm bg-light card-text" id="ac" onClick={handleAC}>AC</button>
                            <button className="btn btn-sm bg-light card-text" id="del" onClick={handleDelete}>DEL</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('%')}>%</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('/')}>/</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('7')}>7</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('8')}>8</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('9')}>9</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('*')}>*</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('4')}>4</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('5')}>5</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('6')}>6</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('-')}>-</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('1')}>1</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('2')}>2</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('3')}>3</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('+')}>+</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('00')}>00</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('0')}>0</button>
                            <button className="btn btn-sm bg-light card-text" onClick={() => handleClick('.')}>.</button>
                            <button className='btn btn-sm bg-primary card-text' id="igual" onClick={handleEqual}>=</button>
                        </div>
                    </div>
                </div>
                <Modal show={props.isModalOpen} onHide={props.closeModal} dialogClassName="modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <Modal.Header closeButton>
                        <Modal.Title>My History</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {savedResults.length > 0 && (
                            <div className='mb-3'>
                                <button className='btn btn-danger btn-sm' onClick={handleDeleteHistory}>Clear All History</button>
                                <button className='btn btn-success btn-sm ms-1' onClick={() => handleShareClick(savedResults)}>Share All History</button>
                            </div>
                        )}

                        {savedResults.length > 0 ? (
                            <div className="card-container">
                                {savedResults.map((result, index) => (
                                    index % 3 === 0 && ( // Start a new row every three cards
                                        <div className="row" key={index / 3}>
                                            {savedResults.slice(index, index + 3).map((item, i) => (
                                                <div className="col-md-4" key={index + i}>
                                                    <div className="card bg-light mb-2">
                                                        <div className="card-body">
                                                            <h5 className="card-title card-text">Calculation {index + i + 1}</h5>
                                                            <p className="card-text">{item}</p>
                                                            <div>
                                                                <button className="btn btn-danger btn-sm" onClick={() => {
                                                                    const updatedResults = savedResults.filter((_, idx) => idx !== index + i);
                                                                    localStorage.setItem('savedResults', JSON.stringify(updatedResults));
                                                                    setSavedResults(updatedResults);
                                                                }}>Delete</button>
                                                                <button className='btn btn-success btn-sm ms-1' onClick={() => SingleCalculationShare(item)}>Share</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </div>
                        ) : (
                            <p>No saved History.</p>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default BasicCalculator;




