import { Injectable } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[] = [];
  currentUser: User | null = null;

  constructor() {
    const stored = localStorage.getItem('users');
    this.users = stored ? JSON.parse(stored) : [];
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
      this.currentUser = JSON.parse(loggedIn);
    }
  }

  register(name: string, email: string, password: string): boolean {
    if (this.users.some(u => u.email === email)) {
      return false;
    }
    this.users.push({ id: Date.now().toString(), name, email, password });
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = { id: user.id, name: user.name, email: user.email };
      localStorage.setItem('loggedIn', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
