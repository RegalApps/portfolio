"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
})

interface ThemeProviderProps {
  children: React.ReactNode
  attribute: string
  defaultTheme: Theme
  enableSystem: boolean
  disableTransitionOnChange: boolean
}

export function ThemeProvider({
  children,
  attribute,
  defaultTheme,
  enableSystem,
  disableTransitionOnChange,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      setTheme(defaultTheme)
    }
  }, [defaultTheme])

  useEffect(() => {
    const root = document.documentElement

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.toggle("dark", systemTheme === "dark")
    } else {
      root.classList.toggle("dark", theme === "dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme, attribute, enableSystem])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
