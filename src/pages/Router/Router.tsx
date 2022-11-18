import LoadingProvider from 'components/providers/LoadingProvider'
import { routes } from 'constants/routesConstants'
import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

/* Public routes */
const Home = lazy(() => import('pages/Home/Home'))

/* Error routes */
const PageNotFound = lazy(() => import('pages/PageNotFound/PageNotFound'))

const Router: FC = () => {
  return (
    <Suspense fallback={<LoadingProvider loading={true} />}>
      <Routes>
        <Route path={routes.HOME} element={<Home />} />
        <Route path={'*'} element={<Navigate to={routes.HOME} />} />
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </Suspense>
  )
}

export default Router
