import 'react-phone-input-2/lib/style.css'

import { SxProps, Theme, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { ControllerRenderProps, FieldErrorsImpl } from 'react-hook-form'
import Input from 'react-phone-input-2'
import { FormRequest } from 'store/models/Form'
import { tokens } from 'styles/theme'

type FieldType = Omit<FormRequest, 'last_name'> & {
  last_name: string
  date: number | Date
}

interface Props {
  sx?: SxProps<Theme>
  errors?: Partial<FieldErrorsImpl<FormRequest>>
  field: ControllerRenderProps<FieldType, 'phone'>
}

const PhoneInput: FC<Props> = ({ sx, errors, field }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const mode = theme.palette.mode

  return (
    <Box
      sx={{
        ...sx,
        '.phone_input': {
          '> input': {
            boxShadow: errors?.phone ? '0 2px 0 #d32f2f' : 'none',
            width: '100%',
            height: '41px',
            backgroundColor: 'white',
            color: colors.white,
          },
          '.flag-dropdown': {
            backgroundColor: 'white',
            '& .open': {
              backgroundColor: mode === 'dark' ? '#293040 !important' : '#EDEDED !important',
            },
            '> ul': {
              backgroundColor: mode === 'dark' ? '#2E2E2E' : '#ffffff',
              color: colors.white,
              '> li:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
              },
              '> li.highlight': {
                backgroundColor: mode === 'dark' ? '#2A2B2E' : 'rgba(4, 5, 9, 0.12)',
              },
              '> li': {
                '.country-name:hover': {
                  backgroundColor: 'transparent',
                },
                '.dial-code:hover': {
                  backgroundColor: 'transparent',
                },
              },
            },
            '.arrow': {
              borderBottom: '4px solid #EDEDED !important',
              borderBottomColor: mode === 'dark' ? '#EDEDED !important' : 'rgba(0, 0, 0, 0.54) !important',
              borderTop: '4px solid #2E2E2E !important',
              borderTopColor: mode === 'dark' ? '#2E2E2E !important' : '#EDEDED !important',
              transform: 'translateY(-50%)',
            },
            '& :hover .arrow': {
              borderTopColor: mode === 'dark' ? '#2E2E2E !important' : '#E5E5E5 !important',
            },
            '& .open .arrow': {
              marginTop: '2px',
              borderTop: '4px solid #EDEDED !important',
              borderTopColor: mode === 'dark' ? '#EDEDED !important' : '#2E2E2E !important',
              borderBottom: '4px solid #2E2E2E !important',
              borderBottomColor: mode === 'dark' ? '#2E2E2E !important' : '#EDEDED !important',
            },
            '.selected-flag:hover': {
              backgroundColor: mode === 'dark' ? '#323948' : '#E5E5E5',
            },
          },
          '& :hover': {
            backgroundColor: 'white',
          },
        },
      }}
    >
      <Input {...field} country={'us'} containerClass="phone_input" />
      {errors?.phone && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 1.66,
            textAlign: 'left',
            marginTop: '3px',
            marginRight: '14px',
            marginBottom: 0,
            marginLeft: '14px',
            color: '#d32f2f',
          }}
        >
          {errors?.phone.message}
        </Typography>
      )}
    </Box>
  )
}

export default PhoneInput
