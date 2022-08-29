import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';
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
import { SearchService } from '../search.service';

@Injectable()
export class SearchApiEffects {
  constructor(
    private searchService: SearchService,
    private actions$: Actions
  ) {}

  loadSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(buttonSubmit),
      concatMap((action) => {
        return (
          this.searchService
            //TDO data from submits
            .searchTrip('', '', '', '', '')
            .pipe(
              map((data: { TripList: { Trip: Trip[] } }) =>
                apiTripSuccess({ trips: data })
              )
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
