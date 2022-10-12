import { createAction, props } from '@ngrx/store';
import { Detail } from '../../utils/detail.model';
import { Leg } from '../../utils/leg.model';
import { Stop } from '../../utils/stop.model';
import { Trip } from '../../utils/trip.model';

export const apiPatternSuccess = createAction(
  '[Search API] API pattern success',
  props<{ patterns: { StopLocation: Stop[] | Stop } }>()
);
export const apiPatternFail = createAction(
  '[Search API] API pattern fail',
  props<{ error: string }>()
);

export const apiTripSuccess = createAction(
  '[Search API] API trip success',
  props<{ trips: { TripList: { Trip: Trip[] } } }>()
);
export const apiTripFail = createAction(
  '[Search API] API trip fail',
  props<{ error: string }>()
);

export const apiDetailsSuccess = createAction(
  '[Search API] API details success',
  props<{ details: { JourneyDetail: Detail }; leg: Leg }>()
);
export const apiDetailsFail = createAction(
  '[Search API] API details fail',
  props<{ error: string }>()
);
