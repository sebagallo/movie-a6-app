import {Movie} from './movie.interface';

export interface ExtendedMovie extends Movie {
  isVisible?: boolean;
}
