import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  trackingNumber = '';
  trackingError = false;

  constructor(private router: Router) { }

  ngOnInit() { }

  trackPackage() {
    this.trackingError = !this.trackingNumber; // Check if tracking number is empty

    if (!this.trackingError) {
      // Navigate to tracking page with tracking number as a parameter
      this.router.navigate(['/tracking', this.trackingNumber]);
    }
  }
}
