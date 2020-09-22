import { spawn } from 'redux-saga/effects';
import weatherSaga from '../features/Weather/saga';

export default function* root() {
  yield spawn(weatherSaga);
}
