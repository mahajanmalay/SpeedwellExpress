import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrackingService } from '../../services/tracking.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit{
  trackForm!: FormGroup;
  trackingData: any;

  constructor(private fb: FormBuilder, private trackingService: TrackingService) { }

  ngOnInit() {
    this.trackForm = this.fb.group({
      trackingNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    const trackingNumber = this.trackForm.value.trackingNumber;
    this.trackingService.getTrackingData(trackingNumber)
      .subscribe(data => this.trackingData = data);
  }
}
