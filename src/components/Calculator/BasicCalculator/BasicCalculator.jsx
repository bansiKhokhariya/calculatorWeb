// import React, { useState, useEffect } from 'react';
// import { Dropdown, Modal, Button, Table } from 'react-bootstrap';
// import './BasicCalculator.css';

// const BasicCalculator = (props) => {
//     const [inputValue, setInputValue] = useState('');
//     const [equalPressed, setEqualPressed] = useState(false);
//     const [savedResults, setSavedResults] = useState([]);

//     useEffect(() => {
//         try {
//             const savedData = JSON.parse(localStorage.getItem(props.historyName)) || [];
//             setSavedResults(savedData);
//         } catch (error) {
//             setSavedResults([]);
//         }
//     }, [props.isModalOpen]);

//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             const { key } = event;
//             if (/^[0-9+\-*/.%]$/.test(key)) {
//                 handleClick(key);
//             } else if (key === 'Delete') {
//                 handleAC();
//             } else if (key === 'Backspace') {
//                 handleDelete();
//             } else if (key === 'Enter' || key === '=') {
//                 handleEqual();
//             } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
//                 handleClick(key);
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, [inputValue]);


//     const handleClick = (button) => {
//         if (equalPressed) {
//             setInputValue('');
//             setEqualPressed(false);
//         }
//         setInputValue(inputValue + button);
//     };

//     const handleDelete = () => {
//         setInputValue(inputValue.slice(0, -1));
//     };

//     const handleAC = () => {
//         setInputValue('');
//     };

//     const handleEqual = () => {
//         if (inputValue.trim() !== '') {
//             let expression = inputValue;
//             // Replace percentage symbol with '/100*'
//             expression = expression.replace(/%/g, '/100*');
//             // Remove trailing operator if present
//             if (/[+\-*/]$/.test(expression)) {
//                 expression = expression.slice(0, -1);
//             }
//             const result = eval(expression);
//             setInputValue(result.toString());
//             setEqualPressed(true);

//             // Save the expression and result in local storage array
//             const updatedResults = [...savedResults, `${expression} = ${result.toString()}`];
//             localStorage.setItem('savedResults', JSON.stringify(updatedResults));
//             setSavedResults(updatedResults);
//         }
//     };

//     return (
//         <div className='basic-caculator-section'>
//             <div>
//                 <div className="main-container" style={{ textAlign: 'center' }}>
//                     <div>
//                         <input type="text" placeholder="0" className="container__input" value={inputValue} readOnly />
//                         <div className="buttons">
//                             <button className="verde" id="ac" onClick={handleAC}>AC</button>
//                             <button className="verde" id="del" onClick={handleDelete}>DEL</button>
//                             <button className="verde verdeSign" onClick={() => handleClick('%')}>%</button>
//                             <button className="verde verdeSign" onClick={() => handleClick('/')}>/</button>
//                             <button className="" onClick={() => handleClick('7')}>7</button>
//                             <button className="" onClick={() => handleClick('8')}>8</button>
//                             <button className="" onClick={() => handleClick('9')}>9</button>
//                             <button className="verde verdeSign" onClick={() => handleClick('*')}>*</button>
//                             <button className="" onClick={() => handleClick('4')}>4</button>
//                             <button className="" onClick={() => handleClick('5')}>5</button>
//                             <button className="" onClick={() => handleClick('6')}>6</button>
//                             <button className="verde verdeSign" onClick={() => handleClick('-')}>-</button>
//                             <button className="" onClick={() => handleClick('1')}>1</button>
//                             <button className="" onClick={() => handleClick('2')}>2</button>
//                             <button className="" onClick={() => handleClick('3')}>3</button>
//                             <button className="verde verdeSign" onClick={() => handleClick('+')}>+</button>
//                             <button className="" onClick={() => handleClick('00')}>00</button>
//                             <button className="" onClick={() => handleClick('0')}>0</button>
//                             <button className="" onClick={() => handleClick('.')}>.</button>
//                             <button id="igual" onClick={handleEqual}>=</button>
//                         </div>
//                     </div>
//                 </div>


