import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth-service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,TranslateModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
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
