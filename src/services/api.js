import axios from 'axios';

const apiKey = "9dd4187d2d97b7b6a923d45bbc21caf2"; // Если API требует ключ
const baseUrl = "https://api.exchangeratesapi.io/latest";

export const getExchangeRates = async () => {
    try {
        const response = await axios.get(`${baseUrl}?access_key=${apiKey}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        throw error;
    }
};