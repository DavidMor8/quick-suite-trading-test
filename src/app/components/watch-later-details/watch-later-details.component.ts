import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movieservice';
import { Movie } from 'src/app/interfaces/movie.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-watch-later-details',
  templateUrl: './watch-later-details.component.html',
  styleUrls: ['./watch-later-details.component.css']
})
export class WatchLaterDetailsComponent  implements OnInit{

  movie: Movie | undefined;
  watchlist: Movie[] = [];
  youtubeUrl: SafeResourceUrl | undefined;
  youtubeId: string | undefined;

  
  allWatchlistMovies: Movie[] = [];

  constructor(
    private movieService: MovieService, 
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
  ){

  }

  ngOnInit(): void {
    this.loadMovieDetails();
    this.loadWatchlist(); 
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['movies']) {
        this.allWatchlistMovies = JSON.parse(params['movies']);
      }
    });
  }
  
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  
  loadMovieDetails(): void {
    const movieId = this.activatedRoute.snapshot.paramMap.get('id'); 
    if (movieId) {
      this.movie = this.movieService.getMovieById(Number(movieId)); 
      console.log(this.movie?.youtubeId)

      if (this.movie && this.movie.youtubeId) {
        const videoUrl = 'https://www.youtube.com/embed/' + this.movie.youtubeId;
        this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
      }
    
      }
  
    }


  loadWatchlist(): void {
    this.watchlist = this.movieService.getUserWatchlist();
  }
}