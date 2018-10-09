import { Action } from '@ngrx/store';
import { Movie } from '../models/movie.interface';
import {SearchQuery} from '../models/search-query.interface';

export enum MovieActionTypes {
  Search = '[Movie] Search',
  SearchComplete = '[Movie] Search Complete',
  SearchError = '[Movie] Search Error',
  Load = '[Movie] Load',
  LoadAll = '[Movie] LoadAll',
  LoadAllComplete = '[Movie] LoadAll Complete',
  LoadAllError = '[Movie] LoadAll Error',
  Select = '[Movie] Select',
}

export class Search implements Action {
  readonly type = MovieActionTypes.Search;

  constructor(public payload: SearchQuery) {}
}

export class SearchComplete implements Action {
  readonly type = MovieActionTypes.SearchComplete;

  constructor(public payload: Movie[]) {}
}

export class SearchError implements Action {
  readonly type = MovieActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = MovieActionTypes.Load;

  constructor(public payload: Movie) {}
}

export class LoadAll implements Action {
  readonly type = MovieActionTypes.LoadAll;

  constructor() {}
}

export class LoadAllComplete implements Action {
  readonly type = MovieActionTypes.LoadAllComplete;

  constructor(public payload: Movie[]) {}
}

export class LoadAllError implements Action {
  readonly type = MovieActionTypes.LoadAllError;

  constructor(public payload: string) {}
}

export class Select implements Action {
  readonly type = MovieActionTypes.Select;

  constructor(public payload: number) {}
}

export type MovieActionsUnion =
  | Search
  | SearchComplete
  | SearchError
  | Load
  | LoadAll
  | LoadAllComplete
  | LoadAllError
  | Select;
