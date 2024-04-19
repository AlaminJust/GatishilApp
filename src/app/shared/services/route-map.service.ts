import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllRouteResponse, RouteLocationRequest, RouteLocationResponse, RouteMapRequest, VehicleRouteMapRequest, VehicleRouteMapResponse, VehicleRouteResponse } from '../api-models';

@Injectable({
  providedIn: 'root'
})
export class RouteMapService {
  private _selectedVehicleRouteMap!: VehicleRouteResponse;
  get selectedVehicleRouteMap(): VehicleRouteResponse {
    return this._selectedVehicleRouteMap;
  }
  set selectedVehicleRouteMap(value: VehicleRouteResponse){
    this._selectedVehicleRouteMap = value;
  }

  get url(): string {
    return `${environment.baseUrl}route-map-management`;
  }
  constructor(
    private http: HttpClient
  ) { 

  }

  allRoutes(): Observable<AllRouteResponse[]> {
    return this.http.get<AllRouteResponse[]>(`${this.url}/all-routes`)
          .pipe(
            map((data: AllRouteResponse[]) => {
              return data.sort((a, b) => a.name.localeCompare(b.name));
            })
          );
  }

  routesByVehicle(vehicleId: number): Observable<VehicleRouteResponse[]> {
    return this.http.get<VehicleRouteResponse[]>(`${this.url}/routes/${vehicleId}`)
          .pipe(
            map((data: VehicleRouteResponse[]) => {
              return data.sort((a, b) => a.order - b.order);
            })
          );
  }

  getRouteLocations(routeId: number): Observable<RouteLocationResponse[]>{
    return this.http.get<RouteLocationResponse[]>(`${this.url}/route-locations/${routeId}`);
  }

  save(request: RouteMapRequest): Observable<AllRouteResponse> {
    return this.http.post<AllRouteResponse>(`${this.url}/save`, request);
  }

  update(id: number, request: RouteMapRequest): Observable<AllRouteResponse> {
    return this.http.put<AllRouteResponse>(`${this.url}/update/${id}`, request);
  }

  addVehicleRouteMap(request: VehicleRouteMapRequest): Observable<VehicleRouteMapResponse> {
    return this.http.post<VehicleRouteMapResponse>(`${this.url}/vehicle/route`, request);
  }

  removeVehicleRoute(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/vehicle/route/${id}`);
  }

  addLocation(routeId: number, request: RouteLocationRequest): Observable<RouteLocationResponse>{
    return this.http.post<RouteLocationResponse>(`${this.url}/location/${routeId}`, request);
  }

  removeLocation(locationId: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/location/${locationId}`);
  }
}
