import { Component } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'] // Make sure you have a CSS file for styling
})
export class TrackingComponent {
  trackingNumber: string = "";
  trackingData: any;

  constructor(
    private route: ActivatedRoute,
    private trackingService: TrackingService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.trackingNumber = params['trackingNumber'];
      if (this.trackingNumber) {
        this.fetchTrackingData();
      }
    });
  }

  fetchTrackingData() {
    this.trackingService.getTrackingData(this.trackingNumber)
      .subscribe(data => {
        this.trackingData = data;
      });
  }
}
