import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private _authService: AuthService, private _router: Router) {}

  login(): void {
    if (this._authService.login(this.username, this.password)) {
      this._router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid username or password.';
    }
  }

  // Navigate to Register Page
  navigateToRegister(): void {
    this._router.navigate(['/register']);
  }
}