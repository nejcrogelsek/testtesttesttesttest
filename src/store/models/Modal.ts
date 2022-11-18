import { ModalProps as MuiModalProps } from '@mui/material/Modal'
import { ReactNode } from 'react'

export enum ModalType {
  SUCCESS = 'success',
}

export interface ModalProps extends Omit<MuiModalProps, 'children' | 'open'> {
  type: ModalType
  children?: ReactNode | ReactNode[]
  open?: boolean
  actions?: {
    primaryAction: () => void
    secondaryAction?: () => void
  }
}
