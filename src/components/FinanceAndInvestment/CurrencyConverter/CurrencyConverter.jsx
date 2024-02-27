import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [country, setCountry] = useState({});
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [result, setResult] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
                const data = response.data;
                setCountry(data.rates)
                setExchangeRate(data.rates[toCurrency]);
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
            }
        };

        fetchExchangeRate();
    }, [fromCurrency, toCurrency]);

    const convertCurrency = () => {
        if (exchangeRate) {
            const convertedAmount = parseFloat(amount) * exchangeRate;
            setResult(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
        }
    };

    return (
        <div className='percentage-caculator-section-main'>
            <div className="percentage-caculator-section">
                <h2 className='percentage-caculator-title'>BMI Calculator</h2>
                <div className='percentage-caculator-main-box' >
                    <div className="conversion">

                        <div className='percentage-input-box'>
                            <label className='percentage-caculator-lable' htmlFor="number">From : </label>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                <select
                                    className='currency-select-input'
                                    value={fromCurrency}
                                    onChange={(e) => setFromCurrency(e.target.value)}
                                >
                                    {Object.keys(country).map(countryName => (
                                        <option key={countryName} value={countryName}>{countryName}</option>
                                    ))}
                                </select>
                                &nbsp;
                                &nbsp;
                            </div>
                        </div>

                        <div className='percentage-input-box'>
                            <label className='percentage-caculator-lable' htmlFor="number">To : </label>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                <select
                                    className='currency-select-input'
                                    value={toCurrency}
                                    onChange={(e) => setToCurrency(e.target.value)}
                                >
                                    {Object.keys(country).map(countryName => (
                                        <option key={countryName} value={countryName}>{countryName}</option>
                                    ))}
                                </select>
                                &nbsp;
                                &nbsp;
                            </div>
                        </div>

                        <div className='percentage-input-box'>
                            <label className='percentage-caculator-lable' htmlFor="number">Rate : </label>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                <input
                                    className='percentage-caculator-input'
                                    type="number"
                                    value={exchangeRate}
                                    placeholder="Rate"
                                    readOnly
                                />
                                &nbsp;
                                &nbsp;
                            </div>
                        </div>

                        <div className='percentage-input-box'>
                            <label className='percentage-caculator-lable' htmlFor="number">Amount : </label>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                <input
                                    className='percentage-caculator-input'
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount"
                                />
                                &nbsp;
                                &nbsp;
                            </div>
                        </div>

                        <div className='percentage-button-section'>
                            <div className='percentage-button green-button' onClick={convertCurrency}>
                                Convert
                            </div>
                        </div>
                        <div className='percentage-result-section'>
                            <div className='result-value'>
                                <span className='result-value-span-green'>{result}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default CurrencyConverter;
