import { MovieActionTypes, MovieActionsUnion } from '../actions/movie.actions';
import {SearchQuery} from '../models/search-query.interface';

export interface State {
  ids: number[];
  genres: string[];
  loading: boolean;
  error: string;
  query: SearchQuery;
}

const initialState: State = {
  ids: [],
  genres: [],
  loading: false,
  error: '',
  query: undefined,
};

export function reducer(state = initialState, action: MovieActionsUnion): State {
  switch (action.type) {
    case MovieActionTypes.Search: {
      if (action.payload === undefined) {
        return initialState;
      }

      return {
        ...state,
        loading: true,
        error: ''
      };
    }

    case MovieActionTypes.SearchComplete: {
      return {
        ids: action.payload.map(movie => movie.id),
        genres: action.payload
          .map(movie => movie.genres.join(',')).join(',').split(',')
          .filter((value, index, self) => self.indexOf(value) === index),
        loading: false,
        error: '',
        query: state.query
      };
    }

    case MovieActionTypes.SearchError: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;

export const getGenres = (state: State) => state.genres;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
