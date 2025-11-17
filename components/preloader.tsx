"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [displayNumber, setDisplayNumber] = useState(0)
  const [enterClicked, setEnterClicked] = useState(false)

  useEffect(() => {
    // Smooth counter from 0 to 100
    let currentNumber = 0
    
    const interval = setInterval(() => {
      currentNumber += 1
      if (currentNumber >= 100) {
        currentNumber = 100
        setDisplayNumber(100)
        clearInterval(interval)
      } else {
        setDisplayNumber(currentNumber)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [])

  const handleScreenTap = () => {
    if (displayNumber === 100) {
      setEnterClicked(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 800)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            onClick={handleScreenTap}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              backgroundColor: "#000000",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              gap: "2rem",
              cursor: "default",
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Expanding White Line Overlay */}
            {enterClicked && (
              <motion.div
                style={{
                  position: "fixed",
                  inset: 0,
                  backgroundColor: "#FFFFFF",
                  zIndex: 60,
                }}
                initial={{ scaleY: 0, transformOrigin: "center" }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            )}

            {/* Progress Bar Container */}
            <motion.div
              style={{
                width: "90%",
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.2rem",
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Audio Text */}
              <motion.p
                style={{
                  color: "#F5F5F5",
                  fontSize: "1rem",
                  fontWeight: "500",
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  letterSpacing: "0.08em",
                  margin: 0,
                  marginBottom: "-1rem",
                  textAlign: "center",
                  maxWidth: "90%",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                THIS SITE SOUNDS BETTER WITH AUDIO
              </motion.p>

              {/* Filling Progress Line - Static container, filling inside */}
              <motion.div
                style={{
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#333333",
                  borderRadius: "1px",
                  overflow: "hidden",
                  position: "relative",
                }}
                initial={{ opacity: 0, scaleX: 0, transformOrigin: "left" }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.4, ease: "easeOut" }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    backgroundColor: "#FFFFFF",
                    width: `${displayNumber}%`,
                    borderRadius: "1px",
                  }}
                  transition={{ duration: 0.05 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
