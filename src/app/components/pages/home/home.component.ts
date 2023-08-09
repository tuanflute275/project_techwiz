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

  constructor(private app: AppService) { }
  ngOnInit(): void {
    this.app.getProduct().subscribe(response => {
      this.products = response;
      // console.log('Response : ', this.products);
    });

    this.app.getAccount(1).subscribe(response => {
      this.userName = response[0].name;
      console.log(this.userName)
    });

  }



}
