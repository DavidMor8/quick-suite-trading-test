import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movieservice';
import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit{

  public movies : Movie [] = [];
  filteredMovies: Movie[] = [];
   searchText = '';
   searchTerm: string = '';
   lastThreeAddedMovies: Movie[] = [];
   showLastThreeAddedMenu: boolean = false;
   allWatchlistMovies: Movie[] = [];
   

  constructor(
    private movieService: MovieService,
    private router: Router){
    this.filteredMovies = this.movies;
    }

  ngOnInit(): void {
    this.movies = this.movieService.getMovieList();
    this.filteredMovies = this.movies;
    this.loadWatchlist();
    this.loadLastThreeAddedMovies();
  }
  

  

  sortMoviesByTitle(): void {
    this.clearSearch();
    this.filteredMovies = this.movieService.sortMoviesByTitle();
    
  }

  sortMoviesByReleaseDate(): void {
    this.clearSearch();
    this.filteredMovies = this.movieService.sortMoviesByReleaseDate();
  }

  addToWatchlist(movie: Movie): void {
    this.movieService.addToWatchlist(movie);
    movie.addedToWatchlist = true; 
    this.loadLastThreeAddedMovies()
  }

  removeFromWatchlist(movie: Movie): void {
    this.movieService.removeFromWatchlist(movie.id);
    movie.addedToWatchlist = false;
    this.loadLastThreeAddedMovies()
  }

  redirectToMovieDetails(movie: Movie): void {
    this.router.navigate(['/movie', movie.id]); 
  }



  loadWatchlist(): void {
    const watchlist = this.movieService.getUserWatchlist();
    if (watchlist.length > 0) {
      this.movies.forEach(movie => {
        const isOnWatchlist = watchlist.some(watchlistMovie => watchlistMovie.id === movie.id);
        movie.addedToWatchlist = isOnWatchlist;
      });
    }
  }

  searchMovies(): void {
    console.log(this.searchTerm);
    
    const searchTerm = this.searchTerm.toLowerCase().trim();
    if (!searchTerm) {
        this.filteredMovies = []; 
    } else {
        this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm)
      );
    }

      const regex = new RegExp(searchTerm, 'i');
      let filtered = this.movies.filter(movie => regex.test(movie.title.toLocaleLowerCase()));
        
      this.filteredMovies = filtered;
        
    }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchMovies();
  }

  showAllWatchlistMovies(): void {
    const allWatchlistMovies = this.movieService.getAllWatchlistMovies();
    this.router.navigate(['/watch-later/:id'], { queryParams: { movies: JSON.stringify(allWatchlistMovies) } });
  
  }
  loadLastThreeAddedMovies(): void {
    const watchlist = this.movieService.getUserWatchlist();
    const reversedWatchlist = [...watchlist].reverse(); 
    this.lastThreeAddedMovies = reversedWatchlist.slice(0, 3); 
    console.log(reversedWatchlist);
  }
  toggleLastThreeAddedMenu(): void {
    this.showLastThreeAddedMenu = !this.showLastThreeAddedMenu; 
    if (this.showLastThreeAddedMenu) {
      this.loadLastThreeAddedMovies(); 
    }
  }

  closeLastThreeAddedMenu(): void {
    this.showLastThreeAddedMenu = false;
  }


}
