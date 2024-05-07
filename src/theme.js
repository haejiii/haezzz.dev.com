import { createContext, useContext, useState } from 'react'

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

  const [theme, setTheme] = useState({
    ...initialState,
    mode: localThemeMode ?? systemThemeMode,
  })

  const onChangeMode = mode => {
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem(THEME_KEY, mode)
    setTheme({ mode })
  }

  return (
    <ThemeContext.Provider value={{ ...theme, onChangeMode }}>{children}</ThemeContext.Provider>
  )
}
