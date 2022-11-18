import Box from '@mui/material/Box'
import { FC, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <Box>{children}</Box>
}

export default Layout
