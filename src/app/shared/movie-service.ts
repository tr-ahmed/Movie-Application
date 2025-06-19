import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _counter = new BehaviorSubject<number>(0);
  public counter$ = this._counter.asObservable();

  filteredResults: any[] = [];
  favorites: any[] = [];

  constructor(private _httpClient: HttpClient) { }

  getMoviesByPage(page: number): Observable<any>{
    return this._httpClient.get(`https://api.themoviedb.org/3/movie/popular?api_key=668493e3285671fd89719073e48cf97e&page=${page}`)

  }

  getMovieById(id: string): Observable<any>{
    return this._httpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=668493e3285671fd89719073e48cf97e`)
  }

  increaseCounter() {
    this._counter.next(this._counter.value + 1);
  }

  decreaseCounter() {
    this._counter.next(this._counter.value - 1);
  }

  getRecommendations(page: number): Observable<any> {
      return this._httpClient.get(`https://api.themoviedb.org/3/movie/popular?api_key=668493e3285671fd89719073e48cf97e&page=${page}`)

}
}
