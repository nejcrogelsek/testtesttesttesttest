import instance from 'api/axios'
import { AxiosResponse } from 'axios'
import { apiRoutes } from 'constants/apiConstants'
import { routes } from 'constants/routesConstants'
import { push } from 'redux-first-history'
import { put } from 'redux-saga/effects'
import { SnackbarType } from 'store/models/Snackbar'

import { bookAppointment } from '../actions/formActions'
import { addError, addSnackbar, setGlobalLoading } from '../features/globalSlice'
import { FormResponse } from '../models/Form'
import { IError } from '../models/Global'

export function* BookAppointmentSaga(action: ReturnType<typeof bookAppointment>): Generator {
  yield put(setGlobalLoading(true))
  try {
    const response = (yield instance.post(
      `${apiRoutes.BOOK_APPOINTMENT}`,
      {
        ...action.payload,
      },
      {},
    )) as AxiosResponse<FormResponse>
    yield put(
      addSnackbar({
        id: `success-${response.data.startDate}`,
        type: SnackbarType.SUCCESS,
        body: `Barber: ${response.data.barberId}; Service: ${response.data.serviceId}`,
        title: `Appointment ID: ${response.data.id}`,
      }),
    )
    // yield put(push(routes.HOME))
  } catch (e) {
    const error = e as IError
    yield put(
      addError({
        actionType: action.type,
        error: error.response?.data.error ?? error.message,
      }),
    )
  } finally {
    yield put(setGlobalLoading(false))
  }
}
