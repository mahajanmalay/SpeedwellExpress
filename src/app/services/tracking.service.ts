import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private apiUrl = 'http://localhost:5000/api/tracking';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      "x-auth-token": `${token}`
    });
  }
  

  getTrackingData(trackingNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${trackingNumber}`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  createTracking(trackingData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, trackingData, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateTracking(trackingNumber: string, updates: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${trackingNumber}`, updates, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTracking(trackingNumber: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${trackingNumber}`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllTrackings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
