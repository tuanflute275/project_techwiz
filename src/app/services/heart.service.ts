import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeartService {

  private API_HEART = 'http://localhost:3000/hearts/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
    }),
  };


  constructor(private httpClient: HttpClient) { }


  public getHeart() {
    const url = `${this.API_HEART}`
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public postHeart(data: any) {
    const url = `${this.API_HEART}`
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }

  public updateHeart(data: any) {
    const url = `${this.API_HEART}`
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }

  public deleteHeart(id: number) {
    const url = `${this.API_HEART}` + id;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }
}
