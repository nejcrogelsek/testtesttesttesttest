import { CssBaseline, Theme } from '@mui/material'
import LoadingProvider from 'components/providers/LoadingProvider'
import ModalProvider from 'components/providers/ModalProvider'
import SnackbarProvider from 'components/providers/SnackbarProvider'
import Layout from 'components/ui/Layout'
import Router from 'pages/Router/Router'
import { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { useMode } from 'styles/theme'
import { ColorModeContext } from 'styles/theme'
import useClearErrors from 'utils/useClearErrors'
import useClearSnackbars from 'utils/useClearSnackbars'
import { usePagesIdentification } from 'utils/usePagesIdentification'

const App: FC = () => {
  const [theme, colorMode] = useMode()
  useClearErrors()
  useClearSnackbars()
  usePagesIdentification()

  return (
    <ColorModeContext.Provider value={colorMode as { toggleColorMode: () => void }}>
      <ThemeProvider theme={theme as Theme}>
        <CssBaseline />
        <LoadingProvider>
          <ModalProvider>
            <SnackbarProvider>
              <Layout>
                <Router />
              </Layout>
            </SnackbarProvider>
          </ModalProvider>
        </LoadingProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
