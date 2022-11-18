/* eslint-disable no-mixed-spaces-and-tabs */
import { useTheme } from '@mui/material'
import Success from 'components/modalsContent/Success'
import Modal from 'components/ui/Modal'
import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useAppSelector } from 'store/app/hooks'
import { ModalType } from 'store/models/Modal'
import { tokens } from 'styles/theme'
import useMountTransition from 'utils/useMountTransition'

interface ModalProviderProps {
  children: ReactNode
  className?: string
  transitionDuration?: number
}

const ModalProvider: FC<ModalProviderProps> = ({ children, transitionDuration = 0 }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const modal = useAppSelector((state) => state.global.modal)
  const open = !!modal

  const shouldRender = useMountTransition(open, transitionDuration)

  const showModalType = () => {
    switch (modal?.type) {
      case ModalType.SUCCESS:
        return (
          <Modal {...modal}>
            <Success {...modal} />
          </Modal>
        )
      default:
        return null
    }
  }

  return (
    <>
      {children}
      {(shouldRender || open) && createPortal(<>{showModalType()}</>, document.body)}
    </>
  )
}

export default ModalProvider
