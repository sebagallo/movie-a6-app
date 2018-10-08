import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {asyncScheduler, empty, Observable, of} from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import {MoviesService} from '../services/movies.service';
import {
  MovieActionTypes,
  LoadAll,
  Search,
  SearchComplete,
  SearchError, LoadAllComplete, LoadAllError,
} from '../actions/movie.actions';
import {Movie} from '../models/movie.interface';

@Injectable()
export class MovieEffects {
  @Effect()
  search$ = ({debounce = 300, scheduler = asyncScheduler} = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<Search>(MovieActionTypes.Search),
      debounceTime(debounce, scheduler),
      map(action => action.payload),
      switchMap(query => {
        if (query === '') {
          return empty();
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(MovieActionTypes.Search),
          skip(1)
        );

        return this.moviesService.getMovies().pipe(
          takeUntil(nextSearch$),
          map((movies: Movie[]) => new SearchComplete(movies)),
          catchError(err => of(new SearchError(err)))
        );
      })
    )

  @Effect()
  load$ = (): Observable<Action> =>
    this.actions$.pipe(
      ofType<LoadAll>(MovieActionTypes.LoadAll),
      switchMap(() =>
        this.moviesService.getMovies().pipe(
          map((movies: Movie[]) => new LoadAllComplete(movies)),
          catchError(err => of(new LoadAllError(err)))
        )
      )
    )

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {
  }
}
