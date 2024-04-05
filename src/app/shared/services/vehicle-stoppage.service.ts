import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDropdown } from '../models/dropdown.model';

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
}
