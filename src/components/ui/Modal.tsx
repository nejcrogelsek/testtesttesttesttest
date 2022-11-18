/* eslint-disable react/jsx-props-no-spreading */
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import MuiModal from '@mui/material/Modal'
import { FC } from 'react'
import { useAppDispatch } from 'store/app/hooks'
import { removeModal } from 'store/features/globalSlice'
import { ModalProps } from 'store/models/Modal'
import { tokens } from 'styles/theme'

const Modal: FC<ModalProps> = ({ children, sx }) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <MuiModal
      disableEscapeKeyDown={false}
      open={true}
      onClose={() => dispatch(removeModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          color: colors.black,
          bgcolor: colors.white,
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          ...sx,
        }}
      >
        {children}
      </Box>
    </MuiModal>
  )
}

export default Modal
