import axios from "axios";

const currencyList = [
  "USD",
  "CAD",
  "IDR",
  "GBP",
  "CHF",
  "SGD",
  "INR",
  "MYR",
  "JPY",
  "KRW"
];

const BASE_URL = `https://api.exchangeratesapi.io/latest?base=USD&symbols=${currencyList.join(",")}`;

export const getAllCurrencies = () => {
  return axios.get(BASE_URL);
};
