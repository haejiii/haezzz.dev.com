import { createContext, useContext, useEffect, useState } from 'react'

export const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
}

const initialState = {
  mode: THEME_MODE.LIGHT,
  onChangeMode: () => {},
}

const THEME_KEY = 'theme-mode'

const ThemeContext = createContext(initialState)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const localThemeMode = localStorage.getItem(THEME_KEY)

  const systemThemeMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME_MODE.DARK
    : THEME_MODE.LIGHT

  const currentMode = localThemeMode ?? systemThemeMode

  const [theme, setTheme] = useState({
    ...initialState,
    mode: currentMode,
  })

  useEffect(() => {
    window.document.body.classList.add(currentMode)
    localStorage.setItem(THEME_KEY, currentMode)
  }, [])

  const onChangeMode = mode => {
    if (mode === THEME_MODE.DARK) {
      window.document.body.classList.add(THEME_MODE.DARK)
    } else {
      window.document.body.classList.remove(THEME_MODE.DARK)
    }

    localStorage.setItem(THEME_KEY, mode)
    setTheme({ mode })
  }

  return (
    <ThemeContext.Provider value={{ ...theme, onChangeMode }}>{children}</ThemeContext.Provider>
  )
}
