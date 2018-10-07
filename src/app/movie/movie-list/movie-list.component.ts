import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {SeoService} from '../../seo.service';
import {CustomFilterPipe} from '../../custom-filter.pipe';

import {Movie} from '../models/movie.interface';
import {Observable} from 'rxjs';
import {ExtendedMovie} from '../models/extended-movie.interface';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public moviesList$: Observable<ExtendedMovie[]>;

  constructor(private moviesService: MoviesService,
              private seoService: SeoService,
              private customFilter: CustomFilterPipe) {
  }

  ngOnInit() {
    this.seoService.setDefaults();
    this.init();
  }

  private init(): void {
    this.moviesList$ = this.moviesService.getMovies();
  }

  public moviesFilter(movies: ExtendedMovie[]): boolean {
    movies.forEach((movie, index) => {
      if (true) {
        movie.isVisible = true;
      } else {
        movie.isVisible = false;
      }
    });
    return true;
  }

}
