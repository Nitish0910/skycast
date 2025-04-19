"use client"

import { motion } from "framer-motion"

type WeatherIconProps = {
  iconCode: string
  description: string
  className?: string
}

export default function WeatherIcon({ iconCode, description, className = "w-16 h-16" }: WeatherIconProps) {
  return (
    <motion.img
      src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
      alt={description}
      className={className}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    />
  )
}
