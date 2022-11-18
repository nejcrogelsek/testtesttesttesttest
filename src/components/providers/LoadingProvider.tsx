/* eslint-disable no-mixed-spaces-and-tabs */
import Box from '@mui/material/Box'
import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { RingLoader } from 'react-spinners'
import { useAppSelector } from 'store/app/hooks'
import useMountTransition from 'utils/useMountTransition'

interface LoadingProviderProps {
  transitionDuration?: number
  loading?: boolean
  children?: ReactNode
}

const LoadingProvider: FC<LoadingProviderProps> = ({ transitionDuration = 300, loading: forceLoading, children }) => {
  const loading = useAppSelector((state) => state.global.globalLoading)
  const shouldRender = useMountTransition(forceLoading || loading, transitionDuration)

  return (
    <>
      {children}
      {(shouldRender || loading) &&
        createPortal(
          <Box>
            <RingLoader color="#ffffff" />
          </Box>,
          document.body,
        )}
    </>
  )
}

export default LoadingProvider
