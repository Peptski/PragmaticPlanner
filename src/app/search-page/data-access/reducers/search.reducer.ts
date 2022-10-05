import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Leg } from '../../utils/leg.model';
import { Stop } from '../../utils/stop.model';
import { Trip } from '../../utils/trip.model';
import {
  apiDetailsSuccess,
  apiDetailsFail,
  apiPatternSuccess,
  apiPatternFail,
  apiTripSuccess,
  apiTripFail,
} from '../actions/search-page-api.actions';
import * as SearchPageActions from '../actions/search-page.actions';

export interface AppState {
  search: State;
}

export interface State {
  trips: Trip[];
  details: { details: Stop[]; leg: Leg }[];
  open: number;
  searchParams: [string, string][];
  searchPattern: [string, string][];
  extraStop: Boolean;
  time: string;
  date: string;
  mode: string;
}

export const initialState: State = {
  trips: [],
  details: [],
  open: -1,
  searchParams: [
    ['', ''],
    ['', ''],
    ['', ''],
  ],
  searchPattern: [],
  extraStop: false,
  time: new Date().toLocaleTimeString().slice(0, -3),
  date: new Date().toLocaleDateString(),
  mode: 'departure',
};

export const reducer = createReducer(
  initialState,
  on(apiTripSuccess, (state, action) => {
    return {
      ...state,
      trips: action.trips.TripList.Trip,
      details: [],
    };
  }),
  on(apiDetailsSuccess, (state, action) => {
    let include = false;
    const origin = action.leg.Origin.name;
    const dest = action.leg.Destination.name;
    return {
      ...state,
      details: [
        ...state.details,
        {
          details: <Stop[]>action.details.JourneyDetail.Stop.filter((stop) => {
            if (stop.name === origin) include = true;
            if (stop.name === dest) {
              include = false;
              return true;
            }
            return include;
          }),
          leg: action.leg,
        },
      ],
    };
  }),
  on(apiPatternSuccess, (state, action) => {
    if (Array.isArray(action.patterns.StopLocation)) {
      return {
        ...state,
        searchPattern: action.patterns.StopLocation.map((ele) => [
          ele.name,
          String(ele.id),
        ]),
      };
    }
    return {
      ...state,
      searchPattern: [<Stop>action.patterns.StopLocation].map((ele) => [
        ele.name,
        String(ele.id),
      ]),
    };
  }),
  on(SearchPageActions.updateSearchParams, (state, action) => {
    return {
      ...state,
      searchParams: state.searchParams
        .slice()
        .map((ele, i) =>
          action.index === i ? [action.name, String(action.id)] : ele
        ),
      searchPattern: [],
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
  }),
  on(SearchPageActions.toggleExtraStop, (state, action) => {
    return {
      ...state,
      extraStop: action.mode,
    };
  }),
  on(SearchPageActions.swapDestOrigin, (state) => {
    return {
      ...state,
      searchParams: state.searchParams.slice().reverse(),
    };
  }),
  on(SearchPageActions.clearDetails, (state) => {
    return {
      ...state,
      details: [],
    };
  }),
  on(SearchPageActions.openTrip, (state, action) => {
    return {
      ...state,
      open: action.id === state.open ? -1 : action.id,
    };
  }),
  on(SearchPageActions.clearOpen, (state) => {
    return {
      ...state,
      open: -1,
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

export const selectOpenId = createSelector(
  selectSearchPageState,
  (state) => state.open
);

export const selectSearchParams = createSelector(
  selectSearchPageState,
  (state) => state.searchParams
);

export const selectPatternMatching = createSelector(
  selectSearchPageState,
  (state) => state.searchPattern
);

export const selectTime = createSelector(
  selectSearchPageState,
  (state) => state.time
);

export const selectDate = createSelector(
  selectSearchPageState,
  (state) => state.date
);

export const selectSearchData = createSelector(
  selectSearchPageState,
  (state) => [
    state.mode,
    state.time,
    state.date,
    state.searchParams[0][1],
    state.searchParams[1][1],
    state.searchParams[2][1],
    state.extraStop,
  ]
);

export const selectDetails = createSelector(
  selectSearchPageState,
  (state) => state.details
);
