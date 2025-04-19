/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import SearchBar from "@/components/SearchBar"
import WeatherCard from "@/components/WeatherCard"
import Forecast from "@/components/Forecast"
import { Loader2 } from "lucide-react"
import { getWeatherBackground } from "@/utils/weatherBackground"
import type { WeatherData } from "@/utils/types"
import { motion, AnimatePresence } from "framer-motion"
import WeatherAnimation from "@/components/WeatherAnimation"

type Coordinates = {
  lat: number | null
  lon: number | null
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<Coordinates>({ lat: null, lon: null })
  const [currentCity, setCurrentCity] = useState<string>("")

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      if (!res.ok) throw new Error("City not found")
      const data: WeatherData = await res.json()
      setWeather(data)
      setCurrentCity(city)
      localStorage.setItem("lastCity", city)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const fetchLocationByIP = async () => {
    try {
      const res = await fetch("http://ip-api.com/json/")
      const data = await res.json()
      if (data.status === "success") {
        setLocation({ lat: data.lat, lon: data.lon })
        fetchWeather(data.city)
      } else {
        throw new Error("IP location failed")
      }
    } catch (err) {
      console.error("Error fetching IP location:", err)
      const lastCity = localStorage.getItem("lastCity")
      if (lastCity) fetchWeather(lastCity)
      else setError("Unable to fetch location")
    }
  }

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      )
      if (!res.ok) throw new Error("Failed to fetch weather by coordinates")
      const data: WeatherData = await res.json()
      setWeather(data)
      setCurrentCity(data.name)
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching coordinates")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity")
    if (lastCity) {
      fetchWeather(lastCity)
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        },
        (err) => {
          console.warn("Geolocation denied:", err.message)
          fetchLocationByIP()
        },
      )
    } else {
      console.warn("Geolocation not supported.")
      fetchLocationByIP()
    }
  }, [])

  useEffect(() => {
    if (location.lat !== null && location.lon !== null) {
      fetchWeatherByCoords(location.lat, location.lon)
    }
  }, [location.lat, location.lon])
  return (
    <div className="min-h-screen relative overflow-hidden">
      {weather?.weather?.[0]?.main && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          src={getWeatherBackground(weather.weather[0].main)}
        />
      )}
  
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />
  
      {weather && <WeatherAnimation weatherType={weather.weather[0].main} />}
  
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 flex flex-col items-center relative z-10"
      >
        <div className="w-full max-w-3xl">
          {/* HEADER */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
            >
              SkyCast <span className="inline-block animate-pulse">🌤️</span>
            </motion.h1>
            <motion.p
              className="text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Check the weather anywhere in the world
            </motion.p>
          </motion.div>
  
          {/* SEARCH BAR */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchBar onSearch={fetchWeather} />
          </motion.div>
  
          {/* CONTENT */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center my-12"
              >
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </motion.div>
            )}
  
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-red-500/70 backdrop-blur-sm border border-red-400 text-white px-4 py-3 rounded relative mt-6 text-center"
              >
                {error}
              </motion.div>
            )}
  
            {!loading && !error && weather && (
              <motion.div key="weather-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div
                  key="weather-card"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <WeatherCard weather={weather} />
                </motion.div>
  
                {currentCity && <Forecast city={currentCity} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  )
  
}
