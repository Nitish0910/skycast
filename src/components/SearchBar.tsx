"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
  const [city, setCity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!city.trim()) return
    onSearch(city)
  }

  return (
    <motion.form onSubmit={handleSubmit} className="w-full" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <motion.div
          className="relative flex-grow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="pl-10 h-12 bg-white/20 backdrop-blur-md border-white/20 text-white placeholder:text-white/50"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            type="submit"
            className="h-12 px-6 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white w-full sm:w-auto border border-white/20"
          >
            Search
          </Button>
        </motion.div>
      </div>
    </motion.form>
  )
}
