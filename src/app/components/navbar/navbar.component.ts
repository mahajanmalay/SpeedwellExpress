import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) {}
  

  navigateBasedOnLoginStatus(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
