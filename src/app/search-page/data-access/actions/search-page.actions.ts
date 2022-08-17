import { createAction, props } from '@ngrx/store';

export const enterSubmit = createAction('[Search Page] Enter submit');
export const buttonSubmit = createAction('[Search Page] Button submit');
export const updateSearchParams = createAction(
  '[Search Page] Update search params',
  props<{ search: string; index: number }>()
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
