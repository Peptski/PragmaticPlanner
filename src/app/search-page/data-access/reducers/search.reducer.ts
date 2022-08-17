import { createReducer, on } from '@ngrx/store';
import { Trip } from '../../utils/trip.model';
import * as SearchPageActions from '../actions/search-page.actions';

export interface State {
  trips: Trip[];
  selectedTrip: number | null;
  searchParams: string[];
  time: string;
  date: string;
  mode: string;
}

export const initialState: State = {
  trips: [],
  selectedTrip: null,
  searchParams: ['', '', ''],
  time: new Date().toLocaleTimeString().slice(0, -3),
  date: new Date().toLocaleDateString(),
  mode: 'arrival',
};

export const searchReducer = createReducer(
  initialState,
  on(SearchPageActions.enterSubmit, SearchPageActions.buttonSubmit, (state) => {
    return {
      ...state,
    };
    //API call effect
  }),
  on(SearchPageActions.updateSearchParams, (state, action) => {
    return {
      ...state,
      searchParams: state.searchParams.map((ele, i) =>
        action.index === i ? action.search : ele
      ),
    };
  }),
  on(SearchPageActions.updateTimeMode, (state, action) => {
    return {
      ...state,
      mode: action.mode,
    };
  }),
  on(SearchPageActions.updateTime, (state, action) => {
    return {
      ...state,
      time: action.time,
    };
  }),
  on(SearchPageActions.updateDate, (state, action) => {
    return {
      ...state,
      date: action.date,
    };
  })
);
