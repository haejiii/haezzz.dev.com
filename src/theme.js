import { createContext, useContext, useEffect, useState } from 'react'

export const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
}

const initialState = {
  mode: THEME_MODE.LIGHT,
  onChangeMode: () => {},
}

export const THEME_KEY = 'theme-mode'

const ThemeContext = createContext(initialState)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const isBrowser = typeof window !== 'undefined'

  const [theme, setTheme] = useState({
    ...initialState,
    mode: THEME_MODE.LIGHT,
  })

  useEffect(() => {
    // NOTE: 브라우저 환경에서만 실행
    if (isBrowser) {
      const currentMode = window.document.body.classList.contains(THEME_MODE.DARK)
        ? THEME_MODE.DARK
        : THEME_MODE.LIGHT
      setTheme({ ...theme, mode: currentMode })
    }
  }, [])

  const toggleThemeMode = () => {
    if (theme.mode === THEME_MODE.DARK) {
      window.document.body.classList.remove(THEME_MODE.DARK)
      window.document.body.classList.add(THEME_MODE.LIGHT)
    } else {
      window.document.body.classList.remove(THEME_MODE.LIGHT)
      window.document.body.classList.add(THEME_MODE.DARK)
    }

    const nextMode = theme.mode === THEME_MODE.DARK ? THEME_MODE.LIGHT : THEME_MODE.DARK
    localStorage.setItem(THEME_KEY, nextMode)
    setTheme({ mode: nextMode })
  }

  return (
    <ThemeContext.Provider value={{ ...theme, toggleThemeMode }}>{children}</ThemeContext.Provider>
  )
}
