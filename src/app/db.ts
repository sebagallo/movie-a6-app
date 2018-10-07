import { DBSchema } from '@ngrx/db';

export const schema: DBSchema = {
  version: 1,
  name: 'movies_app',
  stores: {
    movies: {
      autoIncrement: true,
      primaryKey: 'id',
    },
  },
};
