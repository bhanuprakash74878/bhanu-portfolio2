"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setThemeState(isDark ? "dark" : "light")
    setMounted(true)
  }, [])

  const applyTheme = useCallback((next: Theme) => {
    const root = document.documentElement
    root.classList.remove("dark", "light")
    root.classList.add(next)
    try {
      localStorage.setItem("theme", next)
    } catch {
      /* storage unavailable — ignore */
    }
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark")
  }, [applyTheme, theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: applyTheme }}>
      <span data-theme-mounted={mounted} className="contents">
        {children}
      </span>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
