import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/system'
import BookAppointment from 'components/user/BookAppointmentForm/BookAppointment'
import { FC } from 'react'
import { tokens } from 'styles/theme'

const Home: FC = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box sx={{
      padding: { xs: '1rem', sm: '2rem' },
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <Typography variant="h1" sx={{
        textTransform: 'uppercase'
      }}>Book your barber</Typography>
      <Typography variant='body1' sx={{
        fontWeight: '800',
        padding: '0rem 1.5rem',
        textAlign: 'center',
      }}>Great Hair Doesn{'\''}t Happen By Change. It Happens By Appointment!</Typography>

      <Box sx={{
        marginTop: '4rem',
        position: 'relative',
      }}>
        <Box sx={{
          display: 'flex',
          width: '100%',
          maxHeight: '580px',
          height: '100%',
          border: '4px solid black',
          padding: '10px',
          marginLeft: { xs: 'unset', lg: '-100px' }
        }}>
          <img src='images/image.jpg' alt='Barber' />
        </Box>
        <Box sx={{
          marginTop: '2rem',
          backgroundColor: colors.blueAccent[900],
          padding: { xs: '1rem', sm: '2rem' },
          position: { xs: 'relative', lg: 'absolute' },
          maxWidth: { xs: '100%', lg: '440px' },
          right: { xs: 'unset', lg: '-100px' },
          bottom: { xs: 'unset', lg: '-100px' },
        }}>
          <Typography variant='h2' sx={{
            textTransform: 'uppercase',
            fontSize: 37,
            color: colors.black,
            letterSpacing: '1.6px',
            marginBottom: { xs: '1rem', sm: '2rem' }
          }}>Book your appointment</Typography>
          <BookAppointment />
        </Box>
      </Box>
    </Box>
  )
}

export default Home
