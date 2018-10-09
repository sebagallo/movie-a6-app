export interface Movie {
  id: number;
  key: string;
  name: string;
  description: string;
  genres: string[];
  rate: number;
  length: string;
  img: string;
}

export class MovieMock implements Movie {
  id: 24;
  key: 'bad-boys';
  name: 'Bad Boys';
  description: 'Two hip detectives protect a murder witness while investigating a case of stolen heroin.';
  genres: [
    'action',
    'comedy',
    'crime'
    ];
  rate: 6.8;
  length: '1hr 59mins';
  img: 'bad-boys.jpg';
}
