import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from "jspdf";
import './BasicCalculator.css'

const BasicCalculator = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [equalPressed, setEqualPressed] = useState(false);
    const [savedResults, setSavedResults] = useState([]);
    const [showShareButton, setShowShareButton] = useState(false);
    const [currentCalculation, setCurrentCalculation] = useState('');
    const inputRef = useRef(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    useEffect(() => {
        try {
            const savedData = JSON.parse(localStorage.getItem('basicCalculatorHistory')) || [];
            setSavedResults(savedData);

        } catch (error) {
            setSavedResults([]);
        }
    }, []);

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
        if (button === '+/-') {
            changeSign();
            return; // Exit early after toggling the sign
        }
        if (equalPressed) {
            setInputValue(button);
            setEqualPressed(false);
        } else {
            setInputValue(inputValue + button);
        }

        // Scroll input field to show newly added text after a short delay
        setTimeout(() => {
            inputRef.current.scrollLeft = inputRef.current.scrollWidth;
        }, 50); // Adjust the delay as needed
    };


    function changeSign() {
        if (inputValue.substring(0, 1) === "-") {
            setInputValue("+" + inputValue.substring(1));
        } else {
            setInputValue("-" + inputValue);
        }
    }

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
            // Remove leading zeros from numbers
            expression = expression.replace(/\b0+(\d+)/g, '$1');
            expression = expression.replace(/%/g, '/100*');
            expression = expression.replace(/×/g, '*');
            expression = expression.replace(/÷/g, '/');
            expression = expression.replace(/√/g, 'Math.sqrt($1)');


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
            localStorage.setItem('basicCalculatorHistory', JSON.stringify(updatedResults));
            setSavedResults(updatedResults);
        }
    };

    const handleDeleteHistory = () => {
        localStorage.removeItem('basicCalculatorHistory');
        setSavedResults([]);
    };

    const handleShareClick = (savedResults) => {
        const doc = new jsPDF();
        let y = 20;
        doc.setFontSize(30);
        doc.text("My History", 10, y);
        y += 10;

        // Define table headers
        const headers = ["Calculation", "Result"];

        // Define table data
        const data = savedResults.map((result, index) => {
            return [`Calculation ${index + 1}`, result];
        });

        // Generate table using autoTable
        doc.autoTable({
            head: [headers],
            body: data,
            startY: y + 10, // Start table after the header
            margin: { top: 20 },
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
        if (current) {

            // Define blob here
            const blob = new Blob([current], { type: "text/plain" });

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
        } else {
            alert('Calculation not available')
        }
    }

    const handleSquareRoot = () => {
        let expression = inputValue;
        let result = Math.sqrt(expression);

        setInputValue(result.toString());
        setEqualPressed(true);

        setShowShareButton(true)
        setCurrentCalculation(`${expression} = ${result.toString()}`)

        // Save the expression and result in local storage array
        const updatedResults = [`${expression} = ${result.toString()}`, ...savedResults];
        localStorage.setItem('basicCalculatorHistory', JSON.stringify(updatedResults));
        setSavedResults(updatedResults);
    }

    return (
        <div className='bootstrap-card-section'>
            <div className='basic-main-screen'>
                <div className='calculator-container'>
                    <div className='calculator-textArea-section'>
                        <div className='calculator-inputarea'>
                            <div className='mt-3'>
                                <input
                                    ref={inputRef}
                                    className='calculator-input'
                                    value={inputValue}
                                    readOnly
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='d-flex flex-column align-items-center logo-section'>
                            <div className='d-flex flex-column'>
                                <svg className='ms-3 hk-logo' width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.3773 0.931263C15.3773 0.572306 15.3773 0.392827 15.4888 0.281313C15.6003 0.1698 15.7798 0.1698 16.1388 0.1698H22.0108C22.3697 0.1698 22.5492 0.1698 22.6607 0.281313C22.7722 0.392827 22.7722 0.572306 22.7722 0.931263V12.6436C22.7722 12.7915 22.7722 12.8654 22.7459 12.9325C22.7195 12.9997 22.6691 13.0538 22.5685 13.1621L17.4071 18.7145L13.0263 23.4544C12.9149 23.5749 12.8592 23.6352 12.7862 23.6671C12.7133 23.699 12.6312 23.699 12.4671 23.699H8.74372C8.38476 23.699 8.20528 23.699 8.09377 23.5875C7.98226 23.476 7.98226 23.2965 7.98226 22.9376L7.98226 17.0655C7.98226 16.7066 7.98226 16.5271 8.09377 16.4156C8.20528 16.3041 8.38476 16.3041 8.74372 16.3041L14.6158 16.3041C14.9748 16.3041 15.1543 16.3041 15.2658 16.1926C15.3773 16.081 15.3773 15.9016 15.3773 15.5426V0.931263ZM0.587219 8.7744C0.587219 8.41544 0.587219 8.23596 0.698733 8.12445C0.810247 8.01293 0.989725 8.01293 1.34868 8.01293H7.2207C7.57966 8.01293 7.75914 8.01293 7.87065 8.12445C7.98217 8.23596 7.98217 8.41544 7.98217 8.7744V31.3411C7.98217 31.7 7.98217 31.8795 7.87065 31.991C7.75914 32.1025 7.57966 32.1025 7.2207 32.1025H1.34868C0.989725 32.1025 0.810247 32.1025 0.698733 31.991C0.587219 31.8795 0.587219 31.7 0.587219 31.3411V8.7744Z" fill="#007B42" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M22.9647 27.3781C22.8695 27.4851 22.822 27.5386 22.7971 27.604C22.7722 27.6694 22.7722 27.741 22.7722 27.8841V39.4085C22.7722 39.7674 22.7722 39.9469 22.6607 40.0584C22.5492 40.1699 22.3697 40.1699 22.0108 40.1699H16.1388C15.7798 40.1699 15.6003 40.1699 15.4888 40.0584C15.3773 39.9469 15.3773 39.7674 15.3773 39.4085V24.6678C15.3773 24.5215 15.3773 24.4483 15.4032 24.3817C15.4291 24.3151 15.4785 24.2612 15.5774 24.1533L17.76 21.7723L19.2995 20.0598C19.2999 20.0595 19.2999 20.0589 19.2995 20.0585C19.2991 20.0581 19.2991 20.0575 19.2995 20.0571L19.3959 19.9526L29.6043 8.59732C29.7161 8.47304 29.7719 8.41089 29.8459 8.37792C29.9199 8.34494 30.0035 8.34494 30.1706 8.34494L38.1948 8.34494C38.9244 8.34494 39.2893 8.34494 39.3902 8.56974C39.4911 8.79455 39.2487 9.06717 38.7638 9.61242L29.8115 19.6791C29.5954 19.922 29.4874 20.0435 29.4881 20.1893C29.4888 20.3352 29.5979 20.4556 29.8163 20.6965L38.6469 30.4391C39.1423 30.9857 39.39 31.259 39.2897 31.4855C39.1893 31.7119 38.8204 31.7119 38.0827 31.7119L30.4984 31.7119C30.3352 31.7119 30.2537 31.7119 30.181 31.6803C30.1084 31.6487 30.0528 31.5891 29.9415 31.4698L25.0779 26.2546C24.8113 25.9687 24.678 25.8258 24.5098 25.8278C24.3416 25.8298 24.2117 25.9758 23.952 26.2679L22.9647 27.3781Z" fill="#007B42" />
                                </svg>
                                <div className='logo-text' style={{ color: "black" }}>
                                    <strong>HK APPS</strong>
                                </div>
                            </div>
                            <div className='contant-us-text'>Contact Us</div>
                        </div>
                    </div>
                    <div className='calculator-button-area'>
                        <div className='left-side-cal'>
                            <div className='left-side-inner-row'>
                                <div className='d-flex'>
                                    <div className='d-flex'>
                                        <div onClick={handleDelete} className=" calculator-button-gray me-2 " style={{ background: "#CBCBCB" }}>
                                            <div className='button-text-size' style={{ color: 'black' }}>
                                                CE
                                            </div>
                                        </div>
                                        <div onClick={() => handleClick('+/-')} className='calculator-button-gray me-2' style={{ background: "#CBCBCB" }}>
                                            <div className='text-white'>
                                                <svg className='social-button-svg-plus-minues' width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.299 27.4808L24.299 1.5L21.7009 0L6.70093 25.9808L9.299 27.4808ZM4.5 9.23076V13.7308H7.5V9.23076H12V6.23076H7.5V1.73076H4.5V6.23076H0V9.23076H4.5ZM32 21.7308H20V18.7308H32V21.7308Z" fill="black" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div onClick={toggleDrawer} className=' calculator-button-gray' style={{ background: "#CBCBCB" }}>
                                            <div>
                                                <svg className='ms-1 social-button-svg' width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.1613 10C21.1613 15.5161 16.6774 20 11.1613 20C6.12908 20 2.00007 16.2903 1.25814 11.4839C1.16137 10.7742 1.64522 10.1291 2.35492 10.0323C3.06458 9.93554 3.70974 10.4194 3.80651 11.1291C4.3549 14.6775 7.45167 17.4194 11.1613 17.4194C15.2581 17.4194 18.5807 14.0968 18.5807 10C18.5807 5.90326 15.2581 2.58065 11.1613 2.58065C9.12907 2.58065 7.29036 3.38708 5.93553 4.70967L5.90327 4.74194L7.54844 6.38711C7.93552 6.77419 7.93552 7.38712 7.54844 7.74193C7.3549 7.93548 7.12909 8.03225 6.87101 8.03225H2.77423C1.70972 8.03225 0.838745 7.16131 0.838745 6.09676V2.00002C0.838745 1.74194 0.935515 1.4839 1.12906 1.32259C1.51614 0.935512 2.12907 0.935512 2.48388 1.32259L4.09678 2.9355L4.12905 2.90323C5.9355 1.09678 8.41937 0 11.1613 0C16.6774 0 21.1613 4.4839 21.1613 10ZM11.1613 5.48387C10.4517 5.48387 9.871 6.06453 9.871 6.77419V10.5484L11.871 12.5484C12.3871 13.0645 13.1936 13.0645 13.7097 12.5484C14.2258 12.0323 14.2258 11.2258 13.7097 10.7097L12.4516 9.45161V6.77419C12.4516 6.06453 11.871 5.48387 11.1613 5.48387Z" fill="black" />
                                                </svg>
                                                <div className='bottom-small-text'>
                                                    <strong>History</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='right-side-inner-row-last'>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex '>
                                        <div onClick={() => handleClick('7')} className='calculator-button me-2'>
                                            <div className='button-text-size'>
                                                7
                                            </div>
                                        </div>
                                        <div onClick={() => handleClick('8')} className='calculator-button me-2'>
                                            <div className='button-text-size'>
                                                8
                                            </div>
                                        </div>
                                        <div onClick={() => handleClick('9')} className='calculator-button'>
                                            <div className='button-text-size'>
                                                9
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex mt-2'>
                                        <div onClick={() => handleClick('4')} className='calculator-button me-2'>
                                            <div className='button-text-size'>
                                                4
                                            </div>
                                        </div>
                                        <div onClick={() => handleClick('5')} className='calculator-button me-2'>
                                            <div className='button-text-size'>
                                                5
                                            </div>
                                        </div>
                                        <div onClick={() => handleClick('6')} className='calculator-button'>
                                            <div className='button-text-size'>
                                                6
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex mt-2'>
                                        <div onClick={() => handleClick('1')} className='calculator-button me-2'>
                                            <div className='button-text-size'>
                                                1
                                            </div>
                                        </div>
                                        <div onClick={() => handleClick('2')} className='calculator-button me-2'>
                                            <div className='button-text-size'>
                                                2
                                            </div>
                                        </div>
                                        <div onClick={() => handleClick('3')} className='calculator-button'>
                                            <div className='button-text-size'>
                                                3
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex mt-2'>
                                        <div onClick={() => handleClick('0')} className='calculator-button me-2'>
                                            <div className='button-text-size'>
                                                0
                                            </div>
                                        </div>
                                        <div onClick={() => handleClick('00')} className='calculator-button me-2'>
                                            <div className='button-text-size'>
                                                00
                                            </div>
                                        </div>
                                        <div onClick={() => handleClick('.')} className='calculator-button'>
                                            <div className='button-text-size'>
                                                •
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='right-side-cal'>
                            <div className='right-side-inner-row'>
                                <div className='d-flex'>
                                    <div onClick={() => SingleCalculationShare(currentCalculation)} className='calculator-button-gray me-2' style={{ background: "#CBCBCB" }}>
                                        <div>
                                            <svg className='ms-1 social-button-svg' width="18" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 14.8778C14.9267 14.8778 13.9508 15.3028 13.2316 15.9933L8.95369 13.343C9.19778 12.7773 9.33333 12.1542 9.33333 11.5C9.33333 10.8458 9.19778 10.2227 8.95364 9.65707L13.2316 7.00671C13.9508 7.69716 14.9267 8.12222 16 8.12222C18.2056 8.12222 20 6.32782 20 4.12222C20 1.91662 18.2056 0.122223 16 0.122223C13.7944 0.122223 12 1.91662 12 4.12222C12 4.77338 12.1565 5.38867 12.4337 5.93253L8.25587 8.52089C7.39916 7.49049 6.10827 6.83333 4.66667 6.83333C2.09347 6.83333 0 8.9268 0 11.5C0 14.0732 2.09347 16.1667 4.66667 16.1667C6.10827 16.1667 7.39916 15.5095 8.25587 14.4791L12.4337 17.0675C12.1565 17.6113 12 18.2266 12 18.8778C12 21.0834 13.7944 22.8778 16 22.8778C18.2056 22.8778 20 21.0834 20 18.8778C20 16.6722 18.2056 14.8778 16 14.8778Z" fill="black" />
                                            </svg>
                                            <div className='bottom-small-text'>
                                                <strong>Share</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={handleAC} className='calculator-button-green' style={{ background: "#00A42B" }}>
                                        <div className='button-text-size'>
                                            AC
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='right-side-inner-row-last'>
                                <div className='d-flex'>
                                    <div onClick={() => handleClick('÷')} className='calculator-button me-2'>
                                        <div className='button-text-size'>
                                            <strong>÷</strong>
                                        </div>
                                    </div>
                                    <div onClick={() => handleSquareRoot()} className='calculator-button'>
                                        <div className='button-text-size'>
                                            <svg className='social-button-svg-plus-minues' width="34" height="19" viewBox="0 0 34 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 11L6.5 16L12.5 2H34" stroke="white" strokeWidth="3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div onClick={() => handleClick('×')} className='calculator-button me-2'>
                                        <div className='button-text-size'>
                                            <strong> ×</strong>
                                        </div>
                                    </div>
                                    <div onClick={() => handleClick('%')} className='calculator-button'>
                                        <div className='button-text-size'>
                                            <strong> %</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div onClick={() => handleClick('+')} className='calculator-button me-2 long-button'>
                                        <div className='button-text-size align-items-stretch d-flex'>
                                            <strong> +</strong>
                                        </div>
                                    </div>
                                    <div onClick={() => handleClick('-')} className='calculator-button'>
                                        <div className='button-text-size'>
                                            <strong> −</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div onClick={handleEqual} className='calculator-button last-button'>
                                        <div className='button-text-size'>
                                            <strong> =</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
                        <div className='text-center'>
                            <svg width="44" height="5" viewBox="0 0 44 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 2.5H42" stroke="white" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div style={{ color: "white" }}>History</div>
                            <div role='button' onClick={() => handleShareClick(savedResults)}>
                                <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.8 11.8044C11.9413 11.8044 11.1606 12.1445 10.5853 12.6969L7.16295 10.5766C7.35822 10.1241 7.46667 9.6256 7.46667 9.10222C7.46667 8.57885 7.35822 8.08039 7.16292 7.62788L10.5853 5.50759C11.1606 6.05995 11.9413 6.4 12.8 6.4C14.5645 6.4 16 4.96448 16 3.2C16 1.43552 14.5645 0 12.8 0C11.0355 0 9.6 1.43552 9.6 3.2C9.6 3.72093 9.72519 4.21316 9.94695 4.64825L6.60469 6.71893C5.91932 5.89461 4.88661 5.36889 3.73333 5.36889C1.67477 5.36889 0 7.04366 0 9.10222C0 11.1608 1.67477 12.8356 3.73333 12.8356C4.88661 12.8356 5.91932 12.3098 6.60469 11.4855L9.94695 13.5562C9.72519 13.9913 9.6 14.4835 9.6 15.0044C9.6 16.7689 11.0355 18.2044 12.8 18.2044C14.5645 18.2044 16 16.7689 16 15.0044C16 13.24 14.5645 11.8044 12.8 11.8044Z" fill="#009C29" />
                                </svg>
                            </div>
                        </div>
                        <div className='history-area'>
                            {savedResults.length > 0 ? (
                                savedResults.map((result, index) => {
                                    const [equation, calculatedResult] = result.split('=');
                                    return (
                                        <div key={index} className="card-container">
                                            <div className='history-expression text-wrap'>{equation.trim()}</div>
                                            <div className='history-expression-result'>={calculatedResult.trim()}</div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No saved History.</p>
                            )}
                            <button className='btn btn-sm clear-button' onClick={handleDeleteHistory} style={{ background: "#009C29", color: "white" }}>
                                Clear History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicCalculator;
