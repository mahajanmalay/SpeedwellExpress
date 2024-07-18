import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // Check if user is already logged in
    this.checkToken();
  }

  private checkToken() {
    const token = this.getToken();
    this.loggedIn.next(!!token);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/auth/login', credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.checkToken();
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.checkToken();
  }

  private getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
}