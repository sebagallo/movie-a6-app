export interface IMovieConfig {
  jsonPath: string;
  movieImagesPath: string;
  websiteName: string;
  breadcrumbsSeparator: string;
  defaultDescription: string;
  defaultKeywords: string[];
}

export const MovieConfig: IMovieConfig = {
  jsonPath: './assets/movie.mock-data.json',
  movieImagesPath: './assets/images/movie-covers/',
  websiteName: 'The Movie DataBase',
  breadcrumbsSeparator: ' - ',
  defaultDescription: 'Enjoy our immense catalogue of movies!',
  defaultKeywords: ['movie', 'film', 'cinema', 'streaming', 'download', 'torrent']
};
