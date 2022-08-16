import { createReducer, on } from '@ngrx/store';
import { Trip } from '../../utils/trip.model';
import * as SearchPageActions from '../actions/search-page.actions';

export interface State {
  trips: Trip[];
  searchParams: string[];
  time: string;
  date: string;
  mode: string;
}

export const initialState: State = {
  trips: [],
  searchParams: ['', '', ''],
  time: new Date().toLocaleTimeString().slice(0, -3),
  date: new Date().toLocaleDateString(),
  mode: 'arrival',
};

export const reducer = createReducer(
  initialState,
  on(SearchPageActions.enterSubmit, (state) => {
    return {
      ...state,
    };
    //API call?
  })
);
