import { createAction, props } from '@ngrx/store';
import { Stop } from '../../utils/stop.model';
import { Trip } from '../../utils/trip.model';

export const apiPatternSuccess = createAction(
  '[Search API] API pattern success',
  props<{ patterns: { StopLocation: Stop[] | Stop } }>()
);
export const apiPatternFail = createAction('[Search API] API pattern fail');

export const apiTripSuccess = createAction(
  '[Search API] API trip success',
  props<{ trips: { TripList: { Trip: Trip[] } } }>()
);
export const apiTripFail = createAction('[Search API] API trip fail');
