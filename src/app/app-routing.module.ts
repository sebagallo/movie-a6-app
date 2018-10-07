import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieListComponent} from './movie/movie-list/movie-list.component';
import {MovieDetailComponent} from './movie/movie-detail/movie-detail.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {path: 'movies', component: MovieListComponent},
  {path: 'movies/detail/:key', component: MovieDetailComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
