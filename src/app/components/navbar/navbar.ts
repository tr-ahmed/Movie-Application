import { Component, OnInit } from '@angular/core';
import { Language } from "../language/language";
import { TranslateModule } from '@ngx-translate/core';
import { MovieService } from '../../shared/movie-service';
import { AuthService } from '../../shared/auth-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [Language,TranslateModule,RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  counter: number = 0;
  isLoggedIn: boolean = false;
  constructor(private _movieService: MovieService, private _authService: AuthService) {}

    ngOnInit(): void {
    this._initializeCounter();
    this._subscribeToLoginState();
  }

  logout(): void {
    this._authService.logout();
  }

    private _initializeCounter(): void {
    this._movieService.counter$.subscribe(count => {
      this.counter = count;
    });
  }

  private _subscribeToLoginState(): void {
    this._authService.loginState$.subscribe(state => {
      this.isLoggedIn = state; // Update login state dynamically
    });
}

}
