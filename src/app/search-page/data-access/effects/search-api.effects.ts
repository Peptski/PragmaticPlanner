import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, withLatestFrom } from 'rxjs';
import { Stop } from '../../utils/stop.model';
import { Trip } from '../../utils/trip.model';
import {
  apiPatternSuccess,
  apiTripSuccess,
} from '../actions/search-page-api.actions';
import {
  buttonSubmit,
  enterSubmit,
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
      concatMap(([_, [mode, time, date, from, to]]) => {
        return this.searchService
          .searchTrip(mode, time, date, from, to)
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
}
