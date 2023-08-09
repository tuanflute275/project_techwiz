import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private API_ACCOUNT = 'http://localhost:3000/account/';
  private API_PRODUCT = 'http://localhost:3000/product/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      // Authorization: 'my-auth-token'
    }),
  };


  constructor(private httpClient: HttpClient) { }

  public singUp(data: any) {
    const url = `${this.API_ACCOUNT}`
    return this.httpClient.post<any>(url, data, this.httpOptions);
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



  // product
  public getProductById(id: number) {
    const url = `${this.API_PRODUCT}` + '?id=' + id;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getProductByCategory(cateName: any) {
    const url = `${this.API_PRODUCT}` + '?category=' + cateName;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public searchProduct(productName: any) {
    const url = `${this.API_PRODUCT}` + '?name_like=' + productName;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public orderByProduct() {
    const url = `${this.API_PRODUCT}` + '?_sort=views&_order=desc=';
    return this.httpClient.get<any>(url, this.httpOptions);
  }


  //cart and favorite
  getAccountInfo() {
    let dataAccount = localStorage.getItem('u_data')
    return dataAccount;
  }

  getCarts() {
    let cartJson = localStorage.getItem('cart')
    if (cartJson) {
      return JSON.parse(cartJson)
    } else {
      return [];
    }
  }

  saveCart(carts: any) {
    let cartJson = JSON.stringify(carts)
    localStorage.setItem('cart', cartJson)
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
