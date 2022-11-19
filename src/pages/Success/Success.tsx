import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { fetchGifs } from 'api/api'
import { randomIntFromInterval } from 'lib/helpers/random'
import { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const Success: FC = () => {
  const { data: gifs, isLoading } = useQuery('barbers', fetchGifs)
  const [gif, setGif] = useState<{ user: { avatar_url: string }, title: string } | null>(null)

  useEffect(() => {
    if (gifs?.data?.data?.length > 0) {
      setGif(gifs?.data?.data[randomIntFromInterval(0, 49)])
    }
  }, [gifs])

  return <Box sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: { xs: '1rem', sm: '2rem' },
  }}>
    <Typography variant='h2' sx={{
      textTransform: 'uppercase',
      fontSize: 37,
      fontWeight: 500,
      letterSpacing: 1.6
    }}>
      Appointment Successfully booked
    </Typography>
    <Box sx={{
      marginTop: '1rem',
      maxWidth: '460px',
    }}>
      <img src={gif?.user?.avatar_url ?? ''} alt={gif?.title} />
    </Box>
  </Box>
}

export default Success
