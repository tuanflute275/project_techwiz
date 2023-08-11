import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private API_ACCOUNT = 'http://localhost:3000/account/';
  private API_PRODUCT = 'http://localhost:3000/product/';
  private API_CATEGORY = 'http://localhost:3000/category/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token'
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public singUp(data: any) {
    const url = `${this.API_ACCOUNT}`;
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }

  public login() {
    const url = `${this.API_ACCOUNT}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getAccount(id: number) {
    const url = `${this.API_ACCOUNT}` + '?id=' + id;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  //client post email
  public postEmail(data: any) {
    return this.httpClient.post<any>('http://localhost:3000/emailUser/', data,this.httpOptions);
  }

  public postReviewFormContact(data: any) {
    return this.httpClient.post<any>('http://localhost:3000/contacts/', data,this.httpOptions);
  }



  // category
  public getCategory() {
    const url = `${this.API_CATEGORY}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getCategoryByID(id: any) {
    const url = `${this.API_CATEGORY}?id=${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  // product
  public getProduct() {
    const url = `${this.API_PRODUCT}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getProductById(id: number) {
    const url = `${this.API_PRODUCT}` + '?id=' + id;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getProductByCategory(cateId: any) {
    const url = `${this.API_PRODUCT}` + '?category_id=' + cateId;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getRelatedProduct(cateId: any) {
    const url = `${this.API_PRODUCT}` + '?category_id=' + cateId + '&_limit=4&_sort=id&_order=desc' ;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public searchProduct(productName: any) {
    const url = `${this.API_PRODUCT}` + '?name_like=' + productName;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  public sort(name: string, type: string) {
      const url = `${this.API_PRODUCT}` + `?_sort=${name}&_order=${type}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }


  public filterByPriceRange(min: any, max: any) {
    const url = `${this.API_PRODUCT}` + `?price_gte=${min}&price_lte=${max}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  //cart and favorite
  getAccountInfo() {
    let dataAccount = localStorage.getItem('u_data');
    return dataAccount;
  }

  getCarts() {
    let cartJson = localStorage.getItem('cart');
    if (cartJson) {
      return JSON.parse(cartJson);
    } else {
      return [];
    }
  }

  saveCart(carts: any) {
    let cartJson = JSON.stringify(carts);
    localStorage.setItem('cart', cartJson);
  }

  getCartTotalPrice() {
    let carts = this.getCarts();
    let total: number = 0;
    carts.forEach((item: any) => {
      total += item.quantity * item.price;
    });
    return total;
  }
  getCartTotalQuantity() {
    let carts = this.getCarts();
    let total: number = 0;
    carts.forEach((item: any) => {
      total += item.quantity;
    });
    return total;
  }
}
