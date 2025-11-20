import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
import { movieData } from '../movieData';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  

  constructor(private movieService:MovieService, private router:Router) {}

  ngOnInit() {
    this.getMoviesList();
  }

  getMoviesList(): void{
    this.movieService.getMovies().subscribe((data)=>{
      this.movies=data;
    });
  }

  onSelect(movie: Movie) {
    this.router.navigate(['/movie', movie.id]);
  }
}
