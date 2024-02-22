interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
};

interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

interface Wind {
  speed: number;
  deg: number;
};

interface Coordinates {
  lon: number;
  lat: number;
};

export interface WeatherResponse {
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

export interface Weather {
  dt: number,
  weather: WeatherCondition[]
  humidity: number;
  speed: number;
  temp: {
    day: number;
  }
}

export interface WeatherList {
  city: {
    name: string;
  };
  list: Weather[]
}

export type WeatherForShow = {
  id?: number;
  day?: string;
  city: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  weatherIcon: string;
} | null

export type WeatherResponseError = {
  cod: string
  message: string
} | null | string
