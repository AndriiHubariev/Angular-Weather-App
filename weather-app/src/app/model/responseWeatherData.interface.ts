import { CurrentWeatherIntreface } from './currentWeather.interface';
import { DailyWeatherInterface } from './dailyWeater.interface';
import { HourlyWeatherInterface } from './hourlyWeather.interface';

export interface ResponseWeatherDataInterface {
  current: CurrentWeatherIntreface;
  daily: DailyWeatherInterface[];
  hourly: HourlyWeatherInterface[];
  lat: number;
  lon: number;
  minutely: [];
  timezone: string;
  timezone_offset: number;
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
