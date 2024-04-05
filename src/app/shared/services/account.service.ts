import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url = 'http://gatishil.com/delete-account'
  
  constructor(
    private http: HttpClient
  ) { }

  requestToDeleteAccount(phoneNumber: string){
    return this.http.delete(this.url);
  }
}
