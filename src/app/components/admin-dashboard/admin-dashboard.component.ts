import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TrackingService } from '../../services/tracking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  trackings: any[] = [];
  filteredTrackings: any[] = [];
  pagedTrackings: any[] = [];
  isLoggedIn: boolean = false;
  trackingForm: FormGroup;
  isCreating: boolean = false;
  isEditing: boolean = false;
  selectedTracking: any;
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private authService: AuthService,
    private trackingService: TrackingService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.trackingForm = this.formBuilder.group({
      trackingNumber: ['', Validators.required],
      status: ['', Validators.required],
      location: ['', Validators.required],
      estimatedDelivery: ['', Validators.required],
      lastUpdated: ['']
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.loadTrackings();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  loadTrackings(): void {
    this.trackingService.getAllTrackings().subscribe((data: any[]) => {
      this.trackings = data;
      this.filteredTrackings = data; // Initialize filtered trackings
      this.setPage(1); // Initialize pagination
    });
  }

  createTracking(): void {
    this.isCreating = true;
    this.trackingForm.reset();
  }

  saveTracking(): void {
    if (this.trackingForm.valid) {
      const newTracking = this.trackingForm.value;
      newTracking.lastUpdated = new Date(); // Set lastUpdated to current date/time
      this.trackingService.createTracking(newTracking).subscribe(() => {
        this.loadTrackings();
        this.isCreating = false;
      });
    }
  }

  editTracking(tracking: any): void {
    this.selectedTracking = { ...tracking };
    this.trackingForm.patchValue({
      trackingNumber: tracking.trackingNumber,
      status: tracking.status,
      location: tracking.location,
      estimatedDelivery: this.formatDate(tracking.estimatedDelivery), // Format date for edit form
    });
    this.isEditing = true;
  }

  updateTracking(): void {
    if (this.trackingForm.valid && this.selectedTracking) {
      const updatedTracking = this.trackingForm.value;
      updatedTracking._id = this.selectedTracking._id; // Assuming _id is the identifier for tracking
      updatedTracking.lastUpdated = new Date(); // Update lastUpdated to current date/time
      this.trackingService.updateTracking(updatedTracking.trackingNumber, updatedTracking).subscribe(() => {
        this.loadTrackings();
        this.isEditing = false;
      });
    }
  }

  cancel(): void {
    this.isCreating = false;
    this.isEditing = false;
  }

  deleteTracking(trackingNumber: string): void {
    this.trackingService.deleteTracking(trackingNumber).subscribe(() => {
      this.loadTrackings();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  searchTrackings(): void {
    this.filteredTrackings = this.trackings.filter(tracking =>
      tracking.trackingNumber.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.setPage(1); // Reset to first page after search
  }

  private formatDate(date: any): string {
    if (!date) return '';
    const newDate = new Date(date);
    return newDate.toISOString().split('T')[0]; // Format as yyyy-MM-dd for input type date
  }

  setPage(page: number): void {
    // Calculate starting index based on page size
    const startIndex = (page - 1) * this.pageSize;
    // Slice the array to get the current page of items
    this.pagedTrackings = this.filteredTrackings.slice(startIndex, startIndex + this.pageSize);
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTrackings.length / this.pageSize);
  }
}
