import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, flatMap, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as MovieActions from '../../actions/movie.actions';
import * as fromMovies from '../../reducers';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  public selectedMovie: string;
  public selectedCategory: string;
  private moviesNames: string[] = [];
  public moviesGenres$: Observable<string[]>;

  constructor(private store: Store<fromMovies.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new MovieActions.LoadAll());
    this.moviesGenres$ = this.store.pipe(select(fromMovies.getSearchMovieGenres));

    // TODO: Put this into the movies.reducer
    this.store.pipe(select(fromMovies.getAllMovies),
      flatMap(movies => movies),
      map(movie => movie.name),
    ).subscribe(names => this.moviesNames.push(names));
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(50),
      distinctUntilChanged(),
      tap(x => this.store.dispatch(new MovieActions.Search({genre: this.selectedCategory, name: x}))),
      map(term => term.length < 2 ? [] : this.moviesNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  onSelectedGenre = () => {
    console.log(this.selectedCategory);
    this.store.dispatch(new MovieActions.Search({genre: this.selectedCategory, name: this.selectedMovie}));
  }

}
