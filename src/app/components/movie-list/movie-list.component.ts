import {Component, OnInit} from '@angular/core';
import {SeoService} from '../../services/seo.service';
import {CustomFilterPipe} from '../../pipes/custom-filter.pipe';

import { select, Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import * as MovieActions from '../../actions/movie.actions';
import * as fromMovies from '../../reducers';
import {Movie} from '../../models/movie.interface';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  public moviesList$: Observable<Movie[]>;

  constructor(private store: Store<fromMovies.State>,
              private seoService: SeoService,
              public customFilter: CustomFilterPipe) {
  }

  ngOnInit() {
    this.store.dispatch(new MovieActions.LoadAll());
    this.seoService.setDefaults();
    this.init();
  }

  private init(): void {
    this.moviesList$ = this.store.pipe(select(fromMovies.getAllMovies));
  }

}
