import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeartService {

  private API_CART = 'http://localhost:3000/carts/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
    }),
  };


  constructor(private httpClient: HttpClient) { }


  public getCarts() {
    const url = `${this.API_CART}`
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public postCart(data: any) {
    const url = `${this.API_CART}`
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }

  public updateCart(data: any) {
    const url = `${this.API_CART}`
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }

  public deleteCart(id: number) {
    const url = `${this.API_CART}` + id;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }

  getCartTotalPrice() {
    let carts = this.getCarts()
    let total: number = 0;
    carts.forEach((item: any) => {
      total += item.quantity * item.price
    });
    return total;
  }
  getCartTotalQuantity() {
    let carts = this.getCarts()
    let total: number = 0;
    carts.forEach((item: any) => {
      total += item.quantity
    });
    return total;
  }
}
