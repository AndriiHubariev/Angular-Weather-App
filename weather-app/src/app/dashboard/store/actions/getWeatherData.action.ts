import { createAction, props } from '@ngrx/store';
import { CoordsInterface } from 'src/app/model/coords.interface';
import { ResponseWeatherDataInterface } from 'src/app/model/responseWeatherData.interface';
import { ActionTypes } from '../actionTypes';

export const getWeatherDataAction = createAction(
  ActionTypes.GET_WEATHER_DATA,
  props<CoordsInterface>()
);

export const getWeatherDataSuccessAction = createAction(
  ActionTypes.GET_WEATHER_DATA_SUCCESS,
  props<ResponseWeatherDataInterface>()
);

export const getWeatherDataFailureAction = createAction(
  ActionTypes.GET_WEATHER_DATA_FAILURE,
  props<{ error: any }>()
);
