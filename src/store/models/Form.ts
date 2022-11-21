export interface FormRequest {
  first_name: string
  last_name?: string
  email: string
  phone: string
  barber: string
  service: string
  date: number
  time: string
  price: number
}
export interface FormResponse {
  startTime: string
  startDate: number
  barberId: number
  serviceId: number
}
