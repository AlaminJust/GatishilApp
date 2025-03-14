import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleStoppageRequest } from '../api-models/request/vehicle.request';
import { HttpClient } from '@angular/common/http';
import { VehicleUpdateRequest } from '../components/update-vehicle-route/update-vehicle-route.component';

@Injectable({
  providedIn: 'root'
})
export class VehicleRouteService {
  get url(): string {
    return `${environment.baseUrl}vehicle-route-management`;
  }

  constructor(
    private http: HttpClient
  ) { }

  
  assignStoppage(request: VehicleStoppageRequest): Observable<any> {
    return this.http.post<any>(`${this.url}/route`, request);
  }

  update(id: number, request: VehicleUpdateRequest): Observable<any> {
    return this.http.put<any>(`${this.url}/route/${id}`, request);
  }
}