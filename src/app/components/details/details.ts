import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/movie-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LanguageService } from '../../shared/language-service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  imports: [CommonModule,RouterLink,TranslateModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
  movie!: any;
  movieId: string = '';
  recommendedMovies: any[] = [];
  constructor(private _movieService: MovieService, private _route: ActivatedRoute, private languageService: LanguageService) { }

  ngOnInit(): void {

    this._route.params.subscribe(params => {
      this.movieId = params['id'];
      this.loadMovie(this.movieId);
      this.loadRecommendations(this.movieId);
    });

    this.languageService.language$
      .subscribe(() => {
        this._route.params.subscribe(params => {
          this.movieId = params['id'];
          this.loadMovie(this.movieId);
          this.loadRecommendations(this.movieId);
        });
      })
  }


  private loadMovie(id: string | number): void {
    this.movie = null;
    this._movieService.getMovieDetails(this.movieId).subscribe({
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
