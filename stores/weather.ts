import type { WeatherResponse, Weather, WeatherResponseError } from './../@types/weather'
import { API_URL, API_KEY } from '@/common/config'
function mapToWeather (response: WeatherResponse): Weather {
  return {
    temp: response.main.temp,
    humidity: response.main.humidity,
    windSpeed: response.wind.speed,
    weatherIcon: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
    city: response.name
  }
}

interface WeatherStore {
  city: string,
  weatherNow: Weather,
  weatherNextNDays: Array<Weather>,
  isLoading: boolean,
  error: WeatherResponseError
}

export const useWeatherStore = defineStore('weather', {
  state: (): WeatherStore => ({
    city: 'Moscow',
    weatherNow: null,
    weatherNextNDays: [],
    isLoading: true,
    error: null
  }),
  actions: {
    async getAllWeatherData (days: number) {
      const baseUrl = `http://${API_URL}`

      try {
        const currentWeatherResponse = await $fetch(`${baseUrl}/weather?q=${this.city}&appid=${API_KEY}`) as WeatherResponse
        this.weatherNow = mapToWeather(currentWeatherResponse)
        this.error = null
      } catch (error: any) {
        if ((error.data as WeatherResponseError)) {
          this.error = (error.data as WeatherResponseError)
        } else {
          this.error = 'An error occurred while fetching weather data.';
        }
      }
    }
  }
})
