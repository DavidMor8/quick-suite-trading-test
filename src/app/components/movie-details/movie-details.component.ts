import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movieservice';
import { Movie } from 'src/app/interfaces/movie.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent  implements OnInit{
  
  movie: Movie | undefined;
  youtubeId: string | undefined;
  youtubeUrl: SafeResourceUrl | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private movieService: MovieService
  ){
   
  }

  ngOnInit(): void {
    this.loadMovieDetails();
  
  }


  loadMovieDetails(): void {
    const movieId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la película de la URL
    if (movieId) {
      this.movie = this.movieService.getMovieById(Number(movieId)); // Obtener la película por su ID
      console.log(this.movie?.youtubeId)

      if (this.movie && this.movie.youtubeId) {
        const videoUrl = 'https://www.youtube.com/embed/' + this.movie.youtubeId;
        this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
      }
    
      }
  
    }

    
  }


