import { all, takeLatest } from 'redux-saga/effects'

import { bookAppointment } from '../actions/formActions'
import { BookAppointmentSaga } from './formSaga'

export function* watchAll(): Generator {
  yield all([takeLatest(bookAppointment.type, BookAppointmentSaga)])
}
