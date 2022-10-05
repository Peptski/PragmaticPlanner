import { createAction, props } from '@ngrx/store';
import { Leg } from '../../utils/leg.model';

export const enterSubmit = createAction('[Search Page] Enter submit');
export const buttonSubmit = createAction('[Search Page] Button submit');
export const updateSearchParams = createAction(
  '[Search Page] Update search params',
  props<{ name: string; id: string; index: number }>()
);

export const updatePatternMatching = createAction(
  '[Search Page] Update pattern matching',
  props<{ search: string }>()
);

export const updateTimeMode = createAction(
  '[Search Page] Update time mode',
  props<{ mode: string }>()
);

export const updateTime = createAction(
  '[Search Page] Update time',
  props<{ time: string }>()
);

export const updateDate = createAction(
  '[Search Page] Update date',
  props<{ date: string }>()
);

export const toggleExtraStop = createAction(
  '[Search Page] Toggle extra stop',
  props<{ mode: boolean }>()
);

export const swapDestOrigin = createAction('[Search Page] Swap dest/origin');

export const getDetails = createAction(
  '[Search Page] Get details',
  props<{ url: string; leg: Leg }>()
);

export const clearDetails = createAction('[Search Page]  Clear details');

export const openTrip = createAction(
  '[Pearch Page] Open trip',
  props<{ id: number }>()
);

export const clearOpen = createAction('[Pearch Page] Close trip');
