import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Movie} from '../models/movie.interface';
import {MovieConfig} from '../config/movie.config';
import {find, flatMap, map, publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesMockDataPath: string;
  private moviesList$: Observable<Movie[]>;

  constructor(private http: HttpClient) {
    this.moviesMockDataPath = MovieConfig.jsonPath;
    console.log(MovieConfig.jsonPath);
  }

  public getMovies(): Observable<Movie[]> {
    if (!this.moviesList$) {
      this.moviesList$ = this.http.get(this.moviesMockDataPath).pipe(
        map((res: Movie[]) => res),
        publishReplay(1),
        refCount()
      );
    }
    return this.moviesList$;
  }

  public getMovieById(id: number): Observable<Movie> {
    return this.getMovies().pipe(
      flatMap(movies => Object.assign({}, movies)),
      find(movie => movie.id === id),
      publishReplay(1),
      refCount()
    );
  }

  public getMovieByKey(key: string): Observable<Movie> {
    return this.getMovies().pipe(
      flatMap(movies => movies),
      find(movie => movie.key === key),
      publishReplay(1),
      refCount()
    );
  }

}
