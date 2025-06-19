import { Injectable } from '@angular/core';
import { LanguageService } from './language-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class MovieService {
  private _counter = new BehaviorSubject<number>(0);
  public counter$ = this._counter.asObservable();
  filteredResults: any[] = [];
  favorites: any[] = [];
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey = 'adfc73bb87d39797e48981febfc62d41';
  constructor(private http: HttpClient, private languageService: LanguageService ) { }

  getNowPlaying(page: number): Observable<any> {
    const currentLang = this.languageService.getCurrentLanguage();
    return this.http.get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=${currentLang}&page=${page}`);
  } 

  getMovieDetails(movieId: string): Observable<any> {
    const currentLang = this.languageService.getCurrentLanguage();
    return this.http.get(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=${currentLang}`);
  }
    increaseCounter() {
    this._counter.next(this._counter.value + 1);
  }

  decreaseCounter() {
    this._counter.next(this._counter.value - 1);
  }

    getRecommendations(page: number): Observable<any> {
    const currentLang = this.languageService.getCurrentLanguage();
      return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=${currentLang}&page=${page}`)
}                           
}
