import { CurrentWeatherIntreface } from './currentWeather.interface';
import { DailyWeatherInterface } from './dailyWeater.interface';

export interface ResponseWeatherDataInterface {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeatherIntreface;
  minutely: [
    {
      dt: number;
      precipitation: number;
    }
  ];
  hourly: [
    {
      dt: number;
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
      dew_point: number;
      uvi: number;
      clouds: number;
      visibility: number;
      wind_speed: number;
      wind_deg: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: any;
        }
      ];
      pop: number;
    }
  ];
  daily: [DailyWeatherInterface];
  alerts: [
    {
      sender_name: string;
      event: string;
      start: number;
      end: number;
      description: string;
    }
  ];
}
