import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit, OnChanges {
  
  safeTrailerUrl: SafeResourceUrl | null = null;
  movie!:Movie;
  movieId!:string;

  constructor(private movieService:MovieService,
    private route:ActivatedRoute,
    private router:Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.updateTrailerUrl();
    this.movieId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getMovie
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movie']) {
      this.updateTrailerUrl();
    }
  }

  private updateTrailerUrl(): void {
    if (this.movie?.trailer_url) {
      // Convertir URL de YouTube watch a embed si es necesario
      let embedUrl = this.movie.trailer_url;
      if (embedUrl.includes('watch?v=')) {
        embedUrl = embedUrl.replace('watch?v=', 'embed/');
      }
      this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else {
      this.safeTrailerUrl = null;
    }
  }


  getMovie(){
    if(!this.movieId) return;

    this.movieService.getMovie(this.movieId).subscribe((apiData) => {
      this.movie = apiData;
    });
  }

  goBack(): void {
    // Navega de regreso al listado principal.
    this.router.navigate(['/movie']);
  }
}
