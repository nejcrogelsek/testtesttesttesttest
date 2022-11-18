import { createAction } from '@reduxjs/toolkit'

import { FormRequest } from '../models/Form'

export const FORM_SLICE = 'appointments'

export const bookAppointment = createAction<FormRequest>(`${FORM_SLICE}/book`)
