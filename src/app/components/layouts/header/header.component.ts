import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeartService } from 'src/app/services/heart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  heart: number = 1;
  cart: number = 1;
  logo = '../../../../assets/images/logo/logo.jpg'
  avatar = '../../../../assets/images/logo/avatar_admin.jpg'

  constructor(private router: Router, private heartService: HeartService){}

  ngOnInit(): void {
    this.getAllHeart()
    this.getAllCarts()
  }

  getAllHeart(){
    this.heartService.getHeart().subscribe(response=>{
      this.heart = response.length;
    })
  }

  getAllCarts() {
    let cartJson = localStorage.getItem('cart')
    if (cartJson) {
      this.cart = JSON.parse(cartJson).length;
    }
  }

  search() {
  }
  upload() {
  }
  logout() {
    localStorage.removeItem("u_data");
    alert('Logout Successfully !');
    this.router.navigate(['/login']);
  }

}
