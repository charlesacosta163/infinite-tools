'use client'

import { LuMoon, LuSun } from 'react-icons/lu'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-accentOriginal/20 w-9 h-9" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-lg bg-accentOriginal/20 hover:bg-accentOriginal/30 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <LuMoon className="w-5 h-5 text-gray-700" />
      ) : (
        <LuSun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  )
}
