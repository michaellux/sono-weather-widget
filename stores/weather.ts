import { NextNDaysWeather } from './../.nuxt/components.d';
import type { WeatherResponse, Weather, WeatherList, WeatherForShow, WeatherResponseError } from './../@types/weather'
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
  weatherNextNDays: Array<WeatherForShow>,
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
        const currentWeatherResponse = await $fetch(`${baseUrl}/weather?q=${this.city}&units=metric&appid=${API_KEY}`) as WeatherResponse
        this.weatherNow = mapToWeather(currentWeatherResponse)

        const forecastResponse = await $fetch(`${baseUrl}/forecast/daily?q=${this.city}&units=metric&cnt=${days + 1}&appid=${API_KEY}`) as WeatherList
        console.log(forecastResponse)
        let foreCastData: Array<WeatherForShow> = []
        forecastResponse.list.forEach((element, index) => {
          if (element !== null && index !== 0) {
            foreCastData = [...foreCastData,
              {
                id: index,
                day: getDayOfWeek(new Date(element.dt * 1000)),
                temp: Math.round(element.temp.day),
                humidity: element.humidity,
                windSpeed: Number((element.speed).toFixed(1)),
                weatherIcon: `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`,
                city: forecastResponse.city.name
              }
            ]
          }
        })
        this.weatherNextNDays = foreCastData

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
