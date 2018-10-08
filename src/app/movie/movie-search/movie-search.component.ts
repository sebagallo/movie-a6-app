import {Component, OnInit} from '@angular/core';
import {debounceTime, distinct, distinctUntilChanged, flatMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MoviesService} from '../services/movies.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  public selectedMovie: string;
  public selectedCategory: string;
  private moviesNames: string[] = [];
  public moviesGenres: string[] = [];

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit() {
    this.moviesService.getMovies().pipe(
      flatMap(movies => movies),
      map(movie => movie.genres),
      flatMap(genres => genres),
      distinct(),
    ).subscribe(genres => this.moviesGenres.push(genres));
    this.moviesService.getMovies().pipe(
      flatMap(movies => movies),
      map(movie => movie.name),
    ).subscribe(names => this.moviesNames.push(names));
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? [] : this.moviesNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

}
