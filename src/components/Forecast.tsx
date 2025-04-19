/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ForecastCard from "./ForecastCard"
import { processForecastData } from "@/utils/forecastUtils"
import type { DailyForecast, ForecastData } from "@/utils/types"
import { Loader2 } from "lucide-react"

type ForecastProps = {
  city: string
}

export default function Forecast({ city }: ForecastProps) {
  const [forecast, setForecast] = useState<DailyForecast[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  useEffect(() => {
    const fetchForecast = async () => {
      if (!city) return

      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
        )

        if (!res.ok) throw new Error("Failed to fetch forecast")

        const data: ForecastData = await res.json()
        const processedData = processForecastData(data)
        setForecast(processedData)
      } catch (err: any) {
        console.error("Error fetching forecast:", err)
        setError(err.message || "Failed to load forecast")
      } finally {
        setLoading(false)
      }
    }

    fetchForecast()
  }, [city, API_KEY])

  if (loading) {
    return (
      <div className="flex justify-center my-4">
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      </div>
    )
  }

  if (error) {
    return (
      <motion.p className="text-red-300 text-center text-sm mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {error}
      </motion.p>
    )
  }

  if (forecast.length === 0) {
    return null
  }

  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-xl font-semibold mb-3 text-white drop-shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        5-Day Forecast
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <ForecastCard key={day.date} forecast={day} index={index} />
        ))}
      </div>
    </motion.div>
  )
}
