import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

interface Props {}

const PageNotFound: FC<Props> = (props: Props) => {
  return (
    <Box>
      <Typography variant="h1">PageNotFound</Typography>
    </Box>
  )
}

export default PageNotFound
