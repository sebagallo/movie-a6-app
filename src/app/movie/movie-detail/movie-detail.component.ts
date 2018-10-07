import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {Movie} from '../models/movie.interface';
import {MovieConfig} from '../config/movie.config';
import {SeoService} from '../../seo.service';
import {Observable} from 'rxjs';
import {ExtendedMovie} from '../models/extended-movie.interface';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  public movie$: Observable<Movie>;
  public movieImagesPath: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private seo: SeoService,
              private moviesService: MoviesService) {
    this.movieImagesPath = MovieConfig.movieImagesPath;
  }

  ngOnInit() {
    this.initByKey();
  }

  private setSeo(movie: ExtendedMovie): void {
    this.seo.setTitle(movie.name);
    this.seo.setDescription(movie.description);
    this.seo.setKeywords(movie.genres);
  }

  private initByKey(): void {
    this.movie$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.moviesService.getMovieByKey(params.get('key'))),
      tap(movie => this.setSeo(movie))
    );
  }

}
