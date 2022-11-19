import instance from 'api/axios'
import axios from 'axios'
import { apiRoutes } from 'constants/apiConstants'

export const fetchBarbers = async () => {
  return instance.get(apiRoutes.GET_BARBERS)
}

export const fetchServices = () => {
  return instance.get(apiRoutes.GET_SERVICES)
}

export const fetchWorkHours = () => {
  return instance.get(apiRoutes.GET_WORK_HOURS)
}

export const fetchAppointments = () => {
  return instance.get(apiRoutes.GET_APPOINTMENTS)
}

export const fetchGifs = () => {
  return axios.get(apiRoutes.GET_GIFS)
}
