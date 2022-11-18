import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import BookAppointment from 'components/user/BookAppointmentForm/BookAppointment'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <Box>
      <Typography variant="h1">Home component</Typography>
      <BookAppointment />
    </Box>
  )
}

export default Home
