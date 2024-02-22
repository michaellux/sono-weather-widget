import type { WeatherResponse, WeatherList, WeatherForShow, WeatherResponseError } from './../@types/weather'
import { API_URL, API_KEY } from '@/common/config'

const mapToWeather = (response: WeatherResponse): WeatherForShow => {
  return {
    temp: Math.round(response.main.temp),
    humidity: response.main.humidity,
    windSpeed: Number((response.wind.speed).toFixed(1)),
    weatherIcon: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
    city: response.name
  }
}

const getDayOfWeek = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[date.getDay()]
}

interface WeatherStore {
  city: string,
  weatherNow: WeatherForShow,
  weatherNextNDays: WeatherForShow[],
  isLoading: boolean,
  error: WeatherResponseError
}

const fetchWeatherData = async (endpoint: string, queryParams: string): Promise<any> => {
  const baseUrl = `http://${API_URL}`
  const response = await $fetch(`${baseUrl}${endpoint}?${queryParams}&appid=${API_KEY}`)
  return response
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
      try {
        const currentWeatherResponse = await fetchWeatherData('/weather', `q=${this.city}&units=metric`)
        this.weatherNow = mapToWeather(currentWeatherResponse)

        const forecastResponse = await fetchWeatherData('/forecast/daily', `q=${this.city}&units=metric&cnt=${days + 1}`) as WeatherList
        this.weatherNextNDays = forecastResponse.list.slice(1).map((element, index) => {
          return {
            id: index,
            day: getDayOfWeek(new Date(element.dt * 1000)),
            temp: Math.round(element.temp.day),
            humidity: element.humidity,
            windSpeed: Number((element.speed).toFixed(1)),
            weatherIcon: `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`,
            city: forecastResponse.city.name
          }
        })

        this.error = null
      } catch (error: any) {
        if ((error.data as WeatherResponseError)) {
          this.error = (error.data as WeatherResponseError)
        } else {
          this.error = 'An error occurred while fetching weather data.'
        }
      }
    }
  }
})
