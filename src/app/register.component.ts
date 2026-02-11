import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <div class="form-container">
      <h2>Register</h2>
      <div *ngIf="error" class="error">{{ error }}</div>
      <form (ngSubmit)="register()">
        <input type="text" placeholder="Full Name" [(ngModel)]="name" name="name" required>
        <input type="email" placeholder="Email" [(ngModel)]="email" name="email" required>
        <input type="password" placeholder="Password" [(ngModel)]="password" name="password" required>
        <input type="password" placeholder="Confirm Password" [(ngModel)]="confirmPassword" name="confirm" required>
        <button type="submit">Register</button>
      </form>
      <p>Already have account? <a [routerLink]="['/login']">Login</a></p>
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
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

  register() {
    this.error = '';
    if (!this.name || !this.email || !this.password) {
      this.error = 'All fields are required';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    if (this.auth.register(this.name, this.email, this.password)) {
      alert('Registration successful! Please login.');
      this.router.navigate(['/login']);
    } else {
      this.error = 'Email already exists';
    }
  }
}
