import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private API_ACCOUNT = 'http://localhost:3000/account/';
  private API_PRODUCT = 'http://localhost:3000/product';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      // Authorization: 'my-auth-token'
    }),
  };


  constructor(private httpClient: HttpClient) { }

  public singUp(data: any) {
    const url = `${this.API_ACCOUNT}`
    return this.httpClient.post<any>(url,data, this.httpOptions);
  }

  public login() {
    const url = `${this.API_ACCOUNT}`
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getAccount(id: number) {
    const url = `${this.API_ACCOUNT}` + '?id=' + id;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  public getProduct() {
    const url = `${this.API_PRODUCT}`
    return this.httpClient.get<any>(url, this.httpOptions);
  }

}
