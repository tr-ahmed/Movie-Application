import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth-service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private _authService: AuthService, private _router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this._authService.register(this.username, this.password)) {
      this.successMessage = 'Registration successful! You can now log in.';
      this._router.navigate(['/login']);
    } else {
      this.errorMessage = 'Username already exists.';
    }
  }

  // Navigate to Login Page
  navigateToLogin(): void {
    this._router.navigate(['/login']);
  }
}