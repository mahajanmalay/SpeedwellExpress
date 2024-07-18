import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit(): void {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe(() => {
        this.router.navigate(['/admin']); // Redirect to admin page on successful login
      });
  }
}
