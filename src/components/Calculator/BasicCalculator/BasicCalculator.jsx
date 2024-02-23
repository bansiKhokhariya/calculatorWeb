import React, { useState, useEffect } from 'react';
import './BasicCalculator.css';

const BasicCalculator = () => {
    const [inputValue, setInputValue] = useState('');
    const [equalPressed, setEqualPressed] = useState(false);

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
            } else if (key === '+' || key === '-' || key === '*' || key === '/') {
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
            // Remove trailing operator if present
            if (/[+\-*/]$/.test(expression)) {
                expression = expression.slice(0, -1);
            }
            const result = eval(expression);
            setInputValue(result.toString());
            setEqualPressed(true);
        }
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
            </div>
        </div>
    );
};

export default BasicCalculator;
