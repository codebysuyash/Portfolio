"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import Preloader from "./preloader"

interface PreloaderContextType {
  preloaderComplete: boolean
  setPreloaderComplete: (complete: boolean) => void
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined)

export function usePreloaderContext() {
  const context = useContext(PreloaderContext)
  if (!context) {
    throw new Error("usePreloaderContext must be used within PreloaderWrapper")
  }
  return context
}

export default function PreloaderWrapper({ children }: { children: ReactNode }) {
  const [preloaderComplete, setPreloaderComplete] = useState(false)

  return (
    <PreloaderContext.Provider value={{ preloaderComplete, setPreloaderComplete }}>
      <Preloader onComplete={() => setPreloaderComplete(true)} />
      {children}
    </PreloaderContext.Provider>
  )
}
