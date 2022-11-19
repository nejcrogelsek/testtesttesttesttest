import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import { fetchBarbers, fetchServices, fetchWorkHours } from 'api/api'
import PhoneInput from 'components/ui/PhoneInput'
import { useForm } from 'lib/hooks/react-hook-form/useForm'
import { FC, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useQuery } from 'react-query'
import { bookAppointment } from 'store/actions/formActions'
import { useAppDispatch } from 'store/app/hooks'
import { FormRequest, FormResponse } from 'store/models/Form'
import { tokens } from 'styles/theme'

const BookAppointment: FC = () => {
  const { data: barbers } = useQuery('barbers', fetchBarbers)
  const { data: services } = useQuery('services', fetchServices)
  const { data: workHours } = useQuery('workHours', fetchWorkHours)

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useAppDispatch()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const { handleSubmit, errors, reset, control } = useForm()
  const [price, setPrice] = useState(0)
  const [availableHours, setAvailableHours] = useState<string[]>([])

  const onSubmit = handleSubmit((dataset: FormRequest) => {
    const data: FormResponse = { barberId: parseInt(dataset.barber), serviceId: parseInt(dataset.service), startDate: new Date(dataset.date).getTime() }
    dispatch(bookAppointment(data))
    reset()
    setPrice(0)
  })

  useEffect(() => {
    if (workHours?.data.length > 0) {
      const array = workHours?.data
      const allAvailableHours: string[] = []
      for (let index = 0; index < array.length; index++) {
        const start = array[index].startHour
        const end = parseInt(array[index].endHour)
        const workingHours = end - start
        allAvailableHours.push(`${start}:00`)
        allAvailableHours.push(`${end - 1}:30`)
        for (let i = 0; i < workingHours; i++) {
          allAvailableHours.push(`${start + i}:00`)
        }
      }
      setAvailableHours([...new Set(allAvailableHours)].sort())
    }
  }, [workHours])

  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <form role="BookAppointmentForm" onSubmit={onSubmit}>
      <Box
        display="grid"
        gap={{ xs: '16px', lg: '32px' }}
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          '& > div': {
            gridColumn: isNonMobile ? undefined : 'span 4',
          },
        }}
      >
        <Controller
          control={control}
          name="first_name"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="filled"
              type="text"
              placeholder="First name"
              name="first_name"
              error={!!errors.first_name && !!errors.first_name.message}
              helperText={errors.first_name && errors.first_name.message}
              sx={{
                gridColumn: { xs: 'span 4', md: 'span 2' },
                height: '36px',
                'input': {
                  fontWeight: 600,
                  background: 'white',
                  color: 'black',
                  paddingTop: '10px',
                  '::placeholder': {
                    fontSize: 14,
                    fontWeight: 600,
                  }
                }
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="last_name"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="filled"
              type="text"
              placeholder="Last Name"
              name="last_name"
              error={!!errors.last_name && !!errors.last_name.message}
              helperText={errors.last_name && errors.last_name.message}
              sx={{
                gridColumn: { xs: 'span 4', md: 'span 2' },
                height: '36px',
                'input': {
                  fontWeight: 600,
                  background: 'white',
                  color: 'black',
                  paddingTop: '10px',
                  '::placeholder': {
                    fontSize: 14,
                    fontWeight: 600
                  }
                }
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="filled"
              type="text"
              placeholder="Email"
              name="email"
              error={!!errors.email && !!errors.email.message}
              helperText={errors.email && errors.email.message}
              sx={{
                gridColumn: { xs: 'span 4', md: 'span 2' },
                height: '36px',
                'input': {
                  fontWeight: 600,
                  background: 'white',
                  color: 'black',
                  paddingTop: '10px',
                  '::placeholder': {
                    fontSize: 14,
                    fontWeight: 600
                  }
                }
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <PhoneInput
              sx={{
                gridColumn: { xs: 'span 4', md: 'span 2' },
              }}
              errors={errors}
              field={field}
            />
          )}
        />
        <Controller
          control={control}
          name="barber"
          render={({ field }) => (
            <TextField
              {...field}
              select
              variant="filled"
              placeholder="Select Barber"
              sx={{
                gridColumn: { xs: 'span 4', md: 'span 2' },
                height: '36px',
                '> div > div': {
                  paddingTop: '10px',
                  background: 'white',
                  color: 'black'
                },
                'input': {
                  fontWeight: 600,
                  background: 'white',
                  color: 'black',
                  paddingTop: '10px',
                  '::placeholder': {
                    fontSize: 14,
                    fontWeight: 600
                  }
                }
              }}
              error={!!errors.barber && !!errors.barber.message}
              helperText={errors.barber && errors.barber.message}
            >
              <MenuItem></MenuItem>
              {barbers?.data.map((barber, index: number) => (
                <MenuItem key={index} value={barber.id}>{barber.firstName} {barber.lastName}</MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <TextField
              {...field}
              select
              variant="filled"
              placeholder="Select Service"
              sx={{
                gridColumn: { xs: 'span 4', md: 'span 2' },
                height: '36px',
                '> div > div': {
                  paddingTop: '10px',
                  background: 'white',
                  color: 'black'
                },
                'input': {
                  fontWeight: 600,
                  background: 'white',
                  color: 'black',
                  paddingTop: '10px',
                  '::placeholder': {
                    fontSize: 14,
                    fontWeight: 600
                  }
                }
              }}
              error={!!errors.service && !!errors.service.message}
              helperText={errors.service && errors.service.message}
            >
              <MenuItem></MenuItem>
              {services?.data.map((service, index: number) => (
                <MenuItem key={index} value={service.id} onClickCapture={() => setPrice(service.price)}>{service.name}</MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="filled"
              type="date"
              placeholder="Select Date"
              name="date"
              error={!!errors.date && !!errors.date.message}
              helperText={errors.date && errors.date.message}
              sx={{
                gridColumn: { xs: 'span 4', md: 'span 2' },
                height: '36px',
                '> div > div': {
                  paddingTop: '10px',
                  background: 'white',
                  color: 'black'
                },
                'input': {
                  fontWeight: 600,
                  background: 'white',
                  color: 'black',
                  paddingTop: '10px',
                  '::placeholder': {
                    fontSize: 14,
                    fontWeight: 600
                  }
                },
                '& > label': {
                  transform: 'translate(12px,7px) scale(0.75)'
                }
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="time"
          render={({ field }) => (
            <TextField
              {...field}
              select
              variant="filled"
              placeholder="Select Time"
              sx={{
                gridColumn: { xs: 'span 4', md: 'span 2' },
                height: '36px',
                '> div > div': {
                  paddingTop: '10px',
                  background: 'white',
                  color: 'black'
                },
                'input': {
                  fontWeight: 600,
                  background: 'white',
                  color: 'black',
                  paddingTop: '10px',
                  '::placeholder': {
                    fontSize: 14,
                    fontWeight: 600
                  }
                }
              }}
              error={!!errors.time && !!errors.time.message}
              helperText={errors.time && errors.time.message}
            >
              <MenuItem></MenuItem>
              {availableHours.map((hour, index: number) => {
                return (
                  <MenuItem key={index} value={hour}>{hour}</MenuItem>
                )
              })}
            </TextField>
          )}
        />
        <TextField
          disabled={true}
          value={price}
          fullWidth
          variant="filled"
          type="text"
          placeholder="Price"
          name="price"
          error={!!errors.price && !!errors.price.message}
          helperText={errors.price && errors.price.message}
          sx={{
            height: '36px',
            'input': {
              fontWeight: 600,
              background: 'white',
              color: 'black',
              paddingTop: '10px',
              '::placeholder': {
                fontSize: 14,
                fontWeight: 600
              }
            },
            gridColumn: 'span 4',
            '& > label': {
              transform: 'translate(12px,7px) scale(0.75)'
            }
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center" mt="20px">
        <Button sx={{ fontWeight: 600, width: '100%', backgroundColor: colors.orange, '&:hover': { backgroundColor: `${colors.orange} !important` } }} type="submit" color="secondary" variant="contained">
          Book Appointment
        </Button>
      </Box>
    </form >
  )
}

export default BookAppointment
