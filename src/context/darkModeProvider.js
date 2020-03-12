import React, { useEffect, useState, createContext, useCallback } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../assets/styles/theme'

export const ThemeContext = createContext()

export function DarkModeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [componentMounted, setComponentMounted] = useState(false)
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const toggleTheme = useCallback(() => {
    if (theme === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }, [theme])

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    !localTheme
      ? setMode('dark')
      : localTheme
      ? setTheme(localTheme)
      : setMode('light')

    setComponentMounted(true)
  }, [])


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, componentMounted }}>
      <ThemeProvider theme={themeMode}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
