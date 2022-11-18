import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import PhoneInput from 'components/ui/PhoneInput'
import { useForm } from 'lib/hooks/react-hook-form/useForm'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { FormRequest } from 'store/models/Form'

const BookAppointment: FC = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const { handleSubmit, errors, reset, control } = useForm()

  const onSubmit = handleSubmit((data: FormRequest) => {
    console.log(data)
    reset()
  })

  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <form role="BookAppointmentForm" onSubmit={onSubmit}>
      <Box
        display="grid"
        gap="16px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          '& > div': {
            gridColumn: isNonMobile ? undefined : 'span 4',
          },
        }}
      >
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              name="email"
              error={!!errors.email && !!errors.email.message}
              helperText={errors.email && errors.email.message}
              sx={{
                gridColumn: 'span 4',
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="first_name"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="filled"
              type="text"
              label="First Name"
              name="first_name"
              error={!!errors.first_name && !!errors.first_name.message}
              helperText={errors.first_name && errors.first_name.message}
              sx={{
                gridColumn: 'span 2',
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
              label="Last Name"
              name="last_name"
              error={!!errors.last_name && !!errors.last_name.message}
              helperText={errors.last_name && errors.last_name.message}
              sx={{
                gridColumn: 'span 2',
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
                gridColumn: 'span 4',
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
              label="Select barber"
              sx={{
                gridColumn: 'span 4',
              }}
              error={!!errors.barber && !!errors.barber.message}
              helperText={errors.barber && errors.barber.message}
            >
              <MenuItem value={1}>Something1</MenuItem>
              <MenuItem value={2}>Something2</MenuItem>
              <MenuItem value={3}>Something3</MenuItem>
              <MenuItem value={4}>Something4</MenuItem>
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
              label="Select service"
              sx={{
                gridColumn: 'span 4',
              }}
              error={!!errors.service && !!errors.service.message}
              helperText={errors.service && errors.service.message}
            >
              <MenuItem value={1}>Something1</MenuItem>
              <MenuItem value={2}>Something2</MenuItem>
              <MenuItem value={3}>Something3</MenuItem>
              <MenuItem value={4}>Something4</MenuItem>
            </TextField>
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
              label="Select time"
              sx={{
                gridColumn: 'span 4',
              }}
              error={!!errors.time && !!errors.time.message}
              helperText={errors.time && errors.time.message}
            >
              <MenuItem value={1}>Something1</MenuItem>
              <MenuItem value={2}>Something2</MenuItem>
              <MenuItem value={3}>Something3</MenuItem>
              <MenuItem value={4}>Something4</MenuItem>
            </TextField>
          )}
        />
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          Book Appointment
        </Button>
      </Box>
    </form>
  )
}

export default BookAppointment
