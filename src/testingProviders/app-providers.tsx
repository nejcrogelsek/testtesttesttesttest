import { CssBaseline, Theme } from '@mui/material'
import LoadingProvider from 'components/providers/LoadingProvider'
import ModalProvider from 'components/providers/ModalProvider'
import SnackbarProvider from 'components/providers/SnackbarProvider'
import Layout from 'components/ui/Layout'
import RouterConfig from 'pages/Router/Router'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { HistoryRouter as Router } from 'redux-first-history/rr6'
import { history, store } from 'store/app/store'
import { ThemeProvider } from 'styled-components'
import { ColorModeContext, useMode } from 'styles/theme'
import useClearErrors from 'utils/useClearErrors'
import useClearSnackbars from 'utils/useClearSnackbars'
import { usePagesIdentification } from 'utils/usePagesIdentification'

const AppProviders = ({ children }: { children: ReactNode }) => {
  const [theme, colorMode] = useMode()
  useClearErrors()
  useClearSnackbars()
  usePagesIdentification()

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode as { toggleColorMode: () => void }}>
        <ThemeProvider theme={theme as Theme}>
          <CssBaseline />
          <Router history={history}>
            <LoadingProvider>
              <ModalProvider>
                <SnackbarProvider>
                  <Layout>
                    <RouterConfig />
                  </Layout>
                </SnackbarProvider>
              </ModalProvider>
            </LoadingProvider>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  )
}

export default AppProviders
