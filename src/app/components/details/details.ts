import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/movie-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
  constructor(private _movieService : MovieService, private _route: ActivatedRoute){}

  movie!: any ;
  movieId: string = '';
 recommendedMovies: any[] = [];
  // ngOnInit(): void {
  //   this.movieId = this._route.snapshot.params['id'];
  //   this.getMovie(this.movieId);

  //    this._movieService.getRecommendations(4).subscribe((data) => {
  //   this.recommendedMovies = data.results;
  // });
  // }

   ngOnInit(): void {
    
    this._route.params.subscribe(params => {
      this.movieId = params['id'];             
      this.loadMovie(this.movieId);
      this.loadRecommendations(this.movieId);
    });
  }

  
  private loadMovie(id: string | number): void {
    this.movie = null;                   
    this._movieService.getMovieById(this.movieId).subscribe({
      next: data => (this.movie = data),
      error: err => console.error(err)
    });
  }

 
  private loadRecommendations(id: string | number): void {
    this.recommendedMovies = [];             // reset
    const random = Math.floor(Math.random() * 5) + 1;
    this._movieService.getRecommendations(random).subscribe({
      next: data => (this.recommendedMovies = data.results),
      error: err => console.error(err)
    });
  }
getStrokeColor(vote: number): string {
  if (vote < 5) return '#dc3545';
  if (vote < 7) return '#ffc107';
  return '#28a745';
}
}
