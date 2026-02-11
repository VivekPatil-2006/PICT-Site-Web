import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile-container" *ngIf="auth.currentUser">
      <h2>Your Profile</h2>
      <div class="profile-info">
        <p><strong>ID:</strong> {{ auth.currentUser.id }}</p>
        <p><strong>Name:</strong> {{ auth.currentUser.name }}</p>
        <p><strong>Email:</strong> {{ auth.currentUser.email }}</p>
      </div>
      <p class="welcome">Welcome, {{ auth.currentUser.name }}!</p>
    </div>
  `,
  styles: [`
    .profile-container { max-width: 500px; margin: 50px auto; padding: 30px; border: 1px solid #ddd; border-radius: 8px; text-align: center; }
    h2 { margin-bottom: 20px; }
    .profile-info { background: #f9f9f9; padding: 20px; border-radius: 4px; margin-bottom: 20px; }
    .profile-info p { text-align: left; margin: 10px 0; }
    .welcome { color: #667eea; font-weight: bold; font-size: 1.2em; }
  `]
})
export class ProfileComponent implements OnInit {
  constructor(public auth: AuthService) { }
  ngOnInit(): void { }
}
