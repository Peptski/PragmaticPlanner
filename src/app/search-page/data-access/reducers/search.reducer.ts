import {
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Trip } from '../../utils/trip.model';
import * as SearchPageActions from '../actions/search-page.actions';

export interface AppState {
  search: State;
}

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

export const reducer = createReducer(
  initialState,
  on(SearchPageActions.enterSubmit, SearchPageActions.buttonSubmit, (state) => {
    return {
      ...state,
    };
    //API Call effect
  }),
  on(SearchPageActions.updateSearchParams, (state, action) => {
    return {
      ...state,
      searchParams: state.searchParams
        .slice()
        .map((ele, i) => (action.index === i ? action.search : ele)),
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

export const selectSearchPageState = createFeatureSelector<State>('search');
export const selectSearchState = createSelector(
  selectSearchPageState,
  (searchPageState) => searchPageState.mode
);

export const selectMode = createSelector(
  selectSearchPageState,
  (state) => state.mode
);
export const selectTrips = createSelector(
  selectSearchPageState,
  (state) => state.trips
);
export const selectSelectedTripId = createSelector(
  selectSearchPageState,
  (state) => state.selectedTrip
);
export const selectSelectedTrip = createSelector(
  selectTrips,
  selectSelectedTripId,
  (trips, id) => {
    if (!id) return undefined;
    return trips[id];
  }
);
export const selectSearchParams = createSelector(
  selectSearchPageState,
  (state) => state.searchParams
);
export const selectTime = createSelector(
  selectSearchPageState,
  (state) => state.time
);
export const selectDate = createSelector(
  selectSearchPageState,
  (state) => state.date
);
