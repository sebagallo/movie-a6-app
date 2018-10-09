import {TestBed} from '@angular/core/testing';

import {MoviesService} from './movies.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MovieMock} from '../models/movie.interface';
import {MovieConfig} from '../config/movie.config';

describe('MoviesService', () => {
  let httpMock: HttpTestingController;
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getMovies', () => {
    it('should return an Observable<Movie[]>', () => {
      const mockMovies = [
        new MovieMock,
        new MovieMock
      ];

      service.getMovies().subscribe(movies => {
        expect(movies.length).toBe(2);
        expect(movies).toEqual(mockMovies);
      });

      const req = httpMock.expectOne(`${MovieConfig.jsonPath}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockMovies);

      httpMock.verify();
    });
  });

});