//                 <Modal show={props.isModalOpen} onHide={props.closeModal} dialogClassName="modal-dialog-centered modal-lg modal-dialog-scrollable">
//                     <Modal.Header closeButton>
//                         <Modal.Title>My History</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {savedResults.length > 0 ? (
//                             <div className="card-container">
//                                 {savedResults.map((result, index) => (
//                                     index % 3 === 0 && ( // Start a new row every three cards
//                                         <div className="row" key={index / 3}>
//                                             {savedResults.slice(index, index + 3).map((item, i) => (
//                                                 <div className="col-md-4" key={index + i}>
//                                                     <div className="card">
//                                                         <div className="card-body">
//                                                             <h5 className="card-title">Calculation {index + i + 1}</h5>
//                                                             <p className="card-text">{item}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )
//                                 ))}
//                             </div>
//                         ) : (
//                             <p>No saved History.</p>
//                         )}
//                     </Modal.Body>
//                 </Modal>
//             </div>
//         </div>
//     );
// };

// export default BasicCalculator;


import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './BasicCalculator.css';

const BasicCalculator = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [equalPressed, setEqualPressed] = useState(false);
    const [savedResults, setSavedResults] = useState([]);

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
    };

    const handleEqual = () => {
        if (inputValue.trim() !== '') {
            let expression = inputValue;
            // Replace percentage symbol with '/100*'
            expression = expression.replace(/%/g, '/100*');
            // Remove trailing operator if present
            if (/[+\-*/]$/.test(expression)) {
                expression = expression.slice(0, -1);
            }
            const result = eval(expression);
            setInputValue(result.toString());
            setEqualPressed(true);

            // Save the expression and result in local storage array
            const updatedResults = [...savedResults, `${expression} = ${result.toString()}`];
            localStorage.setItem('savedResults', JSON.stringify(updatedResults));
            setSavedResults(updatedResults);
        }
    };

    const handleDeleteHistory = () => {
        localStorage.removeItem('savedResults');
        setSavedResults([]);
    };

    return (
        <div className='basic-caculator-section'>
            <div>
                <div className="main-container" style={{ textAlign: 'center' }}>
                    <div>
                        <input type="text" placeholder="0" className="container__input" value={inputValue} readOnly />
                        <div className="buttons">
                            <button className="verde" id="ac" onClick={handleAC}>AC</button>
                            <button className="verde" id="del" onClick={handleDelete}>DEL</button>
                            <button className="verde verdeSign" onClick={() => handleClick('%')}>%</button>
                            <button className="verde verdeSign" onClick={() => handleClick('/')}>/</button>
                            <button className="" onClick={() => handleClick('7')}>7</button>
                            <button className="" onClick={() => handleClick('8')}>8</button>
                            <button className="" onClick={() => handleClick('9')}>9</button>
                            <button className="verde verdeSign" onClick={() => handleClick('*')}>*</button>
                            <button className="" onClick={() => handleClick('4')}>4</button>
                            <button className="" onClick={() => handleClick('5')}>5</button>
                            <button className="" onClick={() => handleClick('6')}>6</button>
                            <button className="verde verdeSign" onClick={() => handleClick('-')}>-</button>
                            <button className="" onClick={() => handleClick('1')}>1</button>
                            <button className="" onClick={() => handleClick('2')}>2</button>
                            <button className="" onClick={() => handleClick('3')}>3</button>
                            <button className="verde verdeSign" onClick={() => handleClick('+')}>+</button>
                            <button className="" onClick={() => handleClick('00')}>00</button>
                            <button className="" onClick={() => handleClick('0')}>0</button>
                            <button className="" onClick={() => handleClick('.')}>.</button>
                            <button id="igual" onClick={handleEqual}>=</button>
                        </div>
                    </div>
                </div>


                <Modal show={props.isModalOpen} onHide={props.closeModal} dialogClassName="modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <Modal.Header closeButton>
                        <Modal.Title>My History</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {savedResults.length > 0 && (
                            <Button className='btn btn-danger btn-sm' style={{marginBottom:"10px"}} onClick={handleDeleteHistory}>Clear All History</Button>
                        )}
                        {savedResults.length > 0 ? (
                            <div className="card-container">
                                {savedResults.map((result, index) => (
                                    index % 3 === 0 && ( // Start a new row every three cards
                                        <div className="row" key={index / 3}>
                                            {savedResults.slice(index, index + 3).map((item, i) => (
                                                <div className="col-md-4" key={index + i}>
                                                    <div className="card bg-light">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Calculation {index + i + 1}</h5>
                                                            <p className="card-text">{item}</p>
                                                            <button className="btn btn-danger btn-sm" onClick={() => {
                                                                const updatedResults = savedResults.filter((_, idx) => idx !== index + i);
                                                                localStorage.setItem('savedResults', JSON.stringify(updatedResults));
                                                                setSavedResults(updatedResults);
                                                            }}>Delete</button>
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

