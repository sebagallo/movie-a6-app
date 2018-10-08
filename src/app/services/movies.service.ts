import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Movie} from '../models/movie.interface';
import {MovieConfig} from '../config/movie.config';
import {find, flatMap, map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesMockDataPath: string;
  private moviesList$: Observable<Movie[]>;

  constructor(private http: HttpClient) {
    this.moviesMockDataPath = MovieConfig.jsonPath;
  }

  public getMovies(): Observable<Movie[]> {
    if (!this.moviesList$) {
      this.moviesList$ = this.http.get(this.moviesMockDataPath).pipe(
        map((res: Movie[]) => res),
        shareReplay(1)
      );
    }
    return this.moviesList$;
  }

  public getMovieById(id: number): Observable<Movie> {
    return this.getMovies().pipe(
      flatMap(movies => movies),
      find(movie => movie.id === id),
    );
  }

  public getMovieByKey(key: string): Observable<Movie> {
    return this.getMovies().pipe(
      flatMap(movies => movies),
      find(movie => movie.key === key)
    );
  }

}
