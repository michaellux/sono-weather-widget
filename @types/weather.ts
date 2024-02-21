import { WeatherResponse } from './weather'
import { Weather } from './../.nuxt/components.d'
type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type MainWeatherData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

type Wind = {
  speed: number;
  deg: number;
};

type Coordinates = {
  lon: number;
  lat: number;
};

export type WeatherResponse = {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type Weather = {
  city: string;
  temp: number;
  humidity: number;
  windSpeed: number,
  weatherIcon: string;
} | null

export type WeatherResponseError = {
  cod: string
  message: string
} | null | string
