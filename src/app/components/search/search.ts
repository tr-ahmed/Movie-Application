import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../shared/movie-service';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search implements OnInit {
  // protected title = 'movieApp';
  allResults: any[] = [];
  results: any[] = [];
  query = '';
favorites: any[] = [];

  currentPage = 1;
  itemsPerPage = 8;

  searchedMovies: any[] = [];
  constructor(private _movieService : MovieService ) {}

  ngOnInit() {
    this.searchedMovies = this._movieService.filteredResults; 
    this.getFilteredMovie();
    this.favorites = this._movieService.favorites;
  }

  getFilteredMovie() {
    const totalPages = 5; 
    const requests: any[] = this._movieService.filteredResults;


    console.log(requests);
    


    

    forkJoin(requests).subscribe((responses: any[]) => {
      this.allResults = responses.flatMap(res => res.results);
      this.results = [...this.allResults]; 
    });
  }

  filterResults() {
    this.currentPage = 1;
    const q = this.query.toLowerCase();
    this.results = this.allResults.filter(movie =>
      movie.title.toLowerCase().includes(q)
    );
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
  }

  getPosterUrl(path: string) {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/no-image.png';
  }

  getStrokeColor(vote: number): string {
    if (vote < 5) return '#dc3545';     
    if (vote < 7) return '#ffc107';     
    return '#28a745';                   
  }

  toggleFavorite(movie: any) {
  const index = this.favorites.findIndex(f => f.id === movie.id);
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
    return this.favorites.some(f => f.id === movie.id);
  }

}