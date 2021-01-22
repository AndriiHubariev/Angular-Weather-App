export interface DailyWeatherInterface {
  dt: number | string;
  sunrise: number;
  sunset: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
  weather: [{
      id: number;
      main: string;
      description: string;
      icon: string;
  }];
  temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
}
