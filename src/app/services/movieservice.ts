import { Injectable } from '@angular/core';
import { mockData} from './mock'
import { Movie } from '../interfaces/movie.interface';
import { BehaviorSubject, Subject, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private watchlistKey = 'userWatchlist';
  private movies: Movie[] = mockData;
  watchLaterList: Movie[] = [];
 

  constructor() {
   
   }
  
   getAllWatchlistMovies(): Movie[] {
    return this.getUserWatchlist();
  }

  getMovieList (): any []{
    return mockData
  }

  sortMoviesByTitle(): any{
    return [...mockData].sort((a, b) => a.title.localeCompare(b.title));
  }

  sortMoviesByReleaseDate(): any {
    return [...mockData].sort((a, b) => new Date(a.releasedDate).getTime() - new Date(b.releasedDate).getTime());
  }

  getUserWatchlist(): Movie[] {
    const watchlist = localStorage.getItem(this.watchlistKey);
    return watchlist ? JSON.parse(watchlist) : [];
  }

  
  addToWatchlist(movie: Movie): void {
    const watchlist = this.getUserWatchlist();
    const updatedWatchlist = [...watchlist, movie];
   
    localStorage.setItem(this.watchlistKey, JSON.stringify(updatedWatchlist));
  }

  removeFromWatchlist(movieId: number): void {
    const watchlist = this.getUserWatchlist();
    const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
  
    localStorage.setItem(this.watchlistKey, JSON.stringify(updatedWatchlist));
  }
  
  getMovieById(id: number): Movie | undefined {
    return mockData.find(movie => movie.id === id); 
  }

  


}
