import {
  GET_ALL_CURRENCIES_REQUEST,
  GET_ALL_CURRENCIES_SUCCESS,
  GET_ALL_CURRENCIES_FAILED,
  ADD_CURRENCY,
  REMOVE_CURRENCY
} from "../actions/types";

const currencyListState = {
  loading: false,
  error: null,
  data: {},
  status: null
};

const selectedCurrencyState = {
  data: []
};

export const currencyListReducer = (state = currencyListState, action) => {
  switch (action.type) {
    case GET_ALL_CURRENCIES_REQUEST:
      return {
        loading: true,
        error: null,
        data: {},
        status: null
      };
    case GET_ALL_CURRENCIES_SUCCESS:
      return {
        loading: false,
        error: null,
        data: { ...action.payload.data },
        status: action.payload.status
      };
    case GET_ALL_CURRENCIES_FAILED:
      return {};
    default:
      return state;
  }
};

export const selectedCurrencyReducer = (
  state = selectedCurrencyState,
  action
) => {
  switch (action.type) {
    case ADD_CURRENCY:
      return {
        data: [...state.data, action.payload ]
      };
    case REMOVE_CURRENCY:
      const arr = [...state.data];
      const index = arr.findIndex(val => val.symbol === action.payload.symbol);
      arr.splice(index, 1);
      return {
        data: [...arr]
      };
    default:
      return state;
  }
};
