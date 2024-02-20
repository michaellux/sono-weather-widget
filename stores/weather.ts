import { defineStore } from 'pinia'
import axios from 'axios'
import type { WeatherResponse } from './../@types/weather'
interface WeatherStore {
 weatherNow: WeatherResponse,
 weatherNextNDays: Array<WeatherResponse>
}

export const useWeatherStore = defineStore('weather', {
  state: (): WeatherStore => ({
    weather: []
  }),
  actions: {
    async getAllWeatherData (city, days) {
      const apiKey = 'YOUR_API_KEY'
      const baseUrl = 'https://api.openweathermap.org/data/2.5'

      const currentWeatherResponse = await axios.get(`${baseUrl}/weather?q=${city}&appid=${apiKey}`)
      this.weatherNow = currentWeatherResponse.data

      const forecastResponse = await axios.get(`${baseUrl}/forecast?q=${city}&cnt=${days}&appid=${apiKey}`)
      this.weatherNextNDays = forecastResponse.data.list
    }
  }
})
