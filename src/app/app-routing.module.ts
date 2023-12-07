import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { WatchLaterDetailsComponent } from './components/watch-later-details/watch-later-details.component';

const routes: Routes = [
  {path: '', component: MainViewComponent },
  { path: 'movie/:id', component: MovieDetailsComponent }, 
  { path: 'watch-later/:id', component: WatchLaterDetailsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
