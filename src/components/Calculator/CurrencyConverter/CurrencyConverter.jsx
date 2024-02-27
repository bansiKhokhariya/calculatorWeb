import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [result, setResult] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
                const data = response.data;
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
            setResult(`${amount} ${fromCurrency} equals ${convertedAmount.toFixed(2)} ${toCurrency}`);
        }
    };

    return (
        <div className="currency-converter">
            <div>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    {/* Add more currencies as needed */}
                </select>
            </div>
            <div>
                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    <option value="INR">INR</option>
                    <option value="JPY">JPY</option>
                    <option value="AUD">AUD</option>
                    {/* Add more currencies as needed */}
                </select>
                <button onClick={convertCurrency}>Convert</button>
            </div>
            <div>
                <p>{result}</p>
            </div>
        </div>
    );
};

export default CurrencyConverter;
