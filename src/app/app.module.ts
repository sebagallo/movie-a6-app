import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {DBModule} from '@ngrx/db';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {schema} from './db';
import {reducers, metaReducers} from './reducers';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';

import {MovieListComponent} from './components/movie-list/movie-list.component';
import {MovieCardComponent} from './components/movie-card/movie-card.component';
import {MovieDetailComponent} from './components/movie-detail/movie-detail.component';
import {MovieSearchComponent} from './components/movie-search/movie-search.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {CustomFilterPipe} from './pipes/custom-filter.pipe';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MovieEffects} from './effects/movie.effects';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieCardComponent,
    MovieSearchComponent,
    HeaderComponent,
    FooterComponent,
    CustomFilterPipe,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Movies Test App',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([MovieEffects]),
    DBModule.provideDB(schema)
  ],
  providers: [
    CustomFilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
