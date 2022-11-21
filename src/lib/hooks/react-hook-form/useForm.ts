import { yupResolver } from '@hookform/resolvers/yup'
import { useForm as use } from 'react-hook-form'
import * as Yup from 'yup'

export const useForm = () => {
  const FormSchema = Yup.object().shape({
    first_name: Yup.string().required('Please enter your first name'),
    last_name: Yup.string().required('Please enter your last name'),
    email: Yup.string().email('Please enter a valid email').required(),
    phone: Yup.string().required('Please enter phone number'),
    barber: Yup.string().required('Please select a barber'),
    service: Yup.string().required('Please select a service'),
    date: Yup.date().typeError('Please pick a date').required('Please pick a date'),
    time: Yup.string().required('Please pick a time'),
    price: Yup.number().required(),
  })

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
  } = use({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      barber: '',
      service: '',
      time: '',
      date: 0,
      price: 0,
    },
    mode: 'onSubmit',
    resolver: yupResolver(FormSchema),
  })

  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
  }
}

export type FormType = ReturnType<typeof useForm>
