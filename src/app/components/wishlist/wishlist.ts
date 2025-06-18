import { Component } from '@angular/core';
import { MovieService } from '../../shared/movie-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, FormsModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {

  movies: any[] = []
  constructor(private _movie : MovieService){
     this.movies = this._movie.favorites;
  }

}
