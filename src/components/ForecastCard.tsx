"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import WeatherIcon from "./WeatherIcon"
import type { DailyForecast } from "@/utils/types"

type ForecastCardProps = {
  forecast: DailyForecast
  index: number
}

export default function ForecastCard({ forecast, index }: ForecastCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <Card className="p-2 bg-white/10 backdrop-blur-md border-white/10 flex flex-col items-center">
        <div className="flex flex-col items-center space-y-1 [&>*]:m-0">
          <p className="font-medium text-white">{forecast.day}</p>
          <p className="text-xs text-white/70">{forecast.date}</p>

          <div>
            <WeatherIcon iconCode={forecast.icon} description={forecast.description} className="w-10 h-10" />
          </div>

          <p className="text-xs capitalize text-white/80">{forecast.description}</p>

          <div className="flex gap-2 mt-1">
            <p className="text-sm font-semibold text-white">{Math.round(forecast.temp_max)}°</p>
            <p className="text-sm text-white/70">{Math.round(forecast.temp_min)}°</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
