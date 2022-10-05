import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, withLatestFrom, catchError, Observable } from 'rxjs';
import { Detail } from '../../utils/detail.model';
import { Stop } from '../../utils/stop.model';
import { Trip } from '../../utils/trip.model';
import {
  apiDetailsSuccess,
  apiPatternSuccess,
  apiTripSuccess,
} from '../actions/search-page-api.actions';
import {
  buttonSubmit,
  enterSubmit,
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
        return this.searchService
          .patternMatching(action.search)
          .pipe(
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
        return this.searchService
          .getDetails(action.url)
          .pipe(
            map((data: { JourneyDetail: Detail }) =>
              apiDetailsSuccess({ details: data, leg: action.leg })
            )
          );
      })
    );
  });
}
