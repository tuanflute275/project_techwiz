import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  p: number = 1;
  userName: string = '';
  userFilter: any = { name: '' };
  products: any = [];
  u_data: any;

  constructor(private app: AppService) { }
  ngOnInit(): void {

    this.u_data = this.getUData();

    this.getAccountData(this.u_data?.id)

    this.fetchProductAPI();
  }

  fetchProductAPI() {
    this.app.getProduct().subscribe(response => {
      this.products = response;
      // console.log('Response : ', this.products);
    });

  }

  getUData(): any {
    const data = localStorage.getItem("u_data") ? JSON.parse(localStorage.getItem("u_data") as string) : null;
    console.log("data", data);
    return data;
  }

  getAccountData(id: any) {
    this.app.getAccount(id).subscribe(response => {
      this.userName = response[0].name;
      console.log(this.userName)
    });
  }
}
