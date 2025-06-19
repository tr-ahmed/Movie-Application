import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../shared/movie-service';
import { LanguageService } from '../../shared/language-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth-service';
import { forkJoin, Observable, Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export interface Movie {
  id: number;
  title: string;
}

@Component({
  selector: 'app-home',
  imports: [TranslateModule,CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit,OnDestroy {
  protected title = 'movieApp';
  allResults: any[] = [];
  results: any[] = [];
  query = '';
  favorites: any[] = [];

  currentPage = 1;
  itemsPerPage = 8;

  private readonly destroy$ = new Subject<void>();
  // imageUrl: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private translate: TranslateService, private _movieService: MovieService,private toastr: ToastrService,private _authService: AuthService,private languageService: LanguageService ) { }

  ngOnInit() {
    this.getAllMovies();
    this.favorites = this._movieService.favorites;

    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getAllMovies();
        this.favorites = this._movieService.favorites;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

getAllMovies() {
    const totalPages = 5;
    const requests: Observable<any>[] = [];

    for (let page = 1; page <= totalPages; page++) {
      requests.push(this._movieService.getNowPlaying(page));
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

  toggleFavorite(movie: Movie): void {
    if (!this._authService.isAuthenticated()) {
      const message = this.translate.instant('TOAST.WISHLIST_LOGIN_REQUIRED_MESSAGE');
    const title = this.translate.instant('TOAST.AUTHENTICATION_REQUIRED_TITLE');
      this.toastr.warning(message,title);
      return;
    }

    const index = this.favorites.findIndex((f) => f.id === movie.id);
    if (index > -1) {
      this.favorites.splice(index, 1);
      this._movieService.decreaseCounter();
      const removeMessage = this.translate.instant('TOAST.REMOVED_FROM_FAVORITES', { movieTitle: movie.title });
      this.toastr.info(removeMessage);
    } else {
      this.favorites.push(movie);
      this._movieService.increaseCounter();
      const addMessage = this.translate.instant('TOAST.ADDED_TO_FAVORITES', { movieTitle: movie.title });
      this.toastr.success(addMessage);
    }
    this._movieService.favorites = this.favorites;
  }

isFavorite(movie: Movie): boolean {
  return this.favorites.some((f) => f.id === movie.id);
}

}
