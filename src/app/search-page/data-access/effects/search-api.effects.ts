import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, withLatestFrom, catchError, of } from 'rxjs';
import { Detail } from '../../utils/detail.model';
import { Stop } from '../../utils/stop.model';
import { Trip } from '../../utils/trip.model';
import {
  apiDetailsFail,
  apiDetailsSuccess,
  apiPatternFail,
  apiPatternSuccess,
  apiTripFail,
  apiTripSuccess,
} from '../actions/search-page-api.actions';
import {
  buttonSubmit,
  enterSubmit,
  errorHandled,
  getDetails,
  updatePatternMatching,
} from '../actions/search-page.actions';
import { selectSearchData } from '../reducers/search.reducer';
import { SearchService } from '../search.service';

@Injectable()
export class SearchApiEffects {
  constructor(
    private searchService: SearchService,
    private actions$: Actions,
    private store: Store
  ) {}

  loadSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(buttonSubmit, enterSubmit),
      withLatestFrom(this.store.select(selectSearchData)),
      concatMap(([_, [mode, time, date, from, to, via, extraStop]]) => {
        return this.searchService
          .searchTrip(
            <string>mode,
            <string>time,
            <string>date,
            <string>from,
            <string>to,
            <string>via,
            <string>extraStop
          )
          .pipe(
            catchError((err) => {
              if (err.status === 401) this.searchService.newToken();

              this.store.dispatch(
                apiTripFail({ error: err.status.toString() })
              );

              setTimeout(() => {
                this.store.dispatch(errorHandled());
              }, 3500);

              return of();
            }),
            map((data: { TripList: { Trip: Trip[] } }) =>
              apiTripSuccess({ trips: data })
            )
          );
      })
    );
  });

  loadPattern$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePatternMatching),
      concatMap((action) => {
        return this.searchService.patternMatching(action.search).pipe(
          catchError((err: { status: number }) => {
            if (err.status === 401) this.searchService.newToken();

            this.store.dispatch(
              apiPatternFail({ error: err.status.toString() })
            );

            setTimeout(() => {
              this.store.dispatch(errorHandled());
            }, 3500);

            return of();
          }),
          map((data: { LocationList: { StopLocation: Stop[] | Stop } }) =>
            apiPatternSuccess({ patterns: data.LocationList })
          )
        );
      })
    );
  });

  loadDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDetails),
      concatMap((action) => {
        return this.searchService.getDetails(action.url).pipe(
          catchError((err) => {
            if (err.status === 401) this.searchService.newToken();

            this.store.dispatch(
              apiDetailsFail({ error: err.status.toString() })
            );

            setTimeout(() => {
              this.store.dispatch(errorHandled());
            }, 3500);

            return of();
          }),
          map((data: { JourneyDetail: Detail }) =>
            apiDetailsSuccess({ details: data, leg: action.leg })
          )
        );
      })
    );
  });
}
