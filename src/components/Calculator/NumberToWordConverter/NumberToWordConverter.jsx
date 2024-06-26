import React, { useState } from 'react';

const NumberToWordConverter = () => {
    const [numberValue, setNumberValue] = useState('');
    const [wordValue, setWordValue] = useState('');

    const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    const inWords = (num) => {
        if (num.length > 9) return 'overflow';
        const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return '';
        let str = '';
        str += (n[1] !== '00') ? (a[Number(n[1])] || `${b[n[1][0]]} ${a[n[1][1]]}`) + 'crore ' : '';
        str += (n[2] !== '00') ? (a[Number(n[2])] || `${b[n[2][0]]} ${a[n[2][1]]}`) + 'lakh ' : '';
        str += (n[3] !== '00') ? (a[Number(n[3])] || `${b[n[3][0]]} ${a[n[3][1]]}`) + 'thousand ' : '';
        str += (n[4] !== '0') ? (a[Number(n[4])] || `${b[n[4][0]]} ${a[n[4][1]]}`) + 'hundred ' : '';
        str += (n[5] !== '00') ? ((str !== '') ? ' ' : '') + (a[Number(n[5])] || `${b[n[5][0]]} ${a[n[5][1]]}`) : '';
        return str;
    };

    const handleChangeNumberValue = (e) => {
        let input = e.target.value;
        if (input.length > 11) {
            input = input.slice(0, 11);
        }
        setNumberValue(input);
        const words = input === '0' ? 'zero' : inWords(input);
        setWordValue(words);
    };

    return (
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>
                        Number To Word Converter
                    </h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Number</span>
                        </div>
                        <input type="number" className="form-control" placeholder="Enter Value"
                            value={numberValue}
                            onChange={handleChangeNumberValue}
                            inputMode='numeric'
                        />
                    </div>
                    <div>
                        <div>
                            <strong>
                                Word =
                                <span className='text-success'>
                                    &nbsp; {wordValue}
                                </span>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NumberToWordConverter;
