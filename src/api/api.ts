import instance from 'api/axios'
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
