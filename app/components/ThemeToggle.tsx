'use client'

import { Switch } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes"

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const ToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Switch 
      variant="surface" 
      size="3" 
      color="yellow" 
      checked={theme === "dark"}
      onCheckedChange={ToggleTheme}
    />
  )
}

export default ThemeToggle