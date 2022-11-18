import { useEffect } from 'react'

import { useRouter } from '../lib/hooks/useRouter'

const onDefault = () => {
  document.title = 'Template'
  document.body.id = ''
}
const onHome = () => {
  document.title = 'Template'
  document.body.id = 'home-page'
}
const onError = () => {
  document.title = 'Template - Error'
  document.body.id = 'error-page'
}

const callbacks: any = {
  '/': [onHome],
  '/error': [onError],
}

export const addPageIdentification = (_case: string, fn: () => void) => {
  callbacks[_case] = callbacks[_case] || []
  callbacks[_case].push(fn)
}

export const usePagesIdentification = () => {
  const { location } = useRouter()

  const customSwitch = (value: string) => {
    if (callbacks[value]) {
      callbacks[value].forEach((fn: () => void) => {
        fn()
      })
    } else {
      onDefault()
    }
  }

  useEffect(() => {
    if (location.pathname) customSwitch(location.pathname)
  }, [location.pathname])
}
