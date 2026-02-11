import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="form-container">
      <h2>Login</h2>
      <div *ngIf="error" class="error">{{ error }}</div>
      <form (ngSubmit)="login()">
        <input type="email" placeholder="Email" [(ngModel)]="email" name="email" required>
        <input type="password" placeholder="Password" [(ngModel)]="password" name="password" required>
        <button type="submit">Login</button>
      </form>
      <p>New user? <a [routerLink]="['/register']">Register</a></p>
    </div>
  `,
  styles: [`
    .form-container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    h2 { text-align: center; }
    .error { color: red; margin-bottom: 10px; }
    input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; }
    button { width: 100%; padding: 10px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px; }
    button:hover { background: #5568d3; }
    a { color: #667eea; text-decoration: none; }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Email and password are required';
      return;
    }
    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/profile']);
    } else {
      this.error = 'Invalid email or password';
    }
  }
}
