import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private API_COMMENT = 'http://localhost:3000/comments/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) { }


  public getComment() {
    const url = `${this.API_COMMENT}`
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public postComment(data: any) {
    const url = `${this.API_COMMENT}`
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }

  public updateComment(data: any) {
    const url = `${this.API_COMMENT}`
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }

  public deleteComment(id: number) {
    const url = `${this.API_COMMENT}` + id;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }
}
