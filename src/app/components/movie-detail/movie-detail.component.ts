import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {Movie} from '../../models/movie.interface';
import {MovieConfig} from '../../config/movie.config';
import {SeoService} from '../../services/seo.service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromMovies from '../../reducers';
import * as MovieActions from '../../actions/movie.actions';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  public movie$: Observable<Movie>;
  public movieImagesPath: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private seo: SeoService,
              private store: Store<fromMovies.State>) {
    this.movieImagesPath = MovieConfig.movieImagesPath;
  }

  ngOnInit() {
    this.initById();
  }

  private setSeo(movie: Movie): void {
    this.seo.setTitle(movie.name);
    this.seo.setDescription(movie.description);
    this.seo.setKeywords(movie.genres);
  }

  private initById(): void {
    this.route.paramMap.pipe(
      map((params: ParamMap) => new MovieActions.Select(Number(params.get('id'))))
    ).subscribe(this.store);
    this.movie$ = this.store.pipe(
      select(fromMovies.getSelectedMovie),
      tap(movie => this.setSeo(movie))
    );
  }

  ngOnDestroy() {
  }

}
