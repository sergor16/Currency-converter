import React, { useState, useEffect } from 'react';
import { getExchangeRates } from '../services/api';

function CurrentRates() {
    const [rates, setRates] = useState({});
    const [baseCurrency, setBaseCurrency] = useState('USD');

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await getExchangeRates(baseCurrency);
                setRates(response.rates);
            } catch (error) {
                console.error('Error fetching rates:', error);
            }
        };
        fetchRates();
    }, [baseCurrency]);

    const handleBaseCurrencyChange = (e) => {
        setBaseCurrency(e.target.value);
    };

    return (
        <div>
            <h1 className="text-center mb-5">Current Exchange Rates</h1>
            <form className="mb-3 mx-auto w-50">
                <label htmlFor="base-currency-select" className="me-2">Base Currency:</label>
                <select id="base-currency-select" value={baseCurrency} onChange={handleBaseCurrencyChange} className="form-control">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUB">RUB</option>
                </select>
            </form>
            <ul className="list-group">
                {Object.keys(rates).map(currency => (
                    <li key={currency} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{currency}</div>
                        </div>
                        <span className="badge bg-primary rounded-pill">{rates[currency]}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CurrentRates;