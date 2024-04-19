import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VehiclePaginationRequest } from '../api-models/request/organization.request';
import { Observable, of, tap } from 'rxjs';
import { PaginationResponse } from '../models';
import { VehicleResponse, VehicleStoppageResponse } from '../api-models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VehicleRequest } from '../api-models/request/vehicle.request';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  selectedOrgVehicle!: PaginationResponse<VehicleResponse>;

  get url(): string {
    return `${environment.baseUrl}vehicle-management`;
  }
  
  constructor(
    private http: HttpClient
  ) { }

  getVehicleByOrganizationId(organizationId: number, request: VehiclePaginationRequest): Observable<PaginationResponse<VehicleResponse>>{
    if(this.selectedOrgVehicle && this.selectedOrgVehicle.items && !!this.selectedOrgVehicle.items.find(x => x.organizationId == organizationId)){
      return of(this.selectedOrgVehicle);
    }

    let params = new HttpParams()
      .set('search', request.search.toString())
      .set('code', request.code.toString())
      .set('pageNumber', request.pageNumber.toString())
      .set('pageSize', request.pageSize.toString())
      .set('sortBy', request.sortBy)
      .set('sortOrder', request.sortOrder);

    return this.http.get<PaginationResponse<VehicleResponse>>(`${this.url}/vehicles/${organizationId}`, { params })
               .pipe(tap(x => {
                this.selectedOrgVehicle = x;
                return x;
               }));
  }

  addVehicle(organizationId: number, request: VehicleRequest): Observable<any> {
    return this.http.post<any>(`${this.url}/vehicles/${organizationId}`, request);
  }

  getStoppageByVehicleId(vehicleId: number): VehicleStoppageResponse[] {
    return this.selectedOrgVehicle.items.find(x => x.id == vehicleId)?.vehicleStoppages ?? [];
  }
}
