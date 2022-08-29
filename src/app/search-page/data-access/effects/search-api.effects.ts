import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';
import { Trip } from '../../utils/trip.model';
import { apiTripSuccess } from '../actions/search-page-api.actions';
import { buttonSubmit, enterSubmit } from '../actions/search-page.actions';
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
      concatMap(() => {
        return this.searchService
          .searchTrip('', '', '')
          .pipe(
            map((data: { TripList: { Trip: Trip[] } }) =>
              apiTripSuccess({ trips: data })
            )
          );
      })
    );
  });
}
