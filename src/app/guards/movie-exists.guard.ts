import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import { MoviesService } from '../services/movies.service';
import * as MovieActions from '../actions/movie.actions';
import * as fromMovies from '../reducers';

@Injectable({
  providedIn: 'root',
})
export class MovieExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromMovies.State>,
    private moviesService: MoviesService,
    private router: Router
  ) {}

  hasMovieInStore(id: number): Observable<boolean> {
    return this.store.pipe(
      select(fromMovies.getMovieEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }

  hasMovieInApi(id: number): Observable<boolean> {
    return this.moviesService.getMovieById(id).pipe(
      map(movieEntity => new MovieActions.Load(movieEntity)),
      tap((action: MovieActions.Load) => this.store.dispatch(action)),
      map(movie => !!movie),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  hasMovie(id: number): Observable<boolean> {
    return this.hasMovieInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasMovieInApi(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasMovie(Number(route.params['id']));
  }
}
