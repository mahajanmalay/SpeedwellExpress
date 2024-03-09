import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private apiUrl = 'YOUR_BACKEND_API_URL/tracking'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  getTrackingData(trackingNumber: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    return this.http.post<any>(this.apiUrl, { trackingNumber }, options);
  }
}
