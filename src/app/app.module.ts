import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { WatchLaterDetailsComponent } from './components/watch-later-details/watch-later-details.component';


@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    MovieDetailsComponent,
    WatchLaterDetailsComponent,
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
