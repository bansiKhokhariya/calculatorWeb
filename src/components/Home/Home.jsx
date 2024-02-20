import { React, useState } from 'react'
import './Home.css'
import SidebarToogle from '../SidebarToogle/SidebarToogle'

const Home = () => {

    const [inputValue, setInputValue] = useState("");
    const [equalPressed, setEqualPressed] = useState(false);

    const handleClick = (button) => {
        if (equalPressed) {
            setInputValue("");
            setEqualPressed(false);
        }
        setInputValue(inputValue + button);
    };

    const handleDelete = () => {
        setInputValue(inputValue.slice(0, -1));
    };

    const handleAC = () => {
        setInputValue("");
    };

    const handleEqual = () => {
        if (inputValue.trim() !== "") {
            const result = eval(inputValue);
            setInputValue(result.toString());
            setEqualPressed(true);
        }
    };

    return (
        <>
            <SidebarToogle />
            <div className="main-container"  style={{textAlign:"center"}}>
                <div>
                    <input type="text" placeholder="0" className="container__input" value={inputValue} readOnly />
                    <div className="buttons">
                        <button className="verde" id="ac" onClick={handleAC}>AC</button>
                        <button className="verde" id="del" onClick={handleDelete}>DEL</button>
                        <button className="btn verde verdeSign" onClick={() => handleClick("%")}>%</button>
                        <button className="btn verde verdeSign" onClick={() => handleClick("/")}>/</button>
                        <button className="btn" onClick={() => handleClick("7")}>7</button>
                        <button className="btn" onClick={() => handleClick("8")}>8</button>
                        <button className="btn" onClick={() => handleClick("9")}>9</button>
                        <button className="btn verde verdeSign" onClick={() => handleClick("*")}>*</button>
                        <button className="btn" onClick={() => handleClick("4")}>4</button>
                        <button className="btn" onClick={() => handleClick("5")}>5</button>
                        <button className="btn" onClick={() => handleClick("6")}>6</button>
                        <button className="btn verde verdeSign" onClick={() => handleClick("-")}>-</button>
                        <button className="btn" onClick={() => handleClick("1")}>1</button>
                        <button className="btn" onClick={() => handleClick("2")}>2</button>
                        <button className="btn" onClick={() => handleClick("3")}>3</button>
                        <button className="btn verde verdeSign" onClick={() => handleClick("+")}>+</button>
                        <button className="btn" onClick={() => handleClick("00")}>00</button>
                        <button className="btn" onClick={() => handleClick("0")}>0</button>
                        <button className="btn" onClick={() => handleClick(".")}>.</button>
                        <button id="igual" onClick={handleEqual}>=</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home