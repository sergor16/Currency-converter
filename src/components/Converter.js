import React, { useState } from 'react';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getExchangeRates } from '../services/api';

function Converter() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [rates, setRates] = useState({});

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const convertCurrency = async () => {
        if (!input) return;

        const parts = input.split(' ');
        if (parts.length !== 4 || parts[2].toLowerCase() !== 'in') {
            alert("Invalid format. Please enter in the format '15 USD in RUB'");
            return;
        }

        const amount = parseFloat(parts[0]);
        const fromCurrency = parts[1].toUpperCase();
        const toCurrency = parts[3].toUpperCase();

        try {
            const data = await getExchangeRates();
            setRates(data.rates);

            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
        } catch (error) {
            console.error('Error converting currency:', error);
        }
    };

    return (
        <div style={{ marginTop: '50px' }}>
            <h1 className="text-center mb-5">Currency Converter</h1>
            <Form className="mx-auto w-50">
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        placeholder="Enter amount and currencies"
                        aria-label="Amount and currencies"
                        value={input}
                        onChange={handleChange}
                    />
                    <Button variant="primary" onClick={convertCurrency}>
                        Convert
                    </Button>
                </InputGroup>
                {result && <p className="mt-3 text-success">{result}</p>}
                <br />
                <Link to="/current-rates">Посмотреть текущие курсы валют</Link>
            </Form>
        </div>
    );
}

export default Converter;