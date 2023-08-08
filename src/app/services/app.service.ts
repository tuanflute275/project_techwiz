import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private API_GET_PRODUCT = 'http://localhost:3000/product';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      // Authorization: 'my-auth-token'
    }),
  };


  constructor(private httpClient: HttpClient) { }

  public getProduct() {
    const url = `${this.API_GET_PRODUCT}`
    return this.httpClient.get<any>(url, this.httpOptions)
  }

}
