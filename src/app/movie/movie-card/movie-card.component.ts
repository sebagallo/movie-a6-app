import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Movie} from '../models/movie.interface';
import {MovieConfig} from '../config/movie.config';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovieCardComponent {

  public movieImagesPath: string;

  @Input() public movie: Movie;

  constructor() {
    this.movieImagesPath = MovieConfig.movieImagesPath;
  }

}
