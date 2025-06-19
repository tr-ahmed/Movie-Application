import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [TranslateModule,CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
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