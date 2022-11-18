import { createAction } from '@reduxjs/toolkit'

import { FormResponse } from '../models/Form'

export const FORM_SLICE = '/appointments'

export const bookAppointment = createAction<FormResponse>(`${FORM_SLICE}`)
