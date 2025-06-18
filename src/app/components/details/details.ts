import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/movie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
  constructor(private _movieService : MovieService, private _route: ActivatedRoute){}

  movie!: any ;
  movieId: string = '';

  ngOnInit(): void {
    this.movieId = this._route.snapshot.params['id'];
    this.getMovie(this.movieId);
  }

  getMovie(id: string){
    this._movieService.getMovieById(this.movieId).subscribe({
      next: (data) => this.movie = data,
      error: (error) => console.log(error),
      complete: () => console.log("Done")
      
      
    });
  }

}
