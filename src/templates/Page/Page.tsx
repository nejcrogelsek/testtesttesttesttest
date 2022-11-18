import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

interface Props {}

const TemplateName: FC<Props> = (props: Props) => {
  return (
    <Box className="template-name">
      <Typography variant="h1">TemplateName</Typography>
    </Box>
  )
}

export default TemplateName
