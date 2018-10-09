import {
  createSelector,
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromMovies from './movies.reducer';
import {environment} from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';

export interface State {
  router: fromRouter.RouterReducerState;
  search: fromSearch.State;
  movies: fromMovies.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  search: fromSearch.reducer,
  movies: fromMovies.reducer
};

export const getMoviesState = (state: State) => state.movies;

export const getSelectedMovieId = createSelector(
  getMoviesState,
  fromMovies.getSelectedId
);

export const {
  selectIds: getMovieIds,
  selectEntities: getMovieEntities,
  selectAll: getAllMovies,
  selectTotal: getTotalMovies,
} = fromMovies.adapter.getSelectors(getMoviesState);

export const getSelectedMovie = createSelector(
  getMovieEntities,
  getSelectedMovieId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getSearchState = (state: State) => state.search;

export const getSearchMovieIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchMovieGenres = createSelector(
  getSearchState,
  fromSearch.getGenres
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError
);

export const getSearchResults = createSelector(
  getMovieEntities,
  getSearchMovieIds,
  (movies, searchIds) => {
    return searchIds.map(id => movies[id]);
  }
);

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
