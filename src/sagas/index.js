import { takeLatest, all } from "redux-saga/effects";
import { GET_ALL_CURRENCIES_REQUEST } from "../actions/types";
import { currencySaga } from "./currencySaga";

function* rootSaga() {
  yield all([takeLatest(GET_ALL_CURRENCIES_REQUEST, currencySaga)]);
}

export default rootSaga;
