import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllRouteResponse, RouteMapRequest } from '../api-models';

@Injectable({
  providedIn: 'root'
})
export class RouteMapService {
  get url(): string {
    return `${environment.baseUrl}route-map-management`;
  }
  constructor(
    private http: HttpClient
  ) { }

  allRoutes(): Observable<AllRouteResponse[]> {
    return this.http.get<AllRouteResponse[]>(`${this.url}/all-routes`)
          .pipe(
            map((data: AllRouteResponse[]) => {
              return data.sort((a, b) => a.name.localeCompare(b.name));
            })
          );
  }

  save(request: RouteMapRequest): Observable<AllRouteResponse> {
    return this.http.post<AllRouteResponse>(`${this.url}/save`, request);
  }
}
