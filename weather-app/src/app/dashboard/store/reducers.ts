import { Action, createReducer, on } from '@ngrx/store';
import { DashboardStateInterface } from 'src/app/model/dashboardState.interface';
import {getWeatherDataAction, getWeatherDataFailureAction, getWeatherDataSuccessAction} from './actions/getWeatherData.action';

const initialState: DashboardStateInterface = {
  isLoading: false,
  isChangingCity: false,
  weatherData: null,
  chartsData: null,
  errors: null
};

const dashboardReducer = createReducer(
  initialState,

  on( getWeatherDataAction, (state): DashboardStateInterface => ({
    ...state,
    isLoading: true
  })),

  on( getWeatherDataSuccessAction, (state, action): DashboardStateInterface => ({
    ...state,
    weatherData: action.data,
    chartsData: {
          days: action.data.daily.map(day => {
            return {
              ...day,
              dt: +day.dt * 1000,
            };
          }),
          dates: action.data.daily.map(day => {
              const date = new Date(+day.dt * 1000);
              const dateString = `${date.getMonth() + 1}.${date.getDate()}`;
              return dateString;
          }),
          minTemp: action.data.daily.map(day => day.temp.min),
          maxTemp: action.data.daily.map(day => day.temp.max),
          pressure: action.data.daily.map(day => day.pressure),
          humidity: action.data.daily.map(day => day.humidity),
          wind: action.data.daily.map(day => day.wind_speed),
          uvi: action.data.daily.map(day => day.uvi)
      },
    errors: null,
    isLoading: false,
  })),

  on( getWeatherDataFailureAction, (state, action): DashboardStateInterface => ({
    ...state,
    isLoading: false,
    errors: action.error
  }))
);

export function reducer(state: DashboardStateInterface, action: Action): DashboardStateInterface {
  return dashboardReducer(state, action);
}

