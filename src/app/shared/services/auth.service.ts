import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse } from '../api-models';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginResponseKey = 'loginResponse';

  get url(): string {
    return `${environment.baseUrl}user-management`;
  }

  constructor(
    private http: HttpClient
  ) { }


  private setLoginResponse(loginResponse: LoginResponse): void {
    localStorage.setItem(this.loginResponseKey, JSON.stringify(loginResponse));
  }

  private clearLoginResponse(): void {
    localStorage.removeItem(this.loginResponseKey);
  }

  public getLoginResponse(): LoginResponse | null {
    const loginResponseString = localStorage.getItem(this.loginResponseKey);
    if (loginResponseString) {
      return JSON.parse(loginResponseString);
    } else {
      return null;
    }
  }

  getToken(): string {
    return this.getLoginResponse()?.token ?? "";
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logOut(): void {
    this.clearLoginResponse();
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    const params = new HttpParams()
    .set('userName', request.userName?.toString())
    .set('password', request.password);

    return this.http.get<LoginResponse>(`${this.url}/login`, { params })
          .pipe(tap(x => {
            this.setLoginResponse(x);
            return x;
          }));
  }

}
