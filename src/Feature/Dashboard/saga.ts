import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions as DashboardActions, ApiErrorAction } from './reducer';
import { PayloadAction } from 'redux-starter-kit';

function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}

export default function* watchApiError() {
  yield takeEvery(DashboardActions.metricDataReceivedApiError.type, apiErrorReceived);
}
