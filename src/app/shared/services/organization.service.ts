import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationPaginationRequest, OrganizationResponse } from '../api-models';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  get url(): string {
    return `${environment.baseUrl}organization-management`;
  }
  constructor(
    private http: HttpClient
  ) { }

  getOrganizations(request: OrganizationPaginationRequest): Observable<PaginationResponse<OrganizationResponse>> {
    let params = new HttpParams()
      .set('search', request.search?.toString() ?? "")
      .set('pageNumber', request.pageNumber.toString())
      .set('pageSize', request.pageSize.toString())
      .set('sortBy', request.sortBy)
      .set('sortOrder', request.sortOrder);

    return this.http.get<PaginationResponse<OrganizationResponse>>(`${this.url}/organizations`, { params });
  }
}
