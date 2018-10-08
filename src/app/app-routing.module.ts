import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieListComponent} from './components/movie-list/movie-list.component';
import {MovieDetailComponent} from './components/movie-detail/movie-detail.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MovieExistsGuard} from './guards/movie-exists.guard';

const routes: Routes = [
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {path: 'movies', component: MovieListComponent},
  {path: 'movies/detail/:id/:key', component: MovieDetailComponent, canActivate: [MovieExistsGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
