import { ChartsDataInterface } from "./chartsData.interface";
import { ResponseWeatherDataInterface } from "./responseWeatherData.interface";

export interface DashboardStateInterface {
  isLoading: boolean;
  isChangingCity: boolean;
  weatherData: ResponseWeatherDataInterface | null;
  chartsData: ChartsDataInterface;
  errors: any;
}
