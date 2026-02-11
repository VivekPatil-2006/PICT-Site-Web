import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <nav class="navbar">
        <h1>My App</h1>
        <div *ngIf="auth.isLoggedIn()">
          <a [routerLink]="['/profile']">Profile</a>
          <button (click)="logout()">Logout</button>
        </div>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container { min-height: 100vh; background-color: #f5f5f5; }
    .navbar { background-color: #333; color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
    .navbar h1 { margin: 0; }
    .navbar a { color: white; text-decoration: none; margin: 0 1rem; }
    .navbar a:hover { text-decoration: underline; }
    .navbar button { background-color: #dc3545; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-left: 1rem; }
    .navbar button:hover { background-color: #c82333; }
  `]
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) { }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
