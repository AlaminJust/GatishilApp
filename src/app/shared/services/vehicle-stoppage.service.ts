import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDropdown } from '../models/dropdown.model';
import { VehicleStoppageRequest } from '../api-models/request/vehicle.request';
import { VehicleStoppageResponse } from '../api-models';
import { StoppageRequest } from '../api-models/request/stoppage.request';

@Injectable({
  providedIn: 'root'
})
export class VehicleStoppageService {
  get url(): string {
    return `${environment.baseUrl}vehicle-stoppage-management`;
  }

  constructor(
    private http: HttpClient
  ) { }

  getAllStoppages(): Observable<IDropdown[]> {
    return this.http.get<IDropdown[]>(`${this.url}/vehicle-stoppages`)
      .pipe(
        map((data: IDropdown[]) => {
          return data.sort((a, b) => a.name.localeCompare(b.name));
        })
      );
  }

  getById(id: number): Observable<VehicleStoppageResponse> {
    return this.http.get<VehicleStoppageResponse>(`${this.url}/vehicle-stoppage/${id}`);
  }

  add(request: StoppageRequest): Observable<any> {
    return this.http.post<any>(`${this.url}/vehicle-stoppages`, request);
  }

}
