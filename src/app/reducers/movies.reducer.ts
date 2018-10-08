import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Movie } from '../models/movie.interface';
import { MovieActionsUnion, MovieActionTypes } from '../actions/movie.actions';

export interface State extends EntityState<Movie> {
  selectedMovieId: number | null;
}

export const adapter: EntityAdapter<Movie> = createEntityAdapter<Movie>({
  selectId: (movie: Movie) => movie.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedMovieId: null,
});

export function reducer(
  state = initialState,
  action: MovieActionsUnion
): State {
  switch (action.type) {
    case MovieActionTypes.LoadAllComplete:
    case MovieActionTypes.SearchComplete: {
      return adapter.addMany(action.payload, state);
    }
    case MovieActionTypes.Load: {
      return adapter.addOne(action.payload, state);
    }
    case MovieActionTypes.Select: {
      return {
        ...state,
        selectedMovieId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedMovieId;
