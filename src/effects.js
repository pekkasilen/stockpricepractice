import axios from 'axios';

export const getStockDayChart = async (tickerSymbol) => {
    const { data } = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tickerSymbol}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data["Time Series (Daily)"];
};

export const getStockCurrentData = async (tickerSymbol) => {
    const { data } = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${tickerSymbol}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data["Global Quote"];
}