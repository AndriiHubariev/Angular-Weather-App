import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { DataSourceService } from 'src/app/services/data-source.service';
import {
  getWeatherDataAction,
  getWeatherDataFailureAction,
  getWeatherDataSuccessAction,
} from '../actions/getWeatherData.action';
import { ResponseWeatherDataInterface } from 'src/app/model/responseWeatherData.interface';

@Injectable()
export class FetchEffect {
  getWeatherData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getWeatherDataAction),
      switchMap(({coords}) => {
        return this.dataSourceService
          .getWeatherData(coords.lat, coords.lon)
          .pipe(
            map((response: ResponseWeatherDataInterface) => {
              return getWeatherDataSuccessAction({data: response});
            }),
            catchError((errors: HttpErrorResponse) =>
              of(getWeatherDataFailureAction(errors))
            )
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dataSourceService: DataSourceService
  ) {}
}
