"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Thermometer, Wind, Droplets, Compass } from "lucide-react"
import WeatherIcon from "./WeatherIcon"
import { motion } from "framer-motion"
import type { WeatherData } from "@/utils/types"

export default function WeatherCard({ weather }: { weather: WeatherData | null }) {
  if (!weather) return null

  const { name, main, weather: desc, wind, sys } = weather
  const icon = desc[0].icon

  // Format date
  const date = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date)

  // Format time
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)

  // Wind direction
  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    return directions[Math.round(deg / 45) % 8]
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full mt-8 overflow-hidden border-none shadow-lg bg-white/10 backdrop-blur-md">
        <CardContent className="p-0">
          <motion.div
            className={`bg-gradient-to-r backdrop-blur-md text-white p-6`}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                  {name}
                  {sys.country && (
                    <motion.span
                      className="text-sm bg-white/20 px-2 py-1 rounded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {sys.country}
                    </motion.span>
                  )}
                </h2>
                <p className="text-white/80">
                  {formattedDate} • {formattedTime}
                </p>
              </motion.div>
              <motion.div
                className="flex items-center mt-4 md:mt-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <WeatherIcon iconCode={icon} description={desc[0].description} />
                </motion.div>
                <div className="ml-2">
                  <motion.p
                    className="text-3xl md:text-4xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {Math.round(main.temp)}°C
                  </motion.p>
                  <motion.p
                    className="capitalize text-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {desc[0].description}
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="flex flex-col items-center p-3 bg-white/20 backdrop-blur-md rounded-lg"
              variants={item}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Thermometer className="h-5 w-5 text-white mb-2" />
              <p className="text-sm text-white/70">Feels Like</p>
              <p className="font-semibold text-white">{Math.round(main.feels_like)}°C</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center p-3 bg-white/20 backdrop-blur-md rounded-lg"
              variants={item}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Wind className="h-5 w-5 text-white mb-2" />
              <p className="text-sm text-white/70">Wind</p>
              <p className="font-semibold text-white">{Math.round(wind.speed)} m/s</p>
              <p className="text-xs text-white/70">{getWindDirection(wind.deg)}</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center p-3 bg-white/20 backdrop-blur-md rounded-lg"
              variants={item}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Droplets className="h-5 w-5 text-white mb-2" />
              <p className="text-sm text-white/70">Humidity</p>
              <p className="font-semibold text-white">{main.humidity}%</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center p-3 bg-white/20 backdrop-blur-md rounded-lg"
              variants={item}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Compass className="h-5 w-5 text-white mb-2" />
              <p className="text-sm text-white/70">Pressure</p>
              <p className="font-semibold text-white">{main.pressure} hPa</p>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
