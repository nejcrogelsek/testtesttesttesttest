import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { FC, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from 'store/app/hooks'
import { removeSnackbar } from 'store/features/globalSlice'
import { Snackbar as ISnackbar, SnackbarColor, SnackbarType } from 'store/models/Snackbar'
import useMountTransition from 'utils/useMountTransition'

const snackbarDelay = 5000

export interface SnackbarProps {
  snackbar: ISnackbar
  animationFrom?: 'left' | 'right' | 'none'
  transitionDuration: number
}

const Snackbar: FC<SnackbarProps> = ({ snackbar, animationFrom = 'none', transitionDuration }) => {
  const dispatch = useAppDispatch()
  const timer = useRef<number>(snackbarDelay)

  const [open, setOpen] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(snackbarDelay)
  const shouldRender = useMountTransition(open, transitionDuration)

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      setOpen(false)
    }, timeRemaining)
    return () => {
      window.clearTimeout(timer.current)
    }
  }, [])

  const getTransition = () => {
    if (open && shouldRender) {
      return { transform: 'translateX(0px)' }
    }
    if (animationFrom === 'left') {
      return { transform: 'translateX(-100%)' }
    } else if (animationFrom === 'right') {
      return { transform: 'translateX(100%)' }
    }
  }

  /* Pause timeout on hover */
  const onMouseEnter = () => {
    window.clearTimeout(timer.current)
    setTimeRemaining(5000)
  }

  const onMouseLeave = () => {
    timer.current = window.setTimeout(() => {
      setOpen(false)
    }, timeRemaining)
  }

  const getSnackbarTheme = (): string => {
    switch (snackbar.type) {
      case SnackbarType.SUCCESS:
        return SnackbarColor.SUCCESS
      case SnackbarType.WARNING:
        return SnackbarColor.WARNING
      case SnackbarType.ERROR:
        return SnackbarColor.ERROR
      case SnackbarType.INFO:
        return SnackbarColor.INFO
      default:
        return SnackbarColor.INFO
    }
  }

  return (
    <>
      {(shouldRender || open) && (
        <Box
          sx={{
            fontSize: '16px',
            maxWidth: '344px',
            width: '100%',
            boxSizing: 'border-box',
            pointerEvents: 'all',
            transition: 'all 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            marginTop: '1rem',
            color: '#ffffff',
            padding: '1.2rem',
            overflow: 'hidden',
            ...getTransition(),
            transitionDuration: `${transitionDuration}ms`,
            backgroundColor: getSnackbarTheme(),
            '&:hover .progress-line': {
              display: 'none',
            },
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Snackbar content */}
          {snackbar?.close && (
            <IconButton
              sx={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '24px',
                height: '24px',
              }}
              onClick={() => dispatch(removeSnackbar(snackbar.id))}
            >
              <CloseIcon />
            </IconButton>
          )}
          {snackbar?.title}
          {snackbar?.body && (
            <Typography
              sx={{
                fontSize: '14px',
                display: 'block',
              }}
              style={snackbar?.title ? { marginTop: '0.5rem' } : { marginTop: '0' }}
            >
              {snackbar.body}
            </Typography>
          )}
          <Box
            sx={{
              display: 'block',
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '5px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              animation: 'progressLine 5s forwards',
              '@keyframes progressLine': {
                '0%': {
                  width: '100%',
                },
                '100%': {
                  width: 0,
                },
              },
            }}
            className="progress-line"
          ></Box>
        </Box>
      )}
    </>
  )
}

export default Snackbar
