import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrackingService } from '../../services/tracking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trackingNumber = '';
  trackingData: any;
  trackingError = false;

  constructor(private trackingService: TrackingService) { }

  trackPackage() {
    if (!this.trackingNumber) {
      this.trackingError = true;
      return;
    }

    this.trackingService.getTrackingData(this.trackingNumber)
      .subscribe(data => {
        this.trackingData = this.formatTrackingData(data); // Format data for display
        this.trackingError = false; // Reset error state
      }, error => {
        this.trackingError = true; // Handle error
      });
  }

  private formatTrackingData(data: any): any {
    // Format timestamp to readable date/time
    data.timestamp = new Date(data.timestamp).toLocaleString();

    // Format estimatedDelivery to readable date
    if (data.estimatedDelivery) {
      data.estimatedDelivery = new Date(data.estimatedDelivery).toLocaleDateString();
    }

    return data;
  }
}
