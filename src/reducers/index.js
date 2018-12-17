import { combineReducers } from "redux";
import {
  currencyListReducer,
  selectedCurrencyReducer
} from "./currencyReducers";

const rootReducer = combineReducers({
  currencyList: currencyListReducer,
  selectedCurrency: selectedCurrencyReducer
});

export default rootReducer;
