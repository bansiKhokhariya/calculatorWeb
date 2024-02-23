import React, { useState } from 'react';

const NumberToWordConverter = () => {
    const [numberValue, setNumberValue] = useState('');
    const [wordValue, setWordValue] = useState('');

    var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    function inWords(num) {
        if ((num = num.toString()).length > 9) return 'overflow';
        var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return '';
        var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? ' ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
        return str;
    }

    const handleChangeNumberValue = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        setNumberValue(input);
        const words = inWords(input);
        setWordValue(words);
    };

    return (
        <div className='percentage-caculator-section-main'>
            <div className="percentage-caculator-section">
                <h2 className='percentage-caculator-title'>Number To Word Converter</h2>
                <div className='percentage-caculator-main-box' >
                    <div className='percentage-input-box'>
                        <label className='percentage-caculator-lable' htmlFor="number">Number : </label>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input
                                className='percentage-caculator-input'
                                type="text"
                                name=""
                                id="number"
                                value={numberValue}
                                onChange={handleChangeNumberValue}
                            />
                            &nbsp;
                            &nbsp;
                        </div>
                    </div>
                    <div className='percentage-result-section'>
                        <div className='result-value'>
                            Word :  <span className='result-value-span-green'>{wordValue}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NumberToWordConverter;
