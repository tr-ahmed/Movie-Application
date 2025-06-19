import { Component } from '@angular/core';
import { MovieService } from '../../shared/movie-service';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink,CommonModule,TranslateModule, FormsModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {
private favoritesSubject = new BehaviorSubject<any[]>([]);
  favorites: any[] = []
  counter: number = 0;


  constructor(private _movie : MovieService){
     this.favorites = this._movie.favorites;
  }


 getFavorites(): any[] {
    return this.favorites;
  }

  addFavorite(movie: any): void {
    if (!this.isFavorite(movie)) {
      this.favorites.push(movie);
      this.favoritesSubject.next(this.favorites);
    }
  }

  removeFavorite(movie: any): void {
    this.favorites = this.favorites.filter(m => m.id !== movie.id);
    this.favoritesSubject.next(this.favorites);
  }

  toggleFavorite(movie: any): void {
    const index = this.favorites.findIndex(f => f.id === movie.id);
  if (index > -1) {
    this.favorites.splice(index, 1); 
    this._movie.decreaseCounter();
  } else {
    this.favorites.push(movie); 
    this._movie.increaseCounter();
  }
  this._movie.favorites = this.favorites;
  }

  isFavorite(movie: any): boolean {
    return this.favorites.some(m => m.id === movie.id);
  }

  getCount(): number {
    return this.favorites.length;
  }

}