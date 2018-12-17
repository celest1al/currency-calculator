import {
  GET_ALL_CURRENCIES_REQUEST,
  ADD_CURRENCY,
  REMOVE_CURRENCY
} from "./types";

export const getAllCurrenciesAction = () => {
  return {
    type: GET_ALL_CURRENCIES_REQUEST
  };
};

export const addCurrencyAction = data => {
  return {
    type: ADD_CURRENCY,
    payload: data
  };
};

export const removeCurrencyAction = data => {
  return {
    type: REMOVE_CURRENCY,
    payload: data
  };
};
