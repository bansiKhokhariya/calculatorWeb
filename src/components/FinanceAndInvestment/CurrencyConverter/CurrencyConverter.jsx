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
        <div className='bootstrap-card-section'>
            <div className="card bootstrap-card">
                <div className="card-header text-center card-text">
                    <h1>
                        Currency Converter
                    </h1>
                </div>
                <div className="card-body card-text">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Amount</span>
                        </div>
                        <input type="number" className="form-control" placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <label className='card-text text-center mt-2 mb-2 ms-1'>From</label>
                    <select className="form-select form-select-sm" id="conversionType" value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                    >
                        {Object.keys(country).map(countryName => (
                            <option key={countryName} value={countryName}>{countryName}</option>
                        ))}
                    </select>
                    <label className='card-text text-center mt-2 mb-2 ms-1'>To</label>
                    <select className="form-select form-select-sm" id="conversionType" value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}>
                        {Object.keys(country).map(countryName => (
                            <option key={countryName} value={countryName}>{countryName}</option>
                        ))}
                    </select>
                    <div className="input-group mt-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Rate</span>
                        </div>
                        <input type="number" className="form-control"
                            value={exchangeRate}
                            placeholder="Rate"
                            readOnly
                        />
                    </div>
                    <div className='mt-3 mb-2'>
                        <button className='btn btn-sm btn-success' onClick={convertCurrency}>Convert</button>
                    </div>
                    <div >
                        <div>
                            <strong>
                                Result :
                                <span className='text-success'>
                                    &nbsp; {result}
                                </span>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CurrencyConverter;




