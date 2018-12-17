import { call, put } from "redux-saga/effects";
import { getAllCurrencies } from "../apis/getCurrenciesApi";
import {
  GET_ALL_CURRENCIES_SUCCESS,
  GET_ALL_CURRENCIES_FAILED
} from "../actions/types";

export function* currencySaga() {
  try {
    const result = yield call(getAllCurrencies);
    yield put({ type: GET_ALL_CURRENCIES_SUCCESS, payload: result });
  } catch (error) {
    yield put({ type: GET_ALL_CURRENCIES_FAILED, payload: error });
  }
}
