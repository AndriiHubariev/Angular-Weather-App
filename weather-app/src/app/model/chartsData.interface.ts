import { DailyWeatherInterface } from "./dailyWeater.interface";

export interface ChartsDataInterface  {
    days: DailyWeatherInterface[] | [];
    dates: string[];
    minTemp: number[];
    maxTemp: number[];
    pressure: number[];
    humidity: number[];
    uvi: number[];
    wind: number[];
}
