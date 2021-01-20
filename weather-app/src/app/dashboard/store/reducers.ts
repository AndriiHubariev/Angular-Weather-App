import { Action, createReducer, on } from '@ngrx/store';
import { DashboardStateInterface } from 'src/app/model/dashboardState.interface';
import {getWeatherDataAction, getWeatherDataFailureAction, getWeatherDataSuccessAction} from './actions/getWeatherData.action';

const initialState: DashboardStateInterface = {
  isLoading: false,
  isChangingCity: false,
  weatherData: null,
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
    isLoading: false,
    weatherData: action,
    errors: null
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

