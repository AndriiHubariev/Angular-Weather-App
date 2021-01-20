import { ResponseWeatherDataInterface } from "./responseWeatherData.interface";

export interface DashboardStateInterface {
  isLoading: boolean;
  isChangingCity: boolean;
  weatherData: ResponseWeatherDataInterface | null;
  errors: any;
}
