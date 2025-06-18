import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { MovieService } from '../../shared/movie-service';
import { AuthService } from '../../shared/auth-service';
import * as bootstrap from 'bootstrap'; // Import Bootstrap for modal functionality

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  protected title = 'movieApp';
  allResults: any[] = [];
  results: any[] = [];
  query = '';
  favorites: any[] = [];

  currentPage = 1;
  itemsPerPage = 8;

  constructor(
    private _movieService: MovieService,
    private _authService: AuthService // Inject AuthService
  ) {}

  ngOnInit() {
    this.getAllMovies();
    this.favorites = this._movieService.favorites;
  }

  getAllMovies() {
    const totalPages = 5;
    const requests: Observable<any>[] = [];

    for (let page = 1; page <= totalPages; page++) {
      requests.push(this._movieService.getMoviesByPage(page));
    }

    forkJoin(requests).subscribe({
      next: (responses: any[]) => {
        this.allResults = responses.flatMap((res) => res.results);
        this.results = [...this.allResults];
      },
      error: (err) => console.error('Error fetching movies:', err),
      complete: () => console.log('All pages loaded'),
    });
  }

  filterResults() {
    this.currentPage = 1;
    const q = this.query.toLowerCase();
    this.results = this.allResults.filter((movie) =>
      movie.title.toLowerCase().includes(q)
    );
    this._movieService.filteredResults = this.results;
  }

  get paginatedResults() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.results.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.results.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPosterUrl(path: string) {
    return path
      ? `https://image.tmdb.org/t/p/w500${path}`
      : 'assets/no-image.png';
  }

  getStrokeColor(vote: number): string {
    if (vote < 5) return '#dc3545';
    if (vote < 7) return '#ffc107';
    return '#28a745';
  }

  toggleFavorite(movie: any) {
    if (!this._authService.isAuthenticated()) {
      // Show the modal if the user is not logged in
      const authModal = new bootstrap.Modal(document.getElementById('authModal')!);
      authModal.show();
      return;
    }

    // User is authenticated, proceed with adding/removing from favorites
    const index = this.favorites.findIndex((f) => f.id === movie.id);
    if (index > -1) {
      this.favorites.splice(index, 1);
      this._movieService.decreaseCounter();
    } else {
      this.favorites.push(movie);
      this._movieService.increaseCounter();
    }
    this._movieService.favorites = this.favorites;
  }

  isFavorite(movie: any): boolean {
    return this.favorites.some((f) => f.id === movie.id);
  }
}