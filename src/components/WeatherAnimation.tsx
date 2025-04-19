"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type WeatherAnimationProps = {
  weatherType: string
}

export default function WeatherAnimation({ weatherType }: WeatherAnimationProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; speed: number; delay: number }>
  >([])

  useEffect(() => {
    // Create particles based on weather type
    const createParticles = () => {
      const newParticles = []
      const count =
        weatherType === "Rain" || weatherType === "Drizzle"
          ? 50
          : weatherType === "Snow"
            ? 30
            : weatherType === "Clouds"
              ? 10
              : weatherType === "Clear"
                ? 15
                : 0

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // percentage across screen
          y: Math.random() * -100, // start above screen
          size:
            weatherType === "Snow"
              ? Math.random() * 5 + 2
              : weatherType === "Rain" || weatherType === "Drizzle"
                ? Math.random() * 1 + 1
                : Math.random() * 40 + 20,
          speed:
            weatherType === "Snow"
              ? Math.random() * 1 + 0.5
              : weatherType === "Rain" || weatherType === "Drizzle"
                ? Math.random() * 0.7 + 0.3
                : Math.random() * 0.05 + 0.01,
          delay: Math.random() * 5,
        })
      }
      setParticles(newParticles)
    }

    createParticles()
  }, [weatherType])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((particle) => {
        // Different animations based on weather type
        if (weatherType === "Rain" || weatherType === "Drizzle") {
          return (
            <motion.div
              key={particle.id}
              className="absolute bg-sky-200 opacity-70"
              style={{
                left: `${particle.x}%`,
                top: `-10px`,
                width: `${particle.size}px`,
                height: `${particle.size * 10}px`,
                borderRadius: "1px",
              }}
              initial={{ y: -10 }}
              animate={{
                y: ["0vh", "100vh"],
              }}
              transition={{
                duration: 1 / particle.speed,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.delay,
                ease: "linear",
              }}
            />
          )
        }

        if (weatherType === "Snow") {
          return (
            <motion.div
              key={particle.id}
              className="absolute bg-white rounded-full opacity-80"
              style={{
                left: `${particle.x}%`,
                top: `-10px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              initial={{ y: -10 }}
              animate={{
                y: ["0vh", "100vh"],
                x: [`${particle.x}%`, `${particle.x + (Math.random() * 10 - 5)}%`],
              }}
              transition={{
                duration: 7 / particle.speed,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.delay,
                ease: "linear",
              }}
            />
          )
        }

        if (weatherType === "Clouds") {
          return (
            <motion.div
              key={particle.id}
              className="absolute bg-white rounded-full opacity-30"
              style={{
                left: `${particle.x}%`,
                top: `${20 + Math.random() * 40}%`,
                width: `${particle.size}px`,
                height: `${particle.size * 0.6}px`,
                filter: "blur(10px)",
              }}
              animate={{
                x: [`${particle.x}%`, `${(particle.x + 10) % 100}%`],
              }}
              transition={{
                duration: 20 / particle.speed,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.delay,
                ease: "linear",
              }}
            />
          )
        }

        if (weatherType === "Clear") {
          return (
            <motion.div
              key={particle.id}
              className="absolute bg-yellow-200 rounded-full opacity-20"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y + 30}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 / particle.speed,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          )
        }

        return null
      })}
    </div>
  )
}
